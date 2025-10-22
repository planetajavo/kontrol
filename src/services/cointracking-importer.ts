import Papa from 'papaparse';
import JSZip from 'jszip';
import * as XLSX from 'xlsx';
import { referenceDB } from './reference-db';
import type {
  ImportSession,
  ReferencePlatform,
  ReferenceRecord,
  CointrackingNormalized,
  ImportSummary
} from '../types/reference';

const PLATFORM: ReferencePlatform = 'cointracking';

function detectFileType(file: File): 'csv' | 'xlsx' | 'json' | 'zip' | 'unknown' {
  const name = file.name.toLowerCase();
  if (name.endsWith('.csv')) return 'csv';
  if (name.endsWith('.xlsx') || name.endsWith('.xls')) return 'xlsx';
  if (name.endsWith('.json')) return 'json';
  if (name.endsWith('.zip')) return 'zip';
  return 'unknown';
}

function normalizeRow(raw: Record<string, any>): CointrackingNormalized {
  const r: CointrackingNormalized = {};

  const val = (k: string) => raw[k] ?? raw[k.toLowerCase()] ?? raw[k.replace(/\s+/g, '')];
  const num = (x: any): number | null => (x === undefined || x === null || x === '' ? null : Number(String(x).replace(/,/g, '.')));

  const date = val('Date') || val('date') || val('Trade Date') || val('Buy Date');
  r.date = date ? new Date(date).toISOString() : undefined;

  r.type = (val('Type') || val('type') || val('Trade Type')) ?? undefined;

  r.buyAmount = num(val('Buy Amount') || val('BuyAmount'));
  r.buyCurrency = val('Buy Currency') || val('BuyCurrency') || null;
  r.sellAmount = num(val('Sell Amount') || val('SellAmount'));
  r.sellCurrency = val('Sell Currency') || val('SellCurrency') || null;

  r.amount = num(val('Amount'));
  r.currency = val('Currency') || null;

  r.feeAmount = num(val('Fee') || val('Fee Amount'));
  r.feeCurrency = val('Fee Currency') || null;

  r.exchange = val('Exchange') || val('Location') || null;
  r.tradeGroup = val('Trade-Group') || val('Trade Group') || null;
  r.comment = val('Comment') || val('Notes') || null;

  const labels = val('Label') || val('Labels');
  if (labels) {
    const arr = String(labels)
      .split(/[;,|]/)
      .map(s => s.trim())
      .filter(Boolean);
    r.labels = arr.length ? arr : null;
  } else {
    r.labels = null;
  }

  return r;
}

async function parseCSV(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, any>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve((results.data || []).filter(Boolean)),
      error: (err) => reject(err),
    });
  });
}

async function parseJSON(file: File): Promise<Record<string, any>[]> {
  const text = await file.text();
  const data = JSON.parse(text);
  if (Array.isArray(data)) return data as Record<string, any>[];
  if (Array.isArray((data as any).rows)) return (data as any).rows as Record<string, any>[];
  return [data as Record<string, any>];
}

async function parseXLSX(file: File): Promise<Record<string, any>[]> {
  const ab = await file.arrayBuffer();
  const wb = XLSX.read(ab, { type: 'array' });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(ws, { defval: '' }) as Record<string, any>[];
}

async function parseZIP(file: File): Promise<{ file: string; rows: Record<string, any>[] }[]> {
  const jszip = new JSZip();
  const zip = await jszip.loadAsync(await file.arrayBuffer());
  const results: { file: string; rows: Record<string, any>[] }[] = [];

  const entries = Object.values(zip.files);
  for (const entry of entries) {
    if (entry.dir) continue;
    const lower = entry.name.toLowerCase();
    if (!(lower.endsWith('.csv') || lower.endsWith('.xlsx') || lower.endsWith('.json'))) continue;

    if (lower.endsWith('.csv')) {
      const content = await entry.async('string');
      const parsed = Papa.parse<Record<string, any>>(content, { header: true, skipEmptyLines: true });
      results.push({ file: entry.name, rows: (parsed.data || []).filter(Boolean) });
    } else if (lower.endsWith('.json')) {
      const content = await entry.async('string');
      const data = JSON.parse(content);
      const rows = Array.isArray(data) ? data : Array.isArray(data.rows) ? data.rows : [data];
      results.push({ file: entry.name, rows });
    } else if (lower.endsWith('.xlsx')) {
      const content = await entry.async('arraybuffer');
      const wb = XLSX.read(content, { type: 'array' });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' }) as Record<string, any>[];
      results.push({ file: entry.name, rows });
    }
  }

  return results;
}

export async function importCointracking(file: File): Promise<ImportSummary> {
  const fileType = detectFileType(file);

  const session: ImportSession = {
    platform: PLATFORM,
    fileName: file.name,
    fileType,
    createdAt: Date.now(),
    recordCount: 0,
  };

  const sessionId = await referenceDB.sessions.add(session);

  const pushRows = async (rows: Record<string, any>[], sourceFile?: string) => {
    const records: ReferenceRecord[] = rows.map((raw) => ({
      sessionId,
      platform: PLATFORM,
      category: 'transaction',
      sourceFile,
      raw,
      normalized: normalizeRow(raw),
    }));
    if (records.length) await referenceDB.records.bulkAdd(records);
    return records.length;
  };

  let total = 0;
  if (fileType === 'csv') {
    total += await pushRows(await parseCSV(file));
  } else if (fileType === 'json') {
    total += await pushRows(await parseJSON(file));
  } else if (fileType === 'xlsx') {
    total += await pushRows(await parseXLSX(file));
  } else if (fileType === 'zip') {
    const entries = await parseZIP(file);
    for (const e of entries) total += await pushRows(e.rows, e.file);
  } else {
    throw new Error('Tipo de archivo no soportado');
  }

  // Update session with recordCount
  await referenceDB.sessions.update(sessionId, { recordCount: total });

  // Build summary
  const all = await referenceDB.records.where('sessionId').equals(sessionId).toArray();
  const typesCount: Record<string, number> = {};
  const currencySet = new Set<string>();
  const tagSet = new Set<string>();

  for (const rec of all) {
    const n = rec.normalized as CointrackingNormalized | undefined;
    const t = (n?.type || 'unknown').toLowerCase();
    typesCount[t] = (typesCount[t] || 0) + 1;

    [n?.buyCurrency, n?.sellCurrency, n?.currency, n?.feeCurrency]
      .filter(Boolean)
      .forEach((c) => currencySet.add(String(c)));

    if (n?.labels) n.labels.forEach((l) => tagSet.add(l));

    if (n?.tradeGroup) tagSet.add(n.tradeGroup);

    if (n?.comment) {
      const words = String(n.comment).split(/[#,;|]/).map(s => s.trim()).filter(Boolean);
      words.slice(0, 5).forEach(w => tagSet.add(w));
    }
  }

  const summary: ImportSummary = {
    sessionId,
    platform: PLATFORM,
    fileName: file.name,
    fileType,
    createdAt: session.createdAt,
    recordCount: total,
    typesCount,
    currencies: Array.from(currencySet),
    suggestedTags: Array.from(tagSet).slice(0, 50),
  };

  // Persist meta in session for quick retrieval later
  await referenceDB.sessions.update(sessionId, {
    meta: {
      typesCount: summary.typesCount,
      currencies: summary.currencies,
      suggestedTags: summary.suggestedTags,
    },
  });

  return summary;
}

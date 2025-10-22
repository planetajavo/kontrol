import { referenceDB } from './reference-db';
import type { ImportSummary, CointrackingNormalized, ReferenceRecord } from '../types/reference';

export async function getLatestCointrackingSummary(): Promise<ImportSummary | null> {
  const last = await referenceDB.sessions
    .where('platform')
    .equals('cointracking')
    .reverse()
    .sortBy('createdAt');

  const latest = last[last.length - 1];
  if (!latest || latest.id == null) return null;

  // Prefer session.meta if available
  const typesCount = (latest.meta?.typesCount as Record<string, number>) || {};
  const currencies = (latest.meta?.currencies as string[]) || [];
  const suggestedTags = (latest.meta?.suggestedTags as string[]) || [];

  if (Object.keys(typesCount).length && currencies.length) {
    return {
      sessionId: latest.id,
      platform: 'cointracking',
      fileName: latest.fileName,
      fileType: latest.fileType,
      createdAt: latest.createdAt,
      recordCount: latest.recordCount,
      typesCount,
      currencies,
      suggestedTags,
    };
  }

  // Fallback: compute on the fly
  const all = await referenceDB.records.where('sessionId').equals(latest.id).toArray();
  const recomputedTypes: Record<string, number> = {};
  const currencySet = new Set<string>();
  const tagSet = new Set<string>();

  for (const rec of all) {
    const n = rec.normalized as CointrackingNormalized | undefined;
    const t = (n?.type || 'unknown').toLowerCase();
    recomputedTypes[t] = (recomputedTypes[t] || 0) + 1;
    [n?.buyCurrency, n?.sellCurrency, n?.currency, n?.feeCurrency]
      .filter(Boolean)
      .forEach((c) => currencySet.add(String(c)));
    if (n?.labels) n.labels.forEach((l) => tagSet.add(l));
    if (n?.tradeGroup) tagSet.add(n.tradeGroup);
  }

  return {
    sessionId: latest.id,
    platform: 'cointracking',
    fileName: latest.fileName,
    fileType: latest.fileType,
    createdAt: latest.createdAt,
    recordCount: latest.recordCount,
    typesCount: recomputedTypes,
    currencies: Array.from(currencySet),
    suggestedTags: Array.from(tagSet).slice(0, 50),
  };
}

export async function getRecordsSample(sessionId: number, limit = 5): Promise<ReferenceRecord[]> {
  return referenceDB.records.where('sessionId').equals(sessionId).limit(limit).toArray();
}

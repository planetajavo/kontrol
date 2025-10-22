// =============================================================================
// Reference DB Types (independent of main app data)
// =============================================================================

export type ReferencePlatform = 'cointracking' | 'waltio' | 'blockpit' | 'unknown';

export interface ImportSession {
  id?: number; // Auto-incremented by Dexie
  platform: ReferencePlatform;
  fileName: string;
  fileType: string; // csv | xlsx | json | zip | unknown
  createdAt: number; // epoch ms
  recordCount: number;
  meta?: Record<string, any>;
}

export type ReferenceRecordCategory = 'transaction' | 'label' | 'other';

export interface CointrackingNormalized {
  date?: string; // ISO string if parsed
  type?: string;
  buyAmount?: number | null;
  buyCurrency?: string | null;
  sellAmount?: number | null;
  sellCurrency?: string | null;
  amount?: number | null; // for single-side exports
  currency?: string | null; // for single-side exports
  feeAmount?: number | null;
  feeCurrency?: string | null;
  exchange?: string | null;
  tradeGroup?: string | null;
  comment?: string | null;
  labels?: string[] | null;
}

export interface ReferenceRecord {
  id?: number; // Auto-incremented by Dexie
  sessionId: number; // FK to ImportSession.id
  platform: ReferencePlatform;
  category: ReferenceRecordCategory;
  sourceFile?: string; // for ZIP inner files
  raw: Record<string, any>; // original parsed row
  normalized?: CointrackingNormalized | Record<string, any>;
}

export interface ImportSummary {
  sessionId: number;
  platform: ReferencePlatform;
  fileName: string;
  fileType: string;
  createdAt: number;
  recordCount: number;
  typesCount: Record<string, number>;
  currencies: string[];
  suggestedTags: string[]; // derived from tradeGroup/labels/comments
}

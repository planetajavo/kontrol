import Dexie, { Table } from 'dexie';
import type { ImportSession, ReferenceRecord } from '../types/reference';

export class ReferenceDB extends Dexie {
  sessions!: Table<ImportSession, number>;
  records!: Table<ReferenceRecord, number>;

  constructor() {
    super('kontrol_reference');

    this.version(1).stores({
      sessions: '++id, platform, createdAt',
      records: '++id, sessionId, platform, category'
    });
  }
}

export const referenceDB = new ReferenceDB();

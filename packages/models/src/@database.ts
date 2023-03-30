import Dexie, { Table } from 'dexie';

export class Database extends Dexie {
  buildings!: Table;
  clientInfos!: Table;
  dwellingInfos!: Table;
  farmInfos!: Table;

  constructor() {
    super('ddc');
    this.version(1).stores({
      buildings: '++id, contactId, applicationId, type, name',
      clientInfos: '++id, contactId',
      cvuInfos: '++id, contactId',
      dwellingInfos: '++id, contactId, buildingId',
      farmInfos: '++id, contactId',
    });
  }
}

export const db = new Database();

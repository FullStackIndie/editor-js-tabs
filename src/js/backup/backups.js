import backupsDb from "./backupsDb.js";

export default class Backups {
  constructor() {
    this.db = backupsDb.db;
    this.dbTable = backupsDb.db.backup;
  }

  async updateBackup(data) {
    return this.db.transaction("rw", this.dbTable, async () => {
      await this.setBackup(data);
      console.log(`Backup Data Cache key ${data.cacheKey}`);
      await this.pruneBackup(data.cacheKey);
    });
  }

  async setBackup(data) {
    console.log(`Backup Data Cache key ${data.cacheKey}`);
    await this.dbTable.put(data).catch((error) => {
      console.log("Error setting backup: ", error);
    });
  }

  async getBackups(cacheKey) {
    console.log(`Backup Data Cache key ${cacheKey}`);
    return await this.dbTable
      .where("cacheKey")
      .equalsIgnoreCase(cacheKey)
      .toArray();
  }

  async getLastBackup(cacheKey) {
    console.log(`Backup Data Cache key ${cacheKey}`);
    return await this.dbTable
      .where("cacheKey")
      .equalsIgnoreCase(cacheKey)
      .last();
  }

  async getBackupById(editorId) {
    return await this.dbTable.get(editorId);
  }

  async getAllBackupIds() {
    return await this.dbTable.toCollection().primaryKeys();
  }

  async pruneBackup(cacheKey) {
    const count = await this.dbTable.count();
    if (count > 10) {
      await this.dbTable
        .where("cacheKey")
        .equalsIgnoreCase(cacheKey)
        .reverse()
        .offset(10)
        .delete()
        .catch((error) => {
          console.log("Error deleting backup: ", error);
        });
    }
  }
}

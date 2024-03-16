import backupsDb from "./backupsDb.js";
import Backups from "./backups.js";

export default class Save {
  constructor() {
    this.db = backupsDb.db;
    this.dbTable = backupsDb.db.save;
    this.backups = new Backups();
  }

  async saveData(data) {
    return this.db.transaction("rw", this.dbTable, async () => {
      await this.deletedSavedData(data.cacheKey);
      await this.setSavedData(data);
    });
  }

  async getSavedData(cacheKey) {
    if(cacheKey === undefined || cacheKey === null || cacheKey === "") {
      cacheKey = window.location.pathname;
      console.log("No cache key provided, using window.location.pathname: ", cacheKey);
    }
    return await this.dbTable
      .where("cacheKey")
      .equalsIgnoreCase(cacheKey)
      .last();
  }

  async setSavedData(data) {
    await this.dbTable.put(data).catch((error) => {
      console.log("Error saving data: ", error);
    });
  }

  async deletedSavedData(cacheKey) {
    await this.dbTable
      .where("cacheKey")
      .equalsIgnoreCase(cacheKey)
      .delete()
      .catch((error) => {
        console.log("Error deleting saved data: ", error);
      });
  }
}

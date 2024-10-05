import Dexie from "dexie";

class backupsDb {
  constructor() {
    if (!backupsDb.instance) {
      this.db = new Dexie("editorjs-tabs-backups");
      this.oldDBVersion = 2;
      this.newDBVersion = 3;
      this.initDatabase();
      backupsDb.instance = this;
    }
    return backupsDb.instance;
  }

  initDatabase() {
    this.db.version(this.newDBVersion).stores({
      backup: "++editorId, time, cacheKey",
      save: "++editorId, time, cacheKey",
    });
  }
}

const instance = new backupsDb();
Object.freeze(instance);

export default instance;

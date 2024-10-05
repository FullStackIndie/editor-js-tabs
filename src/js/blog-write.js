import Backups from "./backup/backups";
import EditorJSInstance from "./editor";
import { isJson } from "./helpers/json-helpers";
import Save from "./backup/save";
import EventManager from "./tabs/events/event-manager";
// export { isJson } from "./helpers/json-helpers";
/**
 * Takes a config object to set url paths for html preview, restore data pages.
 * You can also set a cache key for saving backups of different blog posts.
 * @constructor
 * @param {object} config - Set url for html pages, cache keys, etc...
 */
export default class BlogWrite {
  constructor(config) {
    this.backups = new Backups();
    this.editorJS = new EditorJSInstance();
    this.save = new Save();
    this.config = config;

    this.previewRequest = {
      type: "preview",
      url: this.config.baseUrl,
      data: null,
    };

    this.restoreGetRequest = {
      type: "restore-get",
      url: this.config.baseUrl,
    };

    this.restorePostRequest = {
      type: "restore-post",
      url: this.config.baseUrl,
      backupData: null,
      latestData: null,
      backupIds: null,
    };
    this.previewIsActive = false;
    this.previewWindow = null;
    this.diffWindow = null;
    this.editor = null;
    this.cacheKey = this.config.cacheKey;
  }

  addEventListeners() {
    EventManager.subscribe("editor-save-data", this.saveData.bind(this));
    EventManager.subscribe("editor-block-change", this.saveBackup.bind(this));
  }

  async attachRemoveEventListeners() {
    window.addEventListener("beforeunload", async (e) => {
      console.log("Saving backup before unload");
      await saveBackup();
    });
    window.addEventListener("unload", () => {
      EventManager.unsubscribe("editor-save-data", this.saveData.bind(this));
      EventManager.unsubscribe(
        "editor-block-change",
        this.saveBackup.bind(this)
      );
      this.editor.destroy().bind(this);
    });
  }

  /**
   * Initialize the editorjs instance
   * @returns {EditorJSInstance} - The editorjs instance
   */
  initEditorJS(data) {
    if (isJson(data)) {
      data = JSON.parse(data);
    } else if (data === null || data === "undefined") {
      data = "{}";
    }
    this.addEventListeners();
    this.attachRemoveEventListeners();
    this.editor = this.editorJS.initEditorJS(data);
    return this.editor;
  }

  clearEditorJS() {
    this.editor.clear();
  }

  async saveData(data) {
    if (
      data.cacheKey === undefined ||
      data.cacheKey === null ||
      data.cacheKey === ""
    ) {
      data.cacheKey = this.cacheKey;
    }
    console.log(`Cache key ${this.cacheKey}`);

    await this.save.saveData(data);
  }

  async previewData() {
    await this.editor
      .save()
      .then((data) => {
        this.updatePreviewWindow(data);
      })
      .catch((error) => {
        console.log("Preview Error: ", error);
      });
  }

  loadSavedData() {
    console.log(`Cache key ${this.cacheKey}`);
    return this.save.getSavedData(this.cacheKey);
  }

  async loadCurrentSave() {
    return await this.loadSavedData()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("Error loading saved data: ", error);
      });
  }

  saveBackup() {
    console.log("Saving backup");
    this.editor
      .save()
      .then(async (data) => {
        console.log(`Cache key ${this.cacheKey}`);
        data.cacheKey = this.cacheKey;
        await this.backups.updateBackup(data).catch((error) => {
          console.log("Backup Error: ", error);
        });
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }

  loadBackup() {
    console.log(`Cache key ${this.cacheKey}`);
    return this.backups.getLastBackup(this.cacheKey).catch((error) => {
      console.log("Backup Error: ", error);
    });
  }

  async launchPreviewWindow(url) {
    if (this.previewWindow === null || this.previewWindow.closed) {
      this.previewWindow = window.open(
        url,
        "_preview",
        "popup=yes,left=500,height=670,width=750,scrollbars=yes"
      );
      let lastSave = await this.loadSavedData();
      this.previewRequest.data = lastSave;
      this.previewWindow.window.onload = (event) => {
        setTimeout(() => {
          this.previewWindow.postMessage(
            this.previewRequest,
            this.previewRequest.url
          );
        }, 1_000);
      };
    } else {
      this.previewWindow.focus();
    }
    return this.previewWindow;
  }

  updatePreviewWindow(data) {
    if (this.previewWindow) {
      this.previewRequest.data = data;
      this.previewWindow.postMessage(
        this.previewRequest,
        this.previewRequest.url
      );
    }
  }

  closePreviewWindow() {
    if (this.previewWindow) {
      this.previewWindow.close();
    }
  }

  async restoreData() {
    console.log(`Cache key ${this.cacheKey}`);
    this.restorePostRequest.backupData = await this.loadBackup(
      this.cacheKey
    ).catch((error) => {
      console.log("Backup Error: ", error);
    });
    this.restorePostRequest.latestData = await this.loadCurrentSave();
    if (this.diffWindow === null || this.diffWindow.closed) {
      this.diffWindow = window.open(
        `${this.config.baseUrl}/${this.config.restorePath}`,
        "_blank",
        "popup=yes,left=500,height=670,width=750,scrollbars=yes"
      );
      let backupIds = await this.backups.getAllBackupIds().catch((error) => {
        console.log("Backup Error: ", error);
      });
      this.restorePostRequest.backupIds = backupIds;
      this.diffWindow.window.onload = () => {
        setTimeout(() => {
          this.diffWindow.postMessage(
            this.restorePostRequest,
            this.restorePostRequest.url
          );
        }, 1_000);
      };
    } else {
      this.diffWindow.focus();
    }
  }

  async handleRestoreState(data) {
    if (data === undefined || data === null) {
      console.log("No data to restore");
      return;
    }
    this.saveBackup();
    await this.backups
      .getBackupById(data.requestId)
      .then((backup) => {
        this.editor.render(backup).catch((error) => {
          console.log("Saving failed: ", error);
        });
      })
      .catch((error) => {
        console.log("Backup Error: ", error);
      });
  }

  async handleUpdateState(data) {
    if (data === undefined || data === null) {
      console.log("No data to restore");
      return;
    }
    await this.backups
      .getBackupById(data.requestId)
      .then(async (backup) => {
        this.restorePostRequest.backupData = backup;
        this.restorePostRequest.latestData = null;
        this.diffWindow.postMessage(
          this.restorePostRequest,
          this.restorePostRequest.url
        );
      })
      .catch((error) => {
        console.log("Backup Error: ", error);
      });
  }

  pasteJson(inputId, modalId) {
    let json = document.getElementById(inputId).value;
    if (!isJson(json)) {
      alert("Invalid Json");
      return;
    }
    $(modalId).modal("hide");
    let data = JSON.parse(json);
    this.editor.render(data).catch((error) => {
      alert("Loading JSON failed: ", error);
    });
  }

  async savedDataToJsonClipboardAsync() {
    try {
      let savedData = await this.loadSavedData();
      if (!savedData) {
        alert("Error: No data to copy to json");
        return;
      }
      let json = JSON.stringify(savedData);
      await navigator.clipboard.writeText(json);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  }

  getDataFromClipboardAsync() {
    navigator.clipboard
      .readText()
      .then((text) => {
        if (!isJson(text)) {
          alert("Invalid Json");
          return;
        }
        let data = JSON.parse(text);
        this.editor.render(data).catch((error) => {
          alert("Loading JSON failed: ", error);
        });
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
      });
  }
}

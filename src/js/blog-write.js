import Backups from "./backup/backups";
import EditorJSInstance from "./editor";
import { isJson } from "./helpers/json-helpers";
import Save from "./backup/save";
import EventManager from "./tabs/events/event-manager";

export { isJson } from "./helpers/json-helpers";
export const backups = new Backups();
export const editorJS = new EditorJSInstance();
export const save = new Save();

export const previewRequest = {
  type: "preview",
  url: "http://localhost:5173",
  data: null,
};

export const restoreGetRequest = {
  type: "restore-get",
  url: "http://localhost:5173",
};

export const restorePostRequest = {
  type: "restore-post",
  url: "http://localhost:5173",
  backupData: null,
  latestData: null,
  backupIds: null,
};
export let previewIsActive = false;
export let previewWindow = null;
export let diffWindow = null;
export let editor = null;
export const cacheKey = window.location.pathname;

export function addEventListeners() {
  EventManager.subscribe("editor-save-data", saveData.bind(this));
  EventManager.subscribe("editor-block-change", saveBackup.bind(this));
}

export function attachRemoveEventListeners() {
  window.addEventListener("beforeunload", async (e) => {
    console.log("Saving backup before unload");
    await saveBackup();
  });
  window.addEventListener("unload", () => {
    EventManager.unsubscribe("editor-save-data", saveData.bind(this));
    EventManager.unsubscribe("editor-block-change", saveBackup.bind(this));
    editor.destroy().bind(this);
  });
}

/**
 * Initialize the editorjs instance
 * @returns {EditorJSInstance} - The editorjs instance
 */
export function initEditorJS(data) {
  if (isJson(data)) {
    data = JSON.parse(data);
  } else if (data === null || data === "undefined") {
    data = "{}";
  }
  addEventListeners();
  attachRemoveEventListeners();
  editor = editorJS.initEditorJS(data);
  return editor;
}

export async function saveData(data) {
  if (
    data.cacheKey === undefined ||
    data.cacheKey === null ||
    data.cacheKey === ""
  ) {
    data.cacheKey = window.location.pathname;
  }
  await save.saveData(data);
}

export async function previewData() {
  await editor
    .save()
    .then((data) => {
      updatePreviewWindow(data);
    })
    .catch((error) => {
      console.log("Preview Error: ", error);
    });
}

export async function loadSavedData() {
  return save.getSavedData(cacheKey);
}

export async function loadCurrentSave() {
  return await loadSavedData()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error loading saved data: ", error);
    });
}

export function saveBackup() {
  console.log("Saving backup");
  editor
    .save()
    .then(async (data) => {
      data.cacheKey = cacheKey;
      await backups.updateBackup(data).catch((error) => {
        console.log("Backup Error: ", error);
      });
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
}

export async function loadBackup() {
  return backups.getLastBackup(cacheKey).catch((error) => {
    console.log("Backup Error: ", error);
  });
}

export async function launchPreviewWindow() {
  if (previewWindow === null || previewWindow.closed) {
    previewWindow = window.open(
      "http://localhost:5173/sites/preview.html",
      "_preview",
      "popup=yes,left=500,height=670,width=750,scrollbars=yes"
    );
    let lastSave = await loadSavedData();
    previewRequest.data = lastSave;
    previewWindow.window.onload = (event) => {
      setTimeout(() => {
        previewWindow.postMessage(previewRequest, previewRequest.url);
      }, 1_000);
    };
  } else {
    previewWindow.focus();
  }
  return previewWindow;
}

export function updatePreviewWindow(data) {
  if (previewWindow) {
    previewRequest.data = data;
    previewWindow.postMessage(previewRequest, previewRequest.url);
  }
}

export function closePreviewWindow() {
  if (previewWindow) {
    previewWindow.close();
  }
}

export async function restoreData() {
  restorePostRequest.backupData = await loadBackup(cacheKey).catch((error) => {
    console.log("Backup Error: ", error);
  });
  restorePostRequest.latestData = await loadCurrentSave();
  if (diffWindow === null || diffWindow.closed) {
    diffWindow = window.open(
      "http://localhost:5173/sites/restore-diff.html",
      "_blank",
      "popup=yes,left=500,height=670,width=750,scrollbars=yes"
    );
    let backupIds = await backups.getAllBackupIds().catch((error) => {
      console.log("Backup Error: ", error);
    });
    restorePostRequest.backupIds = backupIds;
    diffWindow.window.onload = () => {
      setTimeout(() => {
        diffWindow.postMessage(restorePostRequest, restorePostRequest.url);
      }, 1_000);
    };
  } else {
    diffWindow.focus();
  }
}

export async function handleRestoreState(data) {
  if (data === undefined || data === null) {
    console.log("No data to restore");
    return;
  }
  saveBackup();
  await backups
    .getBackupById(data.requestId)
    .then((backup) => {
      editor.render(backup).catch((error) => {
        console.log("Saving failed: ", error);
      });
    })
    .catch((error) => {
      console.log("Backup Error: ", error);
    });
}

export async function handleUpdateState(data) {
  if (data === undefined || data === null) {
    console.log("No data to restore");
    return;
  }
  await backups
    .getBackupById(data.requestId)
    .then(async (backup) => {
      restorePostRequest.backupData = backup;
      restorePostRequest.latestData = null;
      diffWindow.postMessage(restorePostRequest, restorePostRequest.url);
    })
    .catch((error) => {
      console.log("Backup Error: ", error);
    });
}

export function pasteJson(inputId, modalId) {
  let json = document.getElementById(inputId).value;
  if (!isJson(json)) {
    alert("Invalid Json");
    return;
  }
  $(modalId).modal("hide");
  let data = JSON.parse(json);
  editor.render(data).catch((error) => {
    alert("Loading JSON failed: ", error);
  });
}

export async function savedDataToJsonClipboardAsync() {
  try {
    let savedData = await loadSavedData();
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

export async function getDataFromClipboardAsync() {
  navigator.clipboard
    .readText()
    .then((text) => {
      if (!isJson(text)) {
        alert("Invalid Json");
        return;
      }
      let data = JSON.parse(text);
      editor.render(data).catch((error) => {
        alert("Loading JSON failed: ", error);
      });
    })
    .catch((err) => {
      console.error("Failed to read clipboard contents: ", err);
    });
}

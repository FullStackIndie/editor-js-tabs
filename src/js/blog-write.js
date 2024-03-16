import Parser from "./parser/editor-parser";
import Backups from "./backup/backups";
import EditorJS from "./editor";
import { useHighlightJS } from "./highlight";
import { isJson } from "./helpers/json-helpers";
import Save from "./backup/save";

export const backups = new Backups();
export const editorJS = new EditorJS();
export const parser = new Parser();
export const save = new Save();
export const hljs = await initHighlightJS();

export { isJson } from "./helpers/json-helpers";

export async function previewData(editorJS) {
  return new Promise((resolve, reject) => {
    editorJS
      .save()
      .then(async (data) => {
        let html = await parser.parseDataToHtml(data);
        html.querySelectorAll("pre code").forEach((code) => {
          hljs.highlightElement(code);
        });
        resolve(html || "Error: No data to preview");
      })
      .catch((error) => {
        console.log("Preview Error: ", error);
        reject(error);
      });
  });
}

export async function getParsedData(data) {
  let html = await parser.parseDataToHtml(data);
  html.querySelectorAll("pre code").forEach((code) => {
    hljs.highlightElement(code);
  });
  return html || "Error: No data to preview";
}

export async function loadSavedData(cacheKey) {
  return save.getSavedData(cacheKey).catch((error) => {
    console.log("Saved Data Error: ", error);
  });
}

export async function saveBackup(data, cacheKey) {
  data.cacheKey = cacheKey;
  return backups.updateBackup(data);
}

export async function loadBackup(cacheKey) {
  return backups.getLastBackup(cacheKey).catch((error) => {
    console.log("Backup Error: ", error);
  });
}

export async function renderList(data) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("row", "mt-3", "container-fluid");

  let pillWrapper = document.createElement("div");
  pillWrapper.classList.add("nav", "flex-row", "nav-pills", "col-3");
  pillWrapper.style.height = "500px";
  pillWrapper.style.overflowY = "auto";
  pillWrapper.style.overflowX = "hidden";
  pillWrapper.setAttribute("id", "history-pills-tab");
  pillWrapper.setAttribute("role", "tablist");
  pillWrapper.setAttribute("aria-orientation", "vertical");

  let pillItemWrapper = document.createElement("div");
  pillItemWrapper.style.height = "500px";
  pillItemWrapper.style.overflowY = "auto";
  pillItemWrapper.style.overflowX = "hidden";
  pillItemWrapper.classList.add("tab-content", "col-9");
  pillItemWrapper.setAttribute("id", "history-pills-tab-content");

  for (let i = data.length - 1; i >= 0; i--) {
    let pillAnchor = renderPillAnchor(data[i], i);
    pillWrapper.appendChild(pillAnchor);
    let pillContent = renderPillContent(i);
    let content = await parser.parseDataToHtml(data[i]);
    pillContent.appendChild(content);
    pillItemWrapper.appendChild(pillContent);
  }
  wrapper.appendChild(pillWrapper);
  wrapper.appendChild(pillItemWrapper);
  return wrapper;
}

export function renderPillAnchor(data, index) {
  let pillContent = document.createElement("a");
  pillContent.classList.add("nav-link");
  if (index === 0) {
    pillContent.classList.add("active");
    pillContent.setAttribute("aria-selected", "true");
  } else {
    pillContent.setAttribute("aria-selected", "false");
  }
  pillContent.setAttribute("data-toggle", "pill");
  pillContent.setAttribute("id", `history-pills-tab-${index}`);
  pillContent.setAttribute("href", `#history-pills-${index}`);
  pillContent.setAttribute("role", "tab");
  pillContent.setAttribute("aria-controls", `history-pills-${index}`);
  pillContent.textContent = `Item Type - ${data.type}`;
  return pillContent;
}

export function renderPillContent(index) {
  let pillContent = document.createElement("div");
  pillContent.classList.add("tab-pane");
  if (index === 0) {
    pillContent.classList.add("active", "show");
  }
  pillContent.setAttribute("id", `history-pills-${index}`);
  pillContent.setAttribute("role", "tabpanel");
  pillContent.setAttribute("aria-labelledby", `history-pills-tab-${index}`);
  return pillContent;
}

export function restoreSelectedHistory(document, editor) {
  let historyParent = document.querySelector(
    `a.nav-link.active[data-toggle="pill"]`
  );
  let historyId = historyParent.getAttribute("href");
  let history = document.querySelector(historyId);
  console.log(history);
  return history.innerHTML;
}

/**
 * Initialize the editorjs instance
 * @returns {EditorJS} - The editorjs instance
 */
export function initEditorJS(data) {
  if (isJson(data)) {
    data = JSON.parse(data);
  } else if (data === null || data === "undefined") {
    data = "{}";
  }
  return editorJS.initEditorJS(data);
}

export async function initHighlightJS() {
  let config = {
    languages: [
      "javascript",
      "css",
      "json",
      "markdown",
      "csharp",
      "python",
      "ruby",
      "typescript",
      "xml",
      "yaml",
    ],
  };
  return useHighlightJS(config);
}

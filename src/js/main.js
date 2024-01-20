import Parser from "./parser/editor-parser";
import useEditorJS from "./editor";
import useHighlightJs from "./highlight";

export { default as Parser } from "./parser/editor-parser";

export function previewDataAsHtml(id) {
  let content = localStorage.getItem("content");
  let preview = document.getElementById(id);
  let parser = new Parser();
  let htmlPreview = parser.parseDataToHtml(content);
  console.log("htmlPreview");
  console.log(htmlPreview);
  preview.innerHTML = htmlPreview;
}

export function saveData(editor) {
  editor
    .save()
    .then((outputData) => {
      localStorage.setItem("content", JSON.stringify(outputData));
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
}

export function loadData(editor) {
  let content = localStorage.getItem("content");
  console.log(content);
  editor
    .render(JSON.parse(content))
    .then(() => {
      console.log("Content has been loaded");
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
}

export function getData() {
  let content = localStorage.getItem("content");
  if (content == null || content == "undefined") {
    console.log("Content was null");
    return "{}";
  } else {
    return content;
  }
}

export function initializeEditorJS() {
  let data = getData();
  const editor = useEditorJS(JSON.parse(data));
  return editor;
}

export function initializeHighlightJs() {
  const hljs = useHighlightJs();
  return hljs;
}

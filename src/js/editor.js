import EditorJS from "@editorjs/editorjs";
import { editorConfig } from "./editor-config";
import EventManager from "./tabs/events/event-manager";

// import { alignTuneOnLoad } from "./tunes/align-tune/align-tune";

export default class EditorJSInstance {
  constructor() {
    this.editor = null;
  }

  initEditorJS(data) {
    const editor = new EditorJS({
      holder: "editorjs",
      data: data,
      onChange: async (api, event) => {
        let editorSavedData = api.saver.save();
        editorSavedData.then(async (data) => {
          EventManager.raiseEvent("editor-save-data", data);
          if (event.type === "block-removed" || event.type === "block-added") {
            EventManager.raiseEvent("editor-block-change", data);
          }
        });
      },
      onReady: () => {
        // data.blocks.forEach((block) => {
        //   if(Object.hasOwn(block, 'tunes')){
        //     if(Object.hasOwn(block.tunes, 'alignTune')){
        //       alignTuneOnLoad(block.id, block.tunes.alignTune);
        //     }
        //   }
        // });
      },
      ...editorConfig,
    });
    this.editor = editor;
    return editor;
  }
}

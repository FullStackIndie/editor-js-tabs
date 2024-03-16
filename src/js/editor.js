import EditorJS from "@editorjs/editorjs";
import { editorConfig } from "./editor-config";
import Save from "./backup/save";

// import { alignTuneOnLoad } from "./tunes/align-tune/align-tune";

export default class EditorJSInstance {
  constructor() {
    this.save = new Save();
  }
  initEditorJS(data) {
    const editor = new EditorJS({
      holder: "editorjs",
      data: data,
      onChange: async (api, event) => {
        let editorSavedData = api.saver.save();
        editorSavedData.then(async (data) => {
          if (
            data.cacheKey === undefined ||
            data.cacheKey === null ||
            data.cacheKey === ""
          ) {
            data.cacheKey = window.location.pathname;
          }
          this.save.saveData(data);
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
    return editor;
  }
}

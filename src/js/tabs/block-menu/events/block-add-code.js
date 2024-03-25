import { addCodeBlockSvgIcon } from "../../tabs-icons";
import TabsCodeBlock from "../../content/tabs-code-block";

export default class BlockAddCode {
  constructor(api) {
    this.api = api;
    this.tabsCodeBlock = new TabsCodeBlock();
  }

  static get label() {
    return "Add Code Block";
  }

  static get icon() {
    return addCodeBlockSvgIcon;
  }

  eventHandler(blockData) {
    let activeTab = blockData.querySelector(".tab-content .show.active");
    if (activeTab) {
      let codeContent = this.tabsCodeBlock.renderCodeContent({
        lang: "javascript",
        code: "",
      });
      activeTab.appendChild(codeContent);
    }
  }
}

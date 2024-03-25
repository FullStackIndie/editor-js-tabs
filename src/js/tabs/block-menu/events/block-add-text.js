import { addTextSvgIcon } from "../../tabs-icons";
import TabsText from "../../content/tabs-text";

export default class BlockAddText {
  constructor(api) {
    this.api = api;
    this.tabsText = new TabsText();
  }

  static get label() {
    return "Add Text";
  }

  static get icon() {
    return addTextSvgIcon;
  }

  eventHandler(blockData) {
    let activeTab = blockData.querySelector(".tab-content .show.active");
    if (activeTab) {
      let textContent = this.tabsText.renderTextContent({
        content: "Edit",
      });
      activeTab.appendChild(textContent);
    }
  }
}

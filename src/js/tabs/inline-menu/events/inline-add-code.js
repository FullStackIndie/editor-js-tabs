import { addCodeBlockSvgIcon } from "../../tabs-icons";
import TabsCodeBlock from "../../content/tabs-code-block";

export default class InlineAddCode {
  static get attribute() {
    return { menuKey: "add-tab-code", itemKey: "data-tab-code" };
  }

  static get icon() {
    return addCodeBlockSvgIcon;
  }

  static onDeleteEvent(event) {
    if(event.target) {
      console.log("Code Deleted");
    }
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let tabsCodeBlock = new TabsCodeBlock();
      let codeBlockContent = tabsCodeBlock.renderCodeContent({
        code: "",
        lang: "plaintext",
      });
      dataItem.parentNode.insertBefore(codeBlockContent, dataItem.nextSibling);
    });
  }
}

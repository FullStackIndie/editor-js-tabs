import { addCodeBlockSvgIcon } from "../../tabs-icons";
import TabsCodeBlock from "../../content/tabs-code-block";

export default class InlineAddCode {
  static get attribute() {
    return { key: "add-tab-code", value: "" };
  }

  static get icon() {
    return addCodeBlockSvgIcon;
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let tabsCodeBlock = new TabsCodeBlock();
      let codeBlockContent = tabsCodeBlock.renderCodeContent(
        { code: "", lang: "plaintext"}
      );
      dataItem.parentNode.insertBefore(codeBlockContent, dataItem.nextSibling);
    });
  }
}

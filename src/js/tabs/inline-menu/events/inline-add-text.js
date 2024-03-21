import { addTextSvgIcon } from "../../tabs-icons";
import TabsText from "../../content/tabs-text";

export default class InlineAddText {
  static get attribute() {
    return { menuKey: "add-tab-text", itemKey: "data-tab-text" };
  }

  static get icon() {
    return addTextSvgIcon;
  }

  static onDeleteEvent(event) {
    if (event.target) {
      console.log("Text Deleted");
    }
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let tabsText = new TabsText();
      let textContent = tabsText.renderTextContent({
        content: "Edit",
      });
      dataItem.parentNode.insertBefore(textContent, dataItem.nextSibling);
    });
  }
}

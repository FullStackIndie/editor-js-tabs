import { addEmbedSvgIcon } from "../../tabs-icons";
import TabsEmbed from "../../content/tabs-embed";

export default class InlineAddEmbed {
  static get attribute() {
    return { menuKey: "add-tab-text", itemKey: "data-tab-text" };
  }

  static get icon() {
    return addEmbedSvgIcon;
  }

  static onDeleteEvent(event) {
    if (event.target) {
      console.log("EmbedDeleted");
    }
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let tabsEmbed = new TabsEmbed();
      let embedContent = tabsEmbed.renderEmbedContent({
        html: "",
      });
      dataItem.parentNode.insertBefore(embedContent, dataItem.nextSibling);
    });
  }
}

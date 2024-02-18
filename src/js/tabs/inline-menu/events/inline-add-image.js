import { addImageSvgIcon } from "../../tabs-icons";
import TabsImage from "../../content/tabs-image";

export default class InlineAddImage {
  static get attribute() {
    return { key: "add-tab-image", value: "" };
  }

  static get icon() {
    return addImageSvgIcon;
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let tabsImage = new TabsImage();
      tabsImage.createImageEventButton().click();
      let imageContent = tabsImage.renderImageContent({
        url: "www.google.com",
      });
      dataItem.parentNode.insertBefore(imageContent, dataItem.nextSibling);
    });
  }
}

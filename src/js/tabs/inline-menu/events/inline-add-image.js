import { addImageSvgIcon } from "../../tabs-icons";
import TabsImage from "../../content/tabs-image";

export default class InlineAddImage {
  static get attribute() {
    return { menuKey: "add-tab-image", itemKey: "data-tab-img" };
  }

  static get icon() {
    return addImageSvgIcon;
  }

  static onDeleteEvent(event) {
    console.log("Image Deleted");
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let tabsImage = new TabsImage();
      let imageContent = tabsImage.createImageEventButton();
      console.log(imageContent);
      // dataItem.parentNode.insertBefore(imageContent, dataItem.nextSibling);
    });
  }
}

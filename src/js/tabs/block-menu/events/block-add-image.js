import { addImageSvgIcon } from "../../tabs-icons";
import TabsImage from "../../content/tabs-image";

export default class BlockAddImage {
  constructor(api) {
    this.api = api;
    this.tabsImage = new TabsImage();
  }

  static get label() {
    return "Add Image";
  }

  static get icon() {
    return addImageSvgIcon;
  }

  eventHandler(blockData) {
    let activeTab = blockData.querySelector(".tab-content .show.active");
    if (activeTab) {
      this.tabsImage.createImageTabParentEventButton(activeTab);
    }
  }
}

import { deleteSvgIcon } from "../../tabs-icons";
import InlineMenuConfig from "../inline-menu-config";

export default class InlineDeleteItem {
  constructor() {
    this.inlineMenuConfig = new InlineMenuConfig();
  }
  static get attribute() {
    return { menuKey: "delete-tab-item" };
  }

  static get icon() {
    return deleteSvgIcon();
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      this.handleDataItemTypes(dataItem);
      dataItem.remove();
    });
  }

  getDeleteCallbacks() {
    let deleteCallbackClasses = [];
    this.inlineMenuConfig.config.forEach((item) => {
      if (item.class.onDeleteEvent !== undefined) {
        deleteCallbackClasses.push(item.class);
      }
    });
    return deleteCallbackClasses;
  }

  handleDataItemTypes(dataItem) {
    let deleteCallbackClasses = this.getDeleteCallbacks();
    deleteCallbackClasses.forEach((callback) => {
      let key = callback.attribute.itemKey;
      if(key === "" || key === undefined || key === null) {
        return;
      }
      let itemType = dataItem.querySelector(`[${key}]`);
      if (itemType !== null) {
        let event = {
          target: dataItem,
        };
        callback.onDeleteEvent(event);
      }
    });
  }
}

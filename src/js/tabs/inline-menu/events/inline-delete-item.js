import { deleteSvgIcon } from "../../tabs-icons";
import InlineMenuConfig from "../inline-menu-config";

export default class InlineDeleteItem {
  constructor() {
    this.inlineMenuConfig = new InlineMenuConfig();
  }
  static get attribute() {
    return { menuKey: "delete-tab-item", itemKey: "data-inline-menu" };
  }

  static get icon() {
    return deleteSvgIcon();
  }

  static get isDeleteClass() {
    return true;
  }

  static onDeleteEvent(event) {
    if (event.target) {
      event.target.remove();
    }
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let callbacks = this.getDeleteCallbacks();
      this.handleDeleteCallbacks(dataItem, callbacks.deleteCallbackClasses);
      this.handleDeleteClassEvent(dataItem, callbacks.deleteClass);
    });
  }

  getDeleteCallbacks() {
    let deleteCallbackClasses = [];
    let deleteClass = null;
    this.inlineMenuConfig.config.forEach((item) => {
      if (item.class.onDeleteEvent !== undefined) {
        if (item.class.isDeleteClass === true) {
          deleteClass = item.class;
        } else {
          deleteCallbackClasses.push(item.class);
        }
      }
    });
    return { deleteCallbackClasses, deleteClass };
  }

  handleDeleteCallbacks(dataItem, callbacks) {
    callbacks.forEach((callback) => {
      let key = callback.attribute.itemKey;
      if (key === "" || key === undefined || key === null) {
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

  handleDeleteClassEvent(dataItem, deleteClass) {
    let key = deleteClass.attribute.itemKey;
    if (key === "" || key === undefined || key === null) {
      return;
    }
    let itemType = dataItem.querySelector(`[${key}]`);
    if (itemType !== null) {
      let event = {
        target: dataItem,
      };
      deleteClass.onDeleteEvent(event);
    }
  }
}

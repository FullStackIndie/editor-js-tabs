import { deleteSvgIcon } from "../../tabs-icons";

export default class InlineDeleteItem {
  static get attribute() {
    return { key: "delete-tab-item", value: "" };
  }

  static get icon() {
    return deleteSvgIcon();
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      dataItem.remove();
    });
  }
}

import {
  moveSvgIcon,
  editTabSvgIcon,
  deleteSvgIcon,
  addTextSvgIcon,
  addImageSvgIcon,
  addCodeBlockSvgIcon,
} from "./tabs-icons";

export default class TabsInlineMenu {
  constructor() {
    this.menu = null;
  }

  items = [
    {
      // decide how to structure this object and if it should have a parentObj
      // or not, or call a function to attach to the moveSvgIcon() icon
      attribute: { key: "data-tab-text", value: "" },
      icon: moveSvgIcon(),
      parentObj: null,
    },
  ];

  render() {
    if (this.menu === null) {
      this.menu = this.renderMenu();
    }
  }

  renderMenu() {
    let menu = document.createElement("div");
    menu.classList.add("dropright");
    return menu;
  }

  renderMenuItems(items) {
    let dropdown = document.createElement("div");
    dropdown.setAttribute("data-toggle", "dropdown");
    dropdown.setAttribute("aria-haspopup", "true");
    dropdown.setAttribute("aria-expanded", "false");

    let dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    let dropdownMenuItems = document.createElement("div");
    dropdownMenuItems.classList.add("row");

    items.array.forEach((item) => {
      dropdownMenuItems.appendChild(this.renderMenuItem(item));
    });

    dropdownMenu.appendChild(dropdownMenuItems);
    dropdown.appendChild(dropdownMenu);
    return dropdown;
  }

  renderMenuItem(item) {
    let itemWrapper = document.createElement("div");
    itemWrapper.classList.add("col-2");
    itemWrapper.setAttribute(item.attribute.key, item.attribute.value);
  }
}

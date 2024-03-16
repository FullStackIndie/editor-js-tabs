import InlineMenu from "./ui/inline-menu";
import InlineMenuItem from "./ui/inline-menu-item";
import InlineMenuConfig from "./inline-menu-config";

export default class TabsInlineMenu {
  constructor() {
    this.inlineMenu = new InlineMenu();
    this.inlineMenuItem = new InlineMenuItem();
    this.inlineMenuConfig = new InlineMenuConfig();
  }

  renderInlineMenu() {
    let menu = this.inlineMenu.renderInlineMenu();
    this.createMenuItems(menu);
    return menu;
  }

  createMenuItems(menu) {
    let dataMenu = menu.querySelector("[data-menu]");
    let dropdownMenuItems = document.createElement("div");
    dropdownMenuItems.classList.add("row");

    this.inlineMenuConfig.config.forEach((item) => {
      let menuItem = this.renderMenuItemWithEvent(item.class);
      dropdownMenuItems.appendChild(menuItem);
    });
    dataMenu.appendChild(dropdownMenuItems);
  }

  renderMenuItemWithEvent(eventClass) {
    let newEventClass = new eventClass(null);
    let menuItem = this.inlineMenuItem.renderInlineMenuItem(
      eventClass.icon,
      eventClass.attribute
    );
    let svg = menuItem.querySelector("svg");
    let bindEventHandlers = newEventClass.eventHandler.bind(
      newEventClass,
      svg,
      "[data-tab-item]"
    );

    bindEventHandlers();
    return menuItem;
  }
}

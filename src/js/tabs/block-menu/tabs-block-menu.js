import BlockMenuConfig from "./block-menu-config";

export default class TabsBlockMenu {
  constructor(api) {
    this.api = api;
    this.blockMenuConfig = new BlockMenuConfig();
  }

  renderBlockMenu() {
    const menuWrapper = document.createElement("div");
    return this.createMenuItems(menuWrapper);
  }

  createMenuItems(menu) {
    this.blockMenuConfig.config.forEach((item) => {
      let button = this.createButton(item.class.label, item.class.icon);
      this.addClickEventListener(button, item.class);
      menu.appendChild(button);
    });
    return menu;
  }

  createButton(label, icon) {
    let button = document.createElement("div");
    button.classList.add("cdx-settings-button", "cdx-text-variant__toggler");
    button.innerHTML = icon;
    this.api.tooltip.onHover(button, label, {
      placement: "top",
    });
    return button;
  }

  addClickEventListener(elem, eventClass) {
    let blockIndex = this.api.blocks.getCurrentBlockIndex();
    let block = this.api.blocks.getBlockByIndex(blockIndex);
    let blockId = block.id;
    let blockData = document.querySelector(`[data-id=${blockId}]`);

    elem.addEventListener("click", () => {
      let newEventClass = new eventClass(this.api);
      let bindEventHandlers = newEventClass.eventHandler.bind(
        newEventClass,
        blockData
      );
      bindEventHandlers();
    });
  }
}

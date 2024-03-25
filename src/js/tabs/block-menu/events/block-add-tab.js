import { addTabSvgIcon } from "../../tabs-icons";
import TabBase from "../../content/tabs-base";

export default class BlockAddTab {
  constructor(api) {
    this.api = api;
    this.tabBase = new TabBase(api);
    this.defaultData = {
      title: "NewTab",
      data: [
        {
          type: "text",
          content: `Edit`,
          index: 0,
        },
      ],
    };
  }

  static get label() {
    return "Add Tab";
  }

  static get icon() {
    return addTabSvgIcon;
  }

  eventHandler(blockData) {
    let tabParent = blockData.querySelector(".nav");
    let tabContentParent = blockData.querySelector(".tab-content");
    let id = crypto.randomUUID();
    let active = false;
    let tabRenderer = this.tabBase.renderTab(id, this.defaultData, active);
    let tabPanelRenderer = this.tabBase.renderTabPanel(
      id,
      this.defaultData,
      active
    );
    tabParent.appendChild(tabRenderer);
    tabContentParent.appendChild(tabPanelRenderer);
    this.tabBase.addTabEventHandlers(tabParent);
  }
}

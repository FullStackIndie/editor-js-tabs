import TabsSettings from "./tabs-settings";
import TabBase from "./content/tabs-base";
import { tabsSvgIcon } from "./tabs-icons";
import { isEmpty } from "lodash-es";
import TabsBlockMenu from "./block-menu/tabs-block-menu";
import Sortable from "sortablejs";
import escape from "lodash-es/escape";

export default class Tabs {
  constructor({ data, api, config }) {
    this.settings = new TabsSettings();
    this.tabBase = new TabBase(api);
    this.blockMenu = new TabsBlockMenu(api);
    this.data = data || this.settings.defaultData;
    this.api = api;
    this.config = config || this.settings.defaultConfig;
    this.wrapper = undefined;
  }

  static get toolbox() {
    return {
      title: "Tabs",
      icon: tabsSvgIcon,
    };
  }

  static get pasteConfig() {
    return {
      tags: ["pre"],
    };
  }

  onPaste(event) {
    console.log(event);
    const content = event.detail.data;
    console.log(content);
  }

  renderSettings() {
    let menu = this.blockMenu.renderBlockMenu();
    return menu;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("bordered-tab-contents", "cdx-block");

    let tabData = isEmpty(this.data) ? this.settings.defaultData : this.data;
    const renderedPanels = this.tabBase.handleTabRendering(tabData);

    if (renderedPanels) {
      this.wrapper.appendChild(renderedPanels.tabs);
      this.wrapper.appendChild(renderedPanels.panels);
      this.tabBase.addTabEventHandlers(this.wrapper);
      this.createSortables();
    }
    return this.wrapper;
  }

  save(blockContent) {
    let tabs = blockContent.querySelectorAll(".nav-link");
    let result = [];
    tabs.forEach((tab, index) => {
      let tabId = tab.getAttribute("aria-controls");
      let tabContent = this.getTabMetaData(tab, tabId, index);
      tabContent.data = this.getTabContent(tabId);
      result.push(tabContent);
    });
    return result;
  }

  getTabMetaData(tab, tabId, index) {
    let tabContent = {};
    tabContent.title = tab.textContent.trim();
    tabContent.tabId = tab.getAttribute("id");
    tabContent.tabContentId = tabId;
    if (index === 0) {
      tabContent.active = true;
      tabContent.activeClass = "show active";
    } else {
      tabContent.active = false;
      tabContent.activeClass = "";
    }
    return tabContent;
  }

  getTabContent(id) {
    let result = [];
    let tab = document.getElementById(id);
    let tabContent = tab.querySelectorAll(`*`);
    let currentIndex = 0;
    tabContent.forEach((content) => {
      if (content.matches("div[data-tab-text]")) {
        result.push(this.saveTextContent(content, currentIndex));
      } else if (content.matches("img[data-tab-img]")) {
        result.push(this.saveImgContent(content, currentIndex));
      } else if (content.matches("textarea[data-tab-code]")) {
        result.push(this.saveCodeBlockContent(content, currentIndex));
      }else if (content.matches("div[data-tab-embed-wrapper]")) {
        result.push(this.saveEmbedContent(content, currentIndex));
      }
    });
    return result;
  }

  saveTextContent(content, currentIndex) {
    let data = {};
    data.type = "text";
    data.content = content.innerHTML;
    data.index = currentIndex++;
    return data;
  }

  saveImgContent(content, currentIndex) {
    let data = {};
    data.type = "image";
    data.index = currentIndex++;
    data.url = content.src;
    data.width = content.width;
    data.height = content.height;

    let dataCaption = content.parentNode.querySelector(
      "[data-tab-img-caption]"
    );
    data.caption = dataCaption ? dataCaption.value : "";
    return data;
  }

  saveCodeBlockContent(content, currentIndex) {
    let data = {};
    let parent = content.parentNode;
    let select = parent.querySelector("select[data-tab-code-lang]");
    if (select.selectedIndex === -1) {
      select.selectedIndex = 0;
    }
    let selectedValue = select.options[select.selectedIndex].value;
    data.type = "codeBlock";
    data.index = currentIndex++;
    data.code = content.value;
    data.language = this.settings.languageList.find(
      (l) => l.code === selectedValue
    ).name;
    data.languageCode = selectedValue;
    return data;
  }

  saveEmbedContent(content, currentIndex) {
    let data = {};
    data.type = "embed";
    data.index = currentIndex++;
    data.html = escape(content.innerHTML);
    console.log(data);
    return data;
  }

  createSortables() {
    let tabContentPanels = this.wrapper.querySelectorAll(".tab-pane");
    tabContentPanels.forEach(async (tabContentPanel) => {
      await this.handleSortableJS(
        tabContentPanel.getAttribute("id"),
        this.wrapper
      );
    });
  }

  async handleSortableJS(id, wrapper) {
    let tabContentPanel = wrapper.querySelector(`#${id}`);
    new Sortable(tabContentPanel, {
      swapThreshold: 0.65, // elements must be 1% in the direction dragged to swap
      animation: 150, // duration of the swap animation in milliseconds
      dragoverBubble: true,
      handle: ".ce-toolbar__settings-btn",
    });
  }
}

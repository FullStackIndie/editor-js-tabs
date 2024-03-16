import Sortable from "sortablejs";
import TabsSettings from "./tabs-settings";
import TabsHandler from "./tabs-handler";
import { tabsSvgIcon } from "./tabs-icons";
import TabsEventHandlers from "./tabs-event-handlers";
import TabsImage from "./content/tabs-image";
import TabsText from "./content/tabs-text";
import TabsCodeBlock from "./content/tabs-code-block";
import { isEmpty } from "lodash-es";

export default class Tabs {
  constructor({ data, api, config }) {
    this.settings = new TabsSettings();
    this.tabHandler = new TabsHandler();
    this.eventHandler = new TabsEventHandlers(api);
    this.tabsImage = new TabsImage();
    this.tabsText = new TabsText();
    this.tabsCodeBlock = new TabsCodeBlock();
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

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("bordered-tab-contents", "cdx-block");

    let tabData = isEmpty(this.data) ? this.settings.defaultData : this.data;
    const renderedPanels = this.tabHandler.handleTabRendering(tabData);

    if (renderedPanels) {
      this.wrapper.appendChild(renderedPanels.tabs);
      this.wrapper.appendChild(renderedPanels.panels);

      let tabContentPanels = this.wrapper.querySelectorAll(".tab-pane");
      tabContentPanels.forEach((tabContentPanel) => {
        this.createSortable(tabContentPanel.getAttribute("id"), this.wrapper);
      });
      this.eventHandler.addTabEventHandlers(this.wrapper);
    }

    return this.wrapper;
  }

  save(blockContent) {
    let tabs = blockContent.querySelectorAll(".nav-link");
    let result = [];
    tabs.forEach((tab, index) => {
      let tabContent = {};
      tabContent.title = tab.textContent.trim();
      let tabId = tab.getAttribute("aria-controls");
      tabContent.tabId = tab.getAttribute("id");
      tabContent.tabContentId = tabId;
      if (index === 0) {
        tabContent.active = true;
        tabContent.activeClass = "show active";
      } else {
        tabContent.active = false;
        tabContent.activeClass = "";
      }
      tabContent.data = this.getTabContent(tabId);
      result.push(tabContent);
    });
    return result;
  }

  getTabContent(id) {
    let result = [];
    let tab = document.getElementById(id);
    let tabContent = tab.querySelectorAll(`*`);
    let currentIndex = 0;
    tabContent.forEach((content) => {
      let data = {};
      let isValid = false;
      if (content.matches("div[data-tab-text]")) {
        data.type = "text";
        data.content = content.innerHTML;
        data.index = currentIndex++;
        isValid = true;
      } else if (content.matches("img[data-tab-img]")) {
        data.type = "image";
        data.index = currentIndex++;
        data.url = content.src;
        data.caption = "";
        data.width = content.width;
        data.height = content.height;
        let dataCaption = content.parentNode.querySelector(
          "[data-tab-img-caption]"
        );
        if (dataCaption) {
          data.caption = dataCaption.value;
        }
        isValid = true;
      } else if (content.matches("textarea[data-tab-code]")) {
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
        isValid = true;
      }
      if (isValid) {
        result.push(data);
      }
    });
    return result;
  }

  renderSettings() {
    const settingWrapper = document.createElement("div");
    return this.handleRenderSettings(settingWrapper);
  }

  handleRenderSettings(parent) {
    this.settings.blockSettings.forEach((setting) => {
      let button = document.createElement("div");
      button.classList.add("cdx-settings-button", "cdx-text-variant__toggler");
      button.setAttribute("data-name", setting.label);
      button.innerHTML = setting.icon;
      this.api.tooltip.onHover(button, setting.label, {
        placement: "top",
      });
      this.addBlockSettingsEvents(setting, button);
      parent.appendChild(button);
    });
    return parent;
  }

  addBlockSettingsEvents(setting, button) {
    let tabContentParent = document.querySelector(
      ".tab-content > .show.active"
    );
    let tabId = tabContentParent.getAttribute("id");
    let tabContent = document.getElementById(tabId);

    if (setting.name === "tab") {
      button.addEventListener("click", () => {
        this.eventHandler.addAddTabEventsOnClick();
      });
    } else if (setting.name === "image") {
      button.addEventListener("click", () => {
        this.tabsImage.createImageEventButton().click();
      });
    } else if (setting.name === "text") {
      button.addEventListener("click", () => {
        tabContent.appendChild(
          this.tabsText.renderTextContent({ content: "Edit" })
        );
      });
    } else if (setting.name === "code") {
      button.addEventListener("click", () => {
        tabContent.appendChild(
          this.tabsCodeBlock.renderCodeContent({ lang: "javascript", code: "" })
        );
      });
    }
  }

  createSortable(id, wrapper) {
    let tabContentPanel = wrapper.querySelector(`#${id}`);
    new Sortable(tabContentPanel, {
      swapThreshold: 0.65, // elements must be 1% in the direction dragged to swap
      animation: 150, // duration of the swap animation in milliseconds
      dragoverBubble: true,
      handle: ".ce-toolbar__settings-btn",
    });
  }

  onPaste(event) {
    console.log(event);
    const content = event.detail.data;
    console.log(content);
  }
  static get pasteConfig() {
    return {
      tags: ["pre"],
    };
  }
}

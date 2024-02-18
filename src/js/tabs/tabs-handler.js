import { editTabSvgIcon, deleteSvgIcon } from "./tabs-icons";
import TabsDataItem from "./content/tabs-data-item";
import TabsText from "./content/tabs-text";
import TabsImage from "./content/tabs-image";
import TabsCodeBlock from "./content/tabs-code-block";

export default class TabsHandler {
  constructor() {
    this.tabsItem = new TabsDataItem();
    this.tabsText = new TabsText();
    this.tabsImage = new TabsImage();
    this.tabsCodeBlock = new TabsCodeBlock();
  }

  handleTabRendering(tabsData) {
    let tabId = crypto.randomUUID();
    let tabRendererList = document.createElement("ul");
    tabRendererList.classList.add("nav", "nav-tabs");
    tabRendererList.setAttribute("id", `tab-${tabId}`);
    tabRendererList.setAttribute("role", "tablist");

    let tabPanelWrapper = document.createElement("div");
    tabPanelWrapper.classList.add("tab-content");
    tabPanelWrapper.setAttribute("id", `tabContent-${tabId}`);

    for (let i = 0; i <= tabsData.length - 1; i++) {
      let currentId = crypto.randomUUID();
      let isActive = i === 0 ? true : false;
      tabRendererList.appendChild(
        this.renderTab(currentId, tabsData[i], isActive)
      );
      tabPanelWrapper.appendChild(
        this.renderTabPanel(currentId, tabsData[i], isActive)
      );
    }
    return { tabs: tabRendererList, panels: tabPanelWrapper };
  }

  renderTab(id, tabData, active) {
    let titleLowerCase = tabData.title.toLowerCase();
    let tabId = `${titleLowerCase}-tab-${id}`;
    let tabPanelId = `${titleLowerCase}-${id}`;

    let tabListItem = document.createElement("li");
    tabListItem.classList.add("nav-item");
    tabListItem.insertAdjacentHTML(
      "afterbegin",
      `${deleteSvgIcon(`delete-tab-id="${tabId}"`)}${editTabSvgIcon(
        `edit-tab-id="${tabId}"`
      )}`
    );

    let tabLink = document.createElement("a");
    tabLink.classList.add("nav-link");
    if (active) {
      tabLink.classList.add("active");
    }
    tabLink.setAttribute("id", tabId);
    tabLink.setAttribute("data-toggle", "tab");
    tabLink.setAttribute("href", `#${tabPanelId}`);
    tabLink.setAttribute("role", "tab");
    tabLink.setAttribute("aria-controls", tabPanelId);
    tabLink.setAttribute("aria-selected", "true");
    tabLink.setAttribute("data-tab", "");
    tabLink.textContent = tabData.title;
    tabListItem.appendChild(tabLink);
    return tabListItem;
  }

  renderTabPanel(id, tabData, active) {
    let titleLowerCase = tabData.title.toLowerCase();
    let tabWrapper = document.createElement("div");
    tabWrapper.classList.add("tab-pane", "fade");
    if (active) {
      tabWrapper.classList.add("show", "active");
    }
    tabWrapper.setAttribute("id", `${titleLowerCase}-${id}`);
    tabWrapper.setAttribute("role", "tabpanel");
    tabWrapper.setAttribute("aria-labelledby", `${titleLowerCase}-tab-${id}`);
    tabData.data.forEach((tabData) => {
      tabWrapper.appendChild(this.handleTabContent(tabData));
    });
    return tabWrapper;
  }

  handleTabContent(tabData) {
    if (tabData.type === "text") {
      return this.tabsText.renderTextContent(tabData);
    } else if (tabData.type === "image") {
      return this.tabsImage.renderImageContent(tabData);
    } else if (tabData.type === "code-block") {
      return this.tabsCodeBlock.renderCodeContent(tabData);
    }
  }


}

import { editTabSvgIcon, deleteSvgIcon } from "../tabs-icons";
import TabsDataItem from "./tabs-data-item";
import TabsText from "./tabs-text";
import TabsImage from "./tabs-image";
import TabsCodeBlock from "./tabs-code-block";

export default class TabBase {
  constructor(api) {
    this.api = api;
    this.tabsItem = new TabsDataItem();
    this.tabsText = new TabsText();
    this.tabsImage = new TabsImage();
    this.tabsCodeBlock = new TabsCodeBlock();
  }

  handleTabRendering(tabsData) {
    let tabRendererList = document.createElement("ul");
    tabRendererList.classList.add("nav", "nav-tabs");
    tabRendererList.setAttribute("role", "tablist");

    let tabPanelWrapper = document.createElement("div");
    tabPanelWrapper.classList.add("tab-content");

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
    
    this.addTabEventHandlers(tabRendererList);
    return { tabs: tabRendererList, panels: tabPanelWrapper };
  }

  renderTab(id, tabData, active) {
    let titleLowerCase = tabData.title.toLowerCase();
    let tabId = tabData.tabId || `${titleLowerCase}-tab-${id}`;
    let tabPanelId = tabData.tabContentId || `${titleLowerCase}-${id}`;

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
    let tabId = tabData.tabId || `${titleLowerCase}-tab-${id}`;
    let tabPanelId = tabData.tabContentId || `${titleLowerCase}-${id}`;

    let tabWrapper = document.createElement("div");
    tabWrapper.classList.add("tab-pane", "fade");
    if (active) {
      tabWrapper.classList.add("show", "active");
    }
    tabWrapper.setAttribute("id", tabPanelId);
    tabWrapper.setAttribute("role", "tabpanel");
    tabWrapper.setAttribute("aria-labelledby", tabId);
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
    } else if (tabData.type === "codeBlock") {
      return this.tabsCodeBlock.renderCodeContent(tabData);
    }
  }

  addTabEventHandlers(parent) {
    this.addEditTabEventsOnClick(parent);
    this.addDeleteTabEventsOnClick(parent);
  }

  addEditTabEventsOnClick(parent) {
    const editButtons = parent.querySelectorAll("[edit-tab-id]");
    editButtons.forEach((editButton) => {
      editButton.removeEventListener("click", this.editTabEvent);
      editButton.addEventListener("click", this.editTabEvent);
      this.api.tooltip.onHover(editButton, "Edit Tab Title", {
        placement: "top",
      });
    });
  }

  editTabEvent(event) {
    let elem = event.target.closest("[edit-tab-id]");
    let tabId = elem.getAttribute("edit-tab-id");
    let a = document.querySelector(`#${tabId}`);
    let isEditable = a.getAttribute("contenteditable");
    if (isEditable === "true") {
      a.setAttribute("contenteditable", "false");
      elem.style.color = "#000";
    } else {
      a.setAttribute("contenteditable", "true");
      elem.style.color = "#007bff";
    }
  }

  addDeleteTabEventsOnClick(parent) {
    const deleteButtons = parent.querySelectorAll("[delete-tab-id]");
    deleteButtons.forEach((deleteButton) => {
      this.api.tooltip.onHover(deleteButton, "Delete Tab (Double-Click)", {
        placement: "top",
      });
      deleteButton.addEventListener("click", (e) => {
        this.handleDeleteHighlightClick(deleteButton);
      });
      deleteButton.addEventListener("dblclick", (e) => {
        let color = window
          .getComputedStyle(deleteButton)
          .getPropertyValue("color");
        if (color !== "rgb(255, 0, 0)") {
          return;
        }
        this.handleTabDelete(deleteButton, parent);
      });
    });
  }

  handleDeleteHighlightClick(elem) {
    let color = window.getComputedStyle(elem).getPropertyValue("color");
    if (color !== "rgb(255, 0, 0)") {
      elem.style.color = "rgb(255, 0, 0)";
    }
    setTimeout(() => {
      elem.style.color = "#000";
    }, 500);
  }

  handleTabDelete(elem, parent) {
    let tabId = elem.getAttribute("delete-tab-id");
    let tab = document.getElementById(tabId);
    let tabPanelId = tab.getAttribute("aria-controls");
    let tabPanel = document.getElementById(tabPanelId);
    tabPanel.remove();
    tab.closest("li").remove();
    let remainingTabs = parent.querySelectorAll(".nav-item");
    if (!remainingTabs.length > 0) {
      let blockIndex = this.api.blocks.getCurrentBlockIndex();
      this.api.blocks.delete(blockIndex);
    } else {
      remainingTabs[0].querySelector("a").click();
    }
  }
}

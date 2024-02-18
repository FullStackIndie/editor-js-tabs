
import TabsHandler from "./tabs-handler";

export default class TabsEventHandlers {
  constructor(api) {
    this.api = api;
    this.handler = new TabsHandler();
    this.defaultData = {
      title: "NewTab",
      data: [
        {
          type: "text",
          content: `New Tab Content`,
          index: 0,
        },
      ],
    };
  }

  addTabEventHandlers(parent) {
    this.addEditTabEventsOnClick(parent);
    this.addDeleteTabEventsOnClick(parent);
    this.addImageCaptionEventHandlers(parent);
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
        let color = window
          .getComputedStyle(deleteButton)
          .getPropertyValue("color");
        if (color !== "rgb(255, 0, 0)") {
          deleteButton.style.color = "rgb(255, 0, 0)";
        }
        setTimeout(() => {
          deleteButton.style.color = "#000";
        }, 500);
      });
      deleteButton.addEventListener("dblclick", (e) => {
        let color = window
          .getComputedStyle(deleteButton)
          .getPropertyValue("color");
        if (color !== "rgb(255, 0, 0)") {
          return;
        }
        let tabId = deleteButton.getAttribute("delete-tab-id");
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
      });
    });
  }

  addAddTabEventsOnClick() {
    let blockIndex = this.api.blocks.getCurrentBlockIndex();
    let block = this.api.blocks.getBlockByIndex(blockIndex);
    let blockId = block.id;
    let blockData = document.querySelector(`[data-id=${blockId}]`);
    console.log(blockData);
    let tabParent = blockData.querySelector(".nav");
    console.log(tabParent);
    let tabId = tabParent.getAttribute("id");
    console.log(tabId);
    // add a tab heading
    let id = crypto.randomUUID();
    let active = false;
    let renderer = this.handler.renderTab(id, this.defaultData, active);
    tabParent.appendChild(renderer);
    this.addTabPanel(id, this.defaultData, active);
    this.addTabEventHandlers(tabParent);
  }

  addTabPanel(id, tabData, active) {
    let tabContentParent = document.querySelector(".tab-content");
    console.log(tabContentParent);
    let tabId = tabContentParent.getAttribute("id");
    let renderer = this.handler.renderTabPanel(id, tabData, active);
    tabContentParent.appendChild(renderer);
  }

  addImageCaptionEventHandlers(parent) {
    const imageCaptions = parent.querySelectorAll("[data-tab-img-caption]");
    console.log(imageCaptions);
    imageCaptions.forEach((imageCaption) => {
      imageCaption.removeEventListener("input", this.addImageCaptionEvent);
      imageCaption.addEventListener("input", this.addImageCaptionEvent);
    });
  }

  addImageCaptionEvent(event) {
    let parent = event.target.parentNode;
    let img = parent.querySelector("figure > img");
    let figCaption = parent.querySelector("figure > figcaption");
    img.alt = event.target.value;
    figCaption.textContent = event.target.value;
  }
}

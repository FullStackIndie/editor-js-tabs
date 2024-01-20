import {
  moveSvgIcon,
  editTabSvgIcon,
  deleteSvgIcon,
  addTextSvgIcon,
  addImageSvgIcon,
  addCodeBlockSvgIcon,
} from "./tabs-icons";
import TabsSettings from "./tabs-settings";
import { tabKeyHandler } from "../code-block/code-handler";

export default class TabsRenderer {
  constructor() {
    this.settings = {
      menuDeleteItem: "delete-tab-item",
      menuAddText: "add-tab-text",
      menuAddImg: "add-tab-img",
      menuAddCode: "add-tab-code",
      tabItem: "data-tab-item",
    };
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
      return this.renderTextContent(tabData);
    } else if (tabData.type === "image") {
      return this.renderImageContent(tabData);
    } else if (tabData.type === "code-block") {
      return this.renderCodeContent(tabData);
    }
  }

  renderMenuAsHtml(moveAttributes) {
    let html = `
  <div class="dropright">
    <div class="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${moveSvgIcon(moveAttributes)}
    </div>
    <div class="dropdown-menu">
    <div class="row">
    <div class="col-2" ${this.settings.menuAddText}>
    ${addTextSvgIcon}
    </div>   
    <div class="col-2">
      <div ${this.settings.menuAddImg}>
    ${addImageSvgIcon}
      </div>
    </div>   
    <div class="col-2">
      <div ${this.settings.menuAddCode}>
    ${addCodeBlockSvgIcon}    
      </div>
    </div>   
    <div class="col-2">
        ${deleteSvgIcon(this.settings.menuDeleteItem, "popup-btn delete")}

    </div>
  </div>
    `;
    return html;
  }

  addMenuEventListeners(parent) {
    if (parent) {
      this.addMenuDeleteEventListener(parent);
      this.addMenuTextEventListener(parent);
    }
  }

  addMenuDeleteEventListener(parent) {
    let elem = parent.querySelector(`[${this.settings.menuDeleteItem}]`);
    elem.addEventListener("click", (event) => {
      let deleteElem = event.target.closest("[data-tab-item]");
      deleteElem.remove();
    });
  }

  addMenuImageEventListener(parent) {
    let elem = parent.querySelector(`[${this.settings.menuAddImg}]`);
    elem.addEventListener("click", (event) => {
      let itemElem = event.target.closest("[data-tab-item]");
      itemElem.parentNode.insertBefore(this.renderImageContent({content: "Edit"}), itemElem.nextSibling);
    });
  }

  addMenuTextEventListener(parent) {
    let elem = parent.querySelector(`[${this.settings.menuAddText}]`);
    elem.addEventListener("click", (event) => {
      let itemElem = event.target.closest("[data-tab-item]");
      itemElem.parentNode.insertBefore(this.renderTextContent({content: "Edit"}), itemElem.nextSibling);
    });
  }

  renderTextContent(tabData) {
    let textContentWrapper = document.createElement("div");
    textContentWrapper.classList.add("row", "ml-1");

    let textContent = document.createElement("div");
    textContent.setAttribute("contenteditable", "true");
    textContent.setAttribute("data-tab-text", "");
    textContent.textContent = tabData.content;
    textContentWrapper.appendChild(textContent);
    textContentWrapper.setAttribute("data-tab-item", "");
    textContentWrapper.insertAdjacentHTML(
      "afterbegin",
      this.renderMenuAsHtml("edit-tab-content")
    );
    this.addMenuEventListeners(textContentWrapper);
    return textContentWrapper;
  }

  renderImageContent(tabData) {
    let imageWrapper = document.createElement("div");
    imageWrapper.classList.add("row", "ml-1", "mt-1");

    let figureWrapper = document.createElement("div");
    figureWrapper.classList.add("mx-auto", "d-block");

    let figure = document.createElement("figure");
    figure.classList.add("figure");

    let image = document.createElement("img");
    image.setAttribute("src", tabData.url);
    image.setAttribute("class", "img-fluid  mt-5 mb-2");
    image.setAttribute("width", tabData.width);
    image.setAttribute("height", tabData.height);
    image.setAttribute("alt", tabData.caption);
    image.setAttribute("data-tab-img", "");

    let figCaption = document.createElement("figcaption");
    figCaption.classList.add(
      "figure-caption",
      "text-center",
      "font-weight-bold"
    );
    figCaption.textContent = tabData.caption;

    let captionInput = document.createElement("input");
    captionInput.setAttribute("type", "text");
    captionInput.setAttribute("class", "form-control mb-5");
    captionInput.setAttribute("placeholder", "Image Caption");
    captionInput.setAttribute("id", "imageCaption");
    captionInput.setAttribute("aria-label", "Image Caption");
    captionInput.setAttribute("aria-describedby", "imageLabel");
    captionInput.setAttribute("data-tab-img-caption", "");
    captionInput.value = tabData.caption;

    figure.appendChild(image);
    figure.appendChild(figCaption);
    figure.appendChild(captionInput);
    figureWrapper.appendChild(figure);
    imageWrapper.appendChild(figureWrapper);

    imageWrapper.setAttribute("data-tab-item", "");
    imageWrapper.insertAdjacentHTML(
      "afterbegin",
      this.renderMenuAsHtml("edit-tab-img")
    );
    this.addMenuEventListeners(imageWrapper);
    return imageWrapper;
  }

  renderCodeContent(tabData) {
    let wrapper = document.createElement("div");

    let textarea = document.createElement("textarea");
    let picker = document.createElement("select");
    let codeSettings = new TabsSettings();
    for (let language in codeSettings.languageList) {
      let option = document.createElement("option");
      option.text = codeSettings.languageList[language].name;
      option.value = codeSettings.languageList[language].code;
      picker.appendChild(option);
    }

    wrapper.classList.add("row", "ml-1", "ce-code");
    picker.classList.add("ce-code__select");
    picker.setAttribute("data-tab-code-lang", "");
    textarea.classList.add(
      "mt-1",
      "mb-1",
      "mr-3",
      "ce-code__textarea",
      "cdx-input"
    );
    textarea.setAttribute("data-tab-code", "");
    textarea.setAttribute("placeholder", "Paste Code");
    textarea.value = tabData.code;

    picker.value = tabData.lang;
    wrapper.appendChild(picker);
    wrapper.appendChild(textarea);

    textarea.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Tab":
          tabKeyHandler(event);
          break;
      }
    });

    wrapper.setAttribute("data-tab-item", "");
    wrapper.insertAdjacentHTML(
      "afterbegin",
      this.renderMenuAsHtml("edit-tab-code")
    );
    this.addMenuEventListeners(wrapper);
    return wrapper;
  }
}

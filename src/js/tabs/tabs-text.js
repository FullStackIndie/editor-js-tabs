import { moveSvgIcon } from "./tabs-icons";
import TabsSettings from "./tabs-settings";
import { tabKeyHandler } from "../code-block/code-handler";

export default class TabsText {
  renderText() {
    let tabContentParent = document.querySelector(
      ".tab-content > .show.active"
    );
    console.log(tabContentParent);
    let tabId = tabContentParent.getAttribute("id");
    let tabContent = document.getElementById(tabId);
    let renderer = `<div class="row ml-1">`;
    renderer += `${moveSvgIcon("edit-tab-content")}`;
    renderer += `<div contenteditable="true" data-tab-text>Enter Text</div>`;
    renderer += `</div>`;

    tabContent.insertAdjacentHTML("beforeend", renderer);
  }

  renderCode() {
    let tabContentParent = document.querySelector(
      ".tab-content > .show.active"
    );
    let tabId = tabContentParent.getAttribute("id");
    let tabContent = document.getElementById(tabId);

    let wrapper = document.createElement("div");
    let textarea = document.createElement("textarea");
    let picker = document.createElement("select");
    let codeSettings = new TabsSettings();
    wrapper.insertAdjacentHTML("afterbegin", moveSvgIcon("edit-tab-code"));

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

    wrapper.appendChild(picker);
    wrapper.appendChild(textarea);
    
    textarea.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Tab":
          tabKeyHandler(event);
          break;
      }
    });

    tabContent.appendChild(wrapper);
  }
}

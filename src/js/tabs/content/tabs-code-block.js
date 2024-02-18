import { tabKeyHandler } from "../../code-block/code-handler";
import TabsSettings from "../tabs-settings";
import TabsDataItem from "./tabs-data-item";

export default class TabsCodeBlock {
  constructor() {
    this.codeSettings = new TabsSettings();
    this.tabsItem = new TabsDataItem();
  }

  renderCodeContent(data) {
    let wrapper = this.tabsItem.renderDataItem("ce-code");
    let { textarea, picker } = this.renderCode(data);
    wrapper.appendChild(picker);
    wrapper.appendChild(textarea);
    return wrapper;
  }

  renderCode(data) {
    let textarea = document.createElement("textarea");
    let picker = document.createElement("select");
    for (let language in this.codeSettings.languageList) {
      let option = document.createElement("option");
      option.text = this.codeSettings.languageList[language].name;
      option.value = this.codeSettings.languageList[language].code;
      picker.appendChild(option);
    }

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
    textarea.value = data.code;

    picker.value = data.lang;

    textarea.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Tab":
          tabKeyHandler(event);
          break;
      }
    });

    return { textarea: textarea, picker: picker };
  }
}

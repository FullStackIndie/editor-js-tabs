import TabsDataItem from "./tabs-data-item";

export default class TabsText {
  constructor() {
    this.tabsItem = new TabsDataItem();
  }

  renderTextContent(data) {
    let textContentWrapper = this.tabsItem.renderDataItem();
    let textContent = this.renderText(data);
    textContentWrapper.appendChild(textContent);
    return textContentWrapper;
  }

  renderText(data) {
    let textContent = document.createElement("div");
    textContent.setAttribute("contenteditable", "true");
    textContent.setAttribute("data-tab-text", "");
    textContent.textContent = data.content;
    return textContent;
  }
}

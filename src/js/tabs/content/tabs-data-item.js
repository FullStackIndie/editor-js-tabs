import TabsInlineMenu from "../inline-menu/tabs-inline-menu";

export default class TabsDataItem {
  constructor() {
    this.inlineMenu = new TabsInlineMenu();
  }

  renderDataItem(classes) {
    let defaultClasses = ["row", "ml-1"];
    if (Array.isArray(classes) && classes.length > 0) {
      let filteredClasses = classes.filter(
        (item) =>
          item !== null && item !== undefined && item !== "" && item !== " "
      );
      defaultClasses.push(filteredClasses);
    }
    let distinctArray = [...new Set(defaultClasses)];

    let dataItem = document.createElement("div");
    dataItem.classList.add(...distinctArray);
    dataItem.setAttribute("data-tab-item", "");
    dataItem.appendChild(this.inlineMenu.renderInlineMenu());
    return dataItem;
  }
}

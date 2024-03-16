/**
 * @class InlineMenuItem
 * @classdesc This class is used to create a dropdown menu item.
 */
export default class InlineMenuItem {
  renderInlineMenuItem(icon, attribute) {
    let columWrapper = document.createElement("div");
    columWrapper.classList.add("col-2");

    let itemWrapper = document.createElement("div");
    itemWrapper.setAttribute(attribute.menuKey, "");
    itemWrapper.insertAdjacentHTML("afterbegin", icon);

    columWrapper.appendChild(itemWrapper);
    return columWrapper;
  }
}

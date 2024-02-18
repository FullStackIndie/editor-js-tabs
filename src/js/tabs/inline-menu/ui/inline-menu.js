import { moveSvgIcon } from "../../tabs-icons";

/**
 * @class InlineMenu
 * @classdesc This class is responsible for rendering the inline menu for the tabs.
 */
export default class InlineMenu {

  renderInlineMenu() {
    let menu = document.createElement("div");
    menu.classList.add("dropright");
    menu.setAttribute("data-inline-menu", "");
    menu.appendChild(this.#renderDropdown());
    menu.appendChild(this.#renderDropdownMenu());
    return menu;
  }

  #renderDropdown() {
    let dropdown = document.createElement("div");
    dropdown.setAttribute("data-toggle", "dropdown");
    dropdown.setAttribute("aria-haspopup", "true");
    dropdown.setAttribute("aria-expanded", "false");
    dropdown.insertAdjacentHTML("afterbegin", moveSvgIcon());
    return dropdown;
  }

  #renderDropdownMenu() {
    let dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.setAttribute("data-menu", "");
    return dropdownMenu;
  }
}

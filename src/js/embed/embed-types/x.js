import { cloneAttributes } from "../embed-helpers";

export default class X {
  static handleEmbed(html) {
    let div = document.createElement("div");
    div.innerHTML = html;
    let script = document.createElement("script");
    let existingScript = div.querySelector("script");
    if (existingScript) {
      cloneAttributes(script, existingScript);
      div.removeChild(existingScript);
      div.appendChild(script);
    }
    return div;
  }


}

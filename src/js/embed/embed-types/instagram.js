export default class Instagram {

  static handleInstagramUrl(url) {
    let oldUrl = url.split("/");
    let newUrl = `https://www.instagram.com/p/${oldUrl[4]}/embed`;
    let div = document.createElement("div");
    div.setAttribute("data-url", "");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "520px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    div.appendChild(iframe);
    return div;
  }
}

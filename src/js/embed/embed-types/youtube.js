import { cloneAttributes } from "../embed-helpers";

export default class Youtube {
  static handleYoutubeEmbed(html) {
    let div = document.createElement("div");
    div.setAttribute("data-embed", "");
    div.innerHTML = html;
    let existingIframe = div.querySelector("iframe");
    let iframe = document.createElement("iframe");
    if (existingIframe) {
      cloneAttributes(iframe, existingIframe);
      div.removeChild(existingIframe);
    }
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    div.appendChild(iframe);
    return div;
  }

  static handleYoutubeEmbedUrl(url) {
    let oldUrl = url.split(".be/");
    let newUrl = `https://www.youtube.com/embed/${oldUrl[1]}`;
    let div = document.createElement("div");
    div.setAttribute("data-url", "");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    div.appendChild(iframe);
    return div;
  }

  static handleYoutubeUrl(url) {
    let oldUrl = url.split("?v=");
    let newUrl = `https://www.youtube.com/embed/${oldUrl[1]}`;
    let div = document.createElement("div");
    div.setAttribute("data-url", "");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    div.appendChild(iframe);
    return div;
  }
}

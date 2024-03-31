export default class Vimeo {
  static handleVimeoEmbed(html) {
    let div = document.createElement("div");
    div.setAttribute("data-embed", "");
    div.innerHTML = html;
    return div;
  }

  static handleVimeoUrl(url) {
    let oldUrl = url.split(".com/");
    let id = oldUrl[1].split("/")[0];
    let div = document.createElement("div");
    div.setAttribute("data-url", "");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", `https://player.vimeo.com/video/${id}`);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    div.appendChild(iframe);
    return div;
  }
}



export default class Imgur {
  static handleImgurEmbed(html) {
    let div = document.createElement("div");
    div.setAttribute("data-embed", "");
    div.innerHTML = html;
    console.log(div);
    let iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "680px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("srcdoc", html);
    div.appendChild(iframe);
    return div;
  }

  static handleImgurUrl(url) {
    let oldUrl = url.split(".com/");
    let id = oldUrl[1].split("/")[1];
    let div = document.createElement("div");
    div.setAttribute("data-embed", "");
    let blockquote = document.createElement("blockquote");
    blockquote.classList.add("imgur-embed-pub");
    blockquote.setAttribute("lang", "en");
    blockquote.setAttribute("data-id", oldUrl[1]);

    let a = document.createElement("a");
    a.setAttribute("href", `//imgur.com/${id}`);

    let script = document.createElement("script");
    script.async = true;
    script.src = "//s.imgur.com/min/embed.js";

    blockquote.appendChild(a);
    div.appendChild(blockquote);
    div.appendChild(script);
    return div;
  }
}

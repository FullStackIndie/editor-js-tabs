export default class TikTok {
  static handleTikTokEmbed(html) {
    let div = document.createElement("div");
    div.classList.add(
      "container-fluid",
      "justify-content-center",
      "align-items-center",
      "d-flex"
    );
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

  static handleTikTokUrl(url) {
    let oldUrl = url.split(".com/");
    let userName = oldUrl[1].split("/")[0];
    let id = oldUrl[1].split("/")[2];
    let div = document.createElement("div");
    div.setAttribute("data-embed", "");
    div.classList.add(
      "container-fluid",
      "justify-content-center",
      "align-items-center",
      "d-flex"
    );
    let blockquote = document.createElement("blockquote");
    blockquote.classList.add("tiktok-embed");
    blockquote.setAttribute("lang", url);
    blockquote.setAttribute("data-video-id", id);
    blockquote.style.maxWidth = "605px";
    blockquote.style.minWidth = "325px";

    let section = document.createElement("section");
    let a1 = document.createElement("a");
    a1.setAttribute("target", "_blank");
    a1.setAttribute("title", userName);
    a1.setAttribute("href", `https://www.tiktok.com/${userName}?refer=embed`);
    a1.innerHTML = userName;

    let a2 = document.createElement("a");
    a2.setAttribute("target", "_blank");
    a2.setAttribute("title", "#foryoupage");
    a2.setAttribute(
      "href",
      `https://www.tiktok.com/tag/foryoupage?refer=embed`
    );
    a2.innerHTML = "#foryoupage";

    section.appendChild(a1);
    section.appendChild(a2);
    blockquote.appendChild(section);

    let script = document.createElement("script");
    script.async = true;
    script.src = "https://www.tiktok.com/embed.js";

    div.appendChild(blockquote);
    div.appendChild(script);
    return div;
  }
}

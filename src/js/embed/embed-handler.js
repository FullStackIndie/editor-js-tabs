import startsWith from "lodash-es/startsWith";

export default class EmbedHandler {
  constructor() {
    this.embedKeywords = [
      "youtu.be",
      "twitter",
      "instagram",
      "vimeo",
      "giphy",
      "imgur",
      "codepen",
      "github",
    ];
  }

  getEmbeddedContent(html, elem) {
    let embedType = this.detectEmbedType(html, elem);
    if (embedType) {
      if (embedType.type === "embed") {
        return this.handleEmbededType(embedType.keyword, elem);
      } else if (embedType.type === "url") {
        return this.handleEmbededUrl(embedType.keyword, html, elem);
      } else {
        return elem;
      }
    }
  }

  detectEmbedType(html, elem) {
    for (let i = 0; i < this.embedKeywords.length; i++) {
      if (this.detectIfUrl(html)) {
        if (html.includes(this.embedKeywords[i])) {
          console.log(`found url ${html}`);
          return { type: "url", keyword: this.embedKeywords[i] };
        }
        continue;
      } else if (this.getSrcUrl(this.embedKeywords[i], elem)) {
        return { type: "embed", keyword: this.embedKeywords[i] };
      }
    }
    return { type: "none" };
  }

  detectIfUrl(html) {
    if (startsWith(html, "http")) {
      return true;
    }
    return false;
  }

  getSrcUrl(keyword, elem) {
    var elements = elem.querySelectorAll(`[src], [href]`);
    if (elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        if (this.isValidUrl(elements[i], keyword)) {
          return true;
        }
      }
    }
    return false;
  }

  isValidUrl(elem, keyword) {
    if (keyword === "youtu.be") {
      keyword = "youtube";
    }
    if (elem.hasAttribute("src")) {
      let src = elem.getAttribute("src");
      if (src.includes(keyword)) {
        return true;
      }
    } else if (elem.hasAttribute("href")) {
      let href = elem.getAttribute("href");
      if (href.includes(keyword)) {
        return true;
      }
    } else {
      return false;
    }
  }

  cloneAttributes(target, source) {
    [...source.attributes].forEach((attr) => {
      target.setAttribute(attr.nodeName, attr.nodeValue);
    });
  }

  handleEmbededType(keyword, elem) {
    switch (keyword) {
      case "youtu.be":
        return this.handleYoutubeEmbed(elem);
      case "twitter":
        return this.handleTwitterEmbed(elem);
      case "instagram":
        return this.handleInstagramEmbed(elem);
      case "vimeo":
        return this.handleVimeoEmbed(elem);
      case "giphy":
        return this.handleGiphyEmbed(elem);
      case "codepen":
        return this.handleCodepenEmbed(elem);
      case "github":
        return this.handleGithubEmbed(elem);
      case "imgur":
        return this.handleImgurEmbed(elem);
      default:
        return elem;
    }
  }

  handleEmbededUrl(keyword, html, elem) {
    switch (keyword) {
      case "youtu.be":
        return this.handleYoutubeUrl(html, elem);
      case "twitter":
        return this.handleTwitterUrl(html);
      case "instagram":
        return this.handleInstagramUrl(html, elem);
      case "vimeo":
        return this.handleVimeoUrl(html, elem);
      case "giphy":
        return this.handleGiphyUrl(html, elem);
      case "codepen":
        return this.handleCodepenUrl(html, elem);
      case "github":
        return this.handleGithubUrl(html, elem);
      case "imgur":
        return this.handleImgurUrl(html, elem);
      default:
        return elem;
    }
  }

  handleImgurEmbed(elem) {
    console.log(`embed imgur`);
    let blockquote = document.createElement("blockquote");
    let existingQuote = elem.querySelector("blockquote");
    if (existingQuote) {
      this.cloneAttributes(blockquote, existingQuote);
      elem.removeChild(existingQuote);
      elem.appendChild(blockquote);
    }

    let script = document.createElement("script");
    let existingScript = elem.querySelector("script");
    if (existingScript) {
      this.cloneAttributes(script, existingScript);
      elem.removeChild(existingScript);
      elem.appendChild(script);
    }
    return elem;
  }

  handleGiphyEmbed(elem) {
    return elem;
  }

  handleVimeoEmbed(elem) {
    let iframe = document.createElement("iframe");
    let existingIframe = elem.querySelector("iframe");
    if (existingIframe) {
      this.cloneAttributes(iframe, existingIframe);
      iframe.width = "100%";
      iframe.height = "366px";
      elem.removeChild(existingIframe);
      elem.appendChild(iframe);
      elem.setAttribute("contenteditable", "false");
    }
    return elem;
  }

  handleInstagramEmbed(elem) {
    let blockquote = document.createElement("blockquote");
    let existingQuote = elem.querySelector("blockquote");
    if (existingQuote) {
      this.cloneAttributes(blockquote, existingQuote);
      elem.removeChild(existingQuote);
      elem.appendChild(blockquote);
    }

    let script = document.createElement("script");
    let existingScript = elem.querySelector("script");
    if (existingScript) {
      this.cloneAttributes(script, existingScript);
      elem.removeChild(existingScript);
      elem.appendChild(script);
    }
    return elem;
  }

  handleYoutubeEmbed(elem) {
    let iframe = document.createElement("iframe");
    let existingIframe = elem.querySelector("iframe");
    if (existingIframe) {
      this.cloneAttributes(iframe, existingIframe);
      iframe.width = "100%";
      iframe.height = "366px";
      elem.removeChild(existingIframe);
      elem.appendChild(iframe);
      elem.setAttribute("contenteditable", "false");
    }
    return elem;
  }

  handleCodepenEmbed(elem) {
    let iframe = document.createElement("iframe");
    let existingIframe = elem.querySelector("iframe");
    if (existingIframe) {
      this.cloneAttributes(iframe, existingIframe);
      iframe.width = "100%";
      iframe.height = "366px";
      elem.removeChild(existingIframe);
      elem.appendChild(iframe);
      elem.setAttribute("contenteditable", "false");
    }
    return elem;
  }

  handleGithubEmbed(elem) {
    console.log(`embed github`);
    console.log(elem);
    let existingScript = elem.querySelector("script");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "srcdoc",
      `<html><body>${elem.innerHTML}</body></html>`
    );
    elem.setAttribute("contenteditable", "false");
    elem.removeChild(existingScript);
    elem.appendChild(iframe);
    return elem;
  }

  handleTwitterEmbed(elem) {
    let script = document.createElement("script");
    let existingScript = elem.querySelector("script");
    if (existingScript) {
      this.cloneAttributes(script, existingScript);
      elem.removeChild(existingScript);
      elem.appendChild(script);
    }

    return elem;
  }

  handleImgurUrl(html) {
    let url = html.split(".com/");
    let id = url[1].split("/")[1];
    let div = document.createElement("div");
    let blockquote = document.createElement("blockquote");
    blockquote.classList.add("imgur-embed-pub");
    blockquote.setAttribute("lang", "en");
    blockquote.setAttribute("data-id", url[1]);

    let a = document.createElement("a");
    a.setAttribute("href", `//imgur.com/${id}`);

    let script = document.createElement("script");
    script.async = true;
    script.src = "//s.imgur.com/min/embed.js";

    blockquote.appendChild(a);
    div.appendChild(blockquote);
    div.appendChild(script);
    div.classList.add("embed");

    return div;
  }

  handleVimeoUrl(html, elem) {
    let url = html.split(".com/");
    let id = url[1].split("/")[0];
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", `https://player.vimeo.com/video/${id}`);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    elem.innerHTML = "";
    elem.setAttribute("contenteditable", "false");
    elem.appendChild(iframe);
    return elem;
  }

  handleYoutubeUrl(html, elem) {
    let url = html.split(".be/");
    let newUrl = `https://www.youtube.com/embed/${url[1]}`;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    elem.innerHTML = "";
    elem.setAttribute("contenteditable", "false");
    elem.appendChild(iframe);
    return elem;
  }

  handleTwitterUrl(html) {
    let div = document.createElement("div");
    div.classList.add("embed");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", `https://twitframe.com/show?url=${html}`);
    iframe.setAttribute("width", "550");
    iframe.setAttribute("height", "320");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("border", "0");
    div.appendChild(iframe);
    return div;
  }

  handleInstagramUrl(html, elem) {
    let url = html.split("/");
    let newUrl = `https://www.instagram.com/p/${url[4]}/embed`;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    elem.innerHTML = "";
    elem.setAttribute("contenteditable", "false");
    elem.appendChild(iframe);
    return elem;
  }

  handleGiphyUrl(html, elem) {
    let url = html.split("/");
    console.log(url);
    let newUrl = `https://giphy.com/embed/${url[5]}`;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.classList.add("giphy-embed");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "480px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    elem.innerHTML = "";
    elem.setAttribute("contenteditable", "false");
    elem.appendChild(iframe);
    return elem;
  }

  handleCodepenUrl(html, elem) {
    let url = html.split("/");
    let newUrl = `https://codepen.io/${url[3]}/embed/${url[5]}`;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    elem.innerHTML = "";
    elem.setAttribute("contenteditable", "false");
    elem.appendChild(iframe);
    return elem;
  }

  handleGithubUrl(html, elem) {
    let url = html.split("/");
    let div = document.createElement("div");
    div.classList.add("embed");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "srcdoc",
      `<html><body><script src='${html}.js'></script></body></html>`
    );
    div.setAttribute("contenteditable", "false");
    div.appendChild(iframe);
    return div;
  }
}

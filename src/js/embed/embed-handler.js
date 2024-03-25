import startsWith from "lodash-es/startsWith";

export default class EmbedHandler {
  constructor() {
    this.parser = new DOMParser();
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

  cloneAttributes(target, source) {
    [...source.attributes].forEach((attr) => {
      target.setAttribute(attr.nodeName, attr.nodeValue);
    });
  }

  handleEmbededType(data) {
    switch (data.service) {
      case "youtu.be":
        return this.handleYoutubeEmbed(data);
      case "twitter":
        return this.handleTwitterEmbed(data);
      case "instagram":
        return this.handleInstagramEmbed(data);
      case "vimeo":
        return this.handleVimeoEmbed(data);
      case "giphy":
        return this.handleGiphyEmbed(data);
      case "codepen":
        return this.handleCodepenEmbed(data);
      case "github":
        return this.handleGithubEmbed(data);
      case "imgur":
        return this.handleImgurEmbed(data);
      default:
        return data;
    }
  }

  handleEmbededUrl(keyword, url) {
    switch (keyword) {
      case "youtu.be":
        return this.handleYoutubeUrl(url);
      case "twitter":
        return this.handleTwitterUrl(url);
      case "instagram":
        return this.handleInstagramUrl(url);
      case "vimeo":
        return this.handleVimeoUrl(url);
      case "giphy":
        return this.handleGiphyUrl(url);
      case "codepen":
        return this.handleCodepenUrl(url);
      case "github":
        return this.handleGithubUrl(url);
      case "imgur":
        return this.handleImgurUrl(url);
      default:
        return null;
    }
  }

  createEmbedWrapper() {
    let embedWrapper = document.createElement("div");
    embedWrapper.setAttribute("data-embed", "");
    return embedWrapper;
  }

  handleImgurEmbed(html) {
    console.log(`embed imgur`);
    let embedWrapper = this.createEmbedWrapper();
    let blockquote = document.createElement("blockquote");
    let doc = this.parser.parseFromString(html, "text/html");
    let existingQuote = doc.querySelector("blockquote");
    if (existingQuote) {
      this.cloneAttributes(blockquote, existingQuote);
      embedWrapper.removeChild(existingQuote);
      embedWrapper.appendChild(blockquote);
    }

    let script = document.createElement("script");
    let docScript = this.parser.parseFromString(html, "text/html");
    let existingScript = docScript.querySelector("script");
    if (existingScript) {
      this.cloneAttributes(script, existingScript);
      embedWrapper.removeChild(existingScript);
      embedWrapper.appendChild(script);
    }
    return embedWrapper;
  }

  handleGiphyEmbed(html) {
    return embedWrapper;
  }

  handleVimeoEmbed(html) {
    let iframe = document.createElement("iframe");
    let doc = this.parser.parseFromString(html, "text/html");
    let existingIframe = doc.querySelector("iframe");
    if (existingIframe) {
      this.cloneAttributes(iframe, existingIframe);
      iframe.width = "100%";
      iframe.height = "366px";
      embedWrapper.removeChild(existingIframe);
      embedWrapper.appendChild(iframe);
      embedWrapper.setAttribute("contenteditable", "false");
    }
    return embedWrapper;
  }

  handleInstagramEmbed(html) {
    let blockquote = document.createElement("blockquote");
    let doc = this.parser.parseFromString(html, "text/html");
    let existingQuote = doc.querySelector("blockquote");
    if (existingQuote) {
      this.cloneAttributes(blockquote, existingQuote);
      embedWrapper.removeChild(existingQuote);
      embedWrapper.appendChild(blockquote);
    }

    let script = document.createElement("script");
    let docScript = this.parser.parseFromString(html, "text/html");
    let existingScript = docScript.querySelector("script");
    if (existingScript) {
      this.cloneAttributes(script, existingScript);
      embedWrapper.removeChild(existingScript);
      embedWrapper.appendChild(script);
    }
    return embedWrapper;
  }

  handleYoutubeEmbed(data) {
    let iframe = document.createElement("iframe");
    let doc = this.parser.parseFromString(html, "text/html");
    let existingIframe = doc.querySelector("iframe");
    if (existingIframe) {
      this.cloneAttributes(iframe, existingIframe);
      iframe.width = "100%";
      iframe.height = "366px";
      embedWrapper.removeChild(existingIframe);
      embedWrapper.appendChild(iframe);
      embedWrapper.setAttribute("contenteditable", "false");
    }
    return embedWrapper;
  }

  handleCodepenEmbed(html) {
    let iframe = document.createElement("iframe");
    let doc = this.parser.parseFromString(html, "text/html");
    let existingIframe = doc.querySelector("iframe");
    if (existingIframe) {
      this.cloneAttributes(iframe, existingIframe);
      iframe.width = "100%";
      iframe.height = "366px";
      embedWrapper.removeChild(existingIframe);
      embedWrapper.appendChild(iframe);
      embedWrapper.setAttribute("contenteditable", "false");
    }
    return embedWrapper;
  }

  handleGithubEmbed(html) {
    console.log(`embed github`);
    console.log(html);
    let doc = this.parser.parseFromString(html, "text/html");
    let existingScript = doc.querySelector("script");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "srcdoc",
      `<html><body>${embedWrapper.innerHTML}</body></html>`
    );
    embedWrapper.setAttribute("contenteditable", "false");
    embedWrapper.removeChild(existingScript);
    embedWrapper.appendChild(iframe);
    return embedWrapper;
  }

  handleTwitterEmbed(html) {
    let script = document.createElement("script");
    let existingScript = doc.querySelector("script");
    if (existingScript) {
      this.cloneAttributes(script, existingScript);
      embedWrapper.removeChild(existingScript);
      embedWrapper.appendChild(script);
    }

    return embedWrapper;
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

  handleVimeoUrl(html) {
    let url = html.split(".com/");
    let id = url[1].split("/")[0];
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", `https://player.vimeo.com/video/${id}`);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    embedWrapper.innerHTML = "";
    embedWrapper.setAttribute("contenteditable", "false");
    embedWrapper.appendChild(iframe);
    return embedWrapper;
  }

  handleYoutubeUrl(url) {
    url = url.split(".be/");
    let newUrl = `https://www.youtube.com/embed/${url[1]}`;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    return iframe;
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

  handleInstagramUrl(html) {
    let url = html.split("/");
    let newUrl = `https://www.instagram.com/p/${url[4]}/embed`;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    embedWrapper.innerHTML = "";
    embedWrapper.setAttribute("contenteditable", "false");
    embedWrapper.appendChild(iframe);
    return embedWrapper;
  }

  handleGiphyUrl(html) {
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
    embedWrapper.innerHTML = "";
    embedWrapper.setAttribute("contenteditable", "false");
    embedWrapper.appendChild(iframe);
    return embedWrapper;
  }

  handleCodepenUrl(html) {
    let url = html.split("/");
    let newUrl = `https://codepen.io/${url[3]}/embed/${url[5]}`;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    embedWrapper.innerHTML = "";
    embedWrapper.setAttribute("contenteditable", "false");
    embedWrapper.appendChild(iframe);
    return embedWrapper;
  }

  handleGithubUrl(html) {
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

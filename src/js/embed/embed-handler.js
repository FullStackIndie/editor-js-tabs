import startsWith from "lodash-es/startsWith";
import GithubGist from "./embed-types/github-gist";
import Youtube from "./embed-types/youtube";
import X from "./embed-types/x";
import Instagram from "./embed-types/instagram";
import Vimeo from "./embed-types/vimeo";
import Giphy from "./embed-types/giphy";
import Codepen from "./embed-types/codepen";
import Imgur from "./embed-types/imgur";
import TikTok from "./embed-types/tik-tok";
import EmbedTypesConfig from "./embed-types/embed-types-config";

export default class EmbedHandler {
  constructor() {
    this.embedKeywords = EmbedTypesConfig.embedKeywords;
  }

  getEmbeddedContent(html) {
    let embedType = this.detectEmbedType(html);
    console.log(embedType);
    if (embedType) {
      if (embedType.type === "embed") {
        return this.handleEmbededType(embedType.keyword, html);
      } else if (embedType.type === "url") {
        return this.handleEmbededUrl(embedType.keyword, html);
      } else {
        return html;
      }
    }
  }

  detectEmbedType(html) {
    for (let i = 0; i < this.embedKeywords.length; i++) {
      if (startsWith(html, "http")) {
        if (html.includes(this.embedKeywords[i])) {
          console.log(`found url ${html}`);
          return { type: "url", keyword: this.embedKeywords[i] };
        }
        continue;
      } else if (this.getSrcUrl(this.embedKeywords[i], html)) {
        return { type: "embed", keyword: this.embedKeywords[i] };
      }
    }
    return { type: "none" };
  }

  getSrcUrl(keyword, html) {
    let elem = document.createElement("div");
    elem.innerHTML = html;
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

  handleEmbededType(keyword, html) {
    switch (keyword) {
      case "youtu.be":
        return Youtube.handleYoutubeEmbed(html);
      case "twitter":
        return X.handleEmbed(html);
      case "vimeo":
        return Vimeo.handleVimeoEmbed(html);
      case "giphy":
        return Giphy.handleGiphyEmbed(html);
      case "codepen":
        return Codepen.handleCodepenEmbed(html);
      case "imgur":
        return Imgur.handleImgurEmbed(html);
      case "github":
        return GithubGist.handleGithubEmbed(html);
      case "tiktok":
        return TikTok.handleTikTokEmbed(html);
      default:
        return null;
    }
  }

  handleEmbededUrl(keyword, url) {
    console.log(keyword);
    switch (keyword) {
      case "youtu.be":
        return Youtube.handleYoutubeEmbedUrl(url);
      case "youtube":
        return Youtube.handleYoutubeUrl(url);
      case "instagram":
        return Instagram.handleInstagramUrl(url);
      case "vimeo":
        return Vimeo.handleVimeoUrl(url);
      case "giphy":
        return Giphy.handleGiphyUrl(url);
      case "codepen":
        return Codepen.handleCodepenUrl(url);
      case "imgur":
        return Imgur.handleImgurUrl(url);
      case "github":
        return GithubGist.handleGithubUrl(url);
      case "tiktok":
        return TikTok.handleTikTokUrl(url);
      default:
        return null;
    }
  }
}

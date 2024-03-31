import EmbedHandler from "./embed-handler";
import escape from "lodash-es/escape";
import startsWith from "lodash-es/startsWith";
import unescape from "lodash-es/unescape";

export default class Embed {
  constructor({ data, api, config }) {
    this.data = data;
    this.api = api;
    this.config = config;
    this.handler = new EmbedHandler();
    this.wrapper = null;
  }

  defaultData = { html: "" };

  static get toolbox() {
    return {
      title: "Embed Custom",
      icon: `
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 3C15 2.44772 15.4477 2 16 2C19.3137 2 22 4.68629 22 8V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16C2 15.4477 2.44772 15 3 15C3.55228 15 4 15.4477 4 16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4C15.4477 4 15 3.55228 15 3Z" fill="#000000"/>
        <path d="M3.70663 12.7845L3.16104 12.2746L3.70664 12.7845C4.09784 12.3659 4.62287 11.8265 5.17057 11.3274C5.72852 10.8191 6.26942 10.3905 6.69641 10.1599C7.06268 9.96208 7.75042 9.84035 8.40045 9.84848C8.62464 9.85128 8.81365 9.86944 8.9559 9.89472C8.96038 10.5499 8.95447 11.7469 8.95145 12.2627C8.94709 13.0099 9.83876 13.398 10.3829 12.8878L14.9391 8.61636C15.2845 8.2926 15.2988 7.74908 14.971 7.4076L10.4132 2.65991C9.88293 2.10757 8.95 2.48291 8.95 3.24856V5.16793C8.5431 5.13738 8.0261 5.11437 7.47937 5.13009C6.5313 5.15734 5.30943 5.30257 4.4722 5.88397C4.36796 5.95636 4.26827 6.03539 4.17359 6.11781C2.49277 7.58092 2.11567 9.90795 1.8924 11.7685L1.87242 11.935C1.74795 12.9722 3.02541 13.5134 3.70663 12.7845ZM9.35701 11.7935L9.70204 12.1615L9.35701 11.7935C9.35715 11.7934 9.35729 11.7932 9.35744 11.7931L9.35701 11.7935Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    };
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("cdx-block");

    let data = this.getData();
    let html = this.handleHtmlEntities(data);
    let embed = this.createEmbed(html);
    if (data.html == "") {
      embed.addEventListener("paste", this.handlePastedData.bind(this));
    }
    this.wrapper.appendChild(embed);
    return this.wrapper;
  }

  save(blockContent) {
    let embed = blockContent.querySelector("[data-embed-wrapper]");
    if (embed == null || embed == undefined) {
      return {
        html: "",
      };
    }
    let html = escape(embed.innerHTML);
    return {
      html: html,
    };
  }

  createEmbed(html) {
    let embed = document.createElement("div");
    embed.setAttribute("contenteditable", "true");
    embed.setAttribute("data-embed-wrapper", "");
    embed.insertAdjacentHTML("afterbegin", html);
    return embed;
  }

  handlePastedData(event) {
    event.stopPropagation();
    event.preventDefault();
    let data = event.clipboardData.getData("text");
    let html = this.handler.getEmbeddedContent(data);
    if (html instanceof HTMLElement) {
      event.target.insertAdjacentElement("afterbegin", html);
    } else {
      alert(
        `Invalid Data, Embedding this url or html is not supported.  ${data}`
      );
    }
  }

  getData() {
    let data =
      this.data === null || this.data === "undefined"
        ? this.defaultData
        : this.data;
    if (data.html == null || data.html == undefined) {
      data.html = "";
    }
    return data;
  }

  handleHtmlEntities(data) {
    if (startsWith(data.html, "http")) {
      return data.html;
    } else {
      let html = null;
      html = unescape(data.html);
      html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      return html;
    }
  }
}

import TabsDataItem from "./tabs-data-item";
import startsWith from "lodash-es/startsWith";
import unescape from "lodash-es/unescape";
import EmbedHandler from "../../embed/embed-handler";

export default class TabsEmbed {
  constructor() {
    this.tabsItem = new TabsDataItem();
    this.handler = new EmbedHandler();
  }

  renderEmbedContent(data) {
    let embedContentWrapper = this.tabsItem.renderDataItem();
    let embedContent = this.renderEmbed(data);
    embedContentWrapper.appendChild(embedContent);
    return embedContentWrapper;
  }

  renderEmbed(data) {
    let embedContent = document.createElement("div");
    embedContent.setAttribute("data-tab-embed-wrapper", "");
    embedContent.setAttribute("contenteditable", "true");
    embedContent.classList.add("container-fluid");

    if (data.html == null || data.html == undefined) {
      data.html = "";
    }
    data.html = this.handleHtmlEntities(data);

    embedContent.insertAdjacentHTML("afterbegin", data.html);
    if (data.html == "") {
      embedContent.addEventListener("paste", this.handlePastedData.bind(this));
    }
    return embedContent;
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
    event.target.setAttribute("contenteditable", "false");
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

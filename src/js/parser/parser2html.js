import escape from "lodash-es/escape";
import unescape from "lodash-es/unescape";
import Handlebars from "handlebars";
import HandlebarHelpers from "./handlebar-helpers";
import TabsSettings from "../tabs/tabs-settings";

export default class Parser2HTML {
  constructor(config) {
    this.handlebars = Handlebars;
    this.handlebarHelpers = new HandlebarHelpers();
    this.template = null;
    this.settings = new TabsSettings();
    this.config = config || this.config;
    this.html = null;
  }

  config = {
    path: "bs4.html?raw",
  };

  blockTypes = [
    "paragraph",
    "header",
    "list",
    "quote",
    "code",
    "codeBlock",
    "delimiter",
    "image",
    "raw",
    "table",
    "tabs",
    "checklist",
    "nestedlist",
    "alert",
  ];

  async handleTypes(block) {
    switch (block.type) {
      case "paragraph":
        return this.parseParagraph(block);
      case "header":
        return this.parseHeader(block);
      case "list":
        return this.parseList(block);
      case "quote":
        return this.parseQuote(block);
      case "codeBlock":
        return this.parseCode(block);
      case "delimiter":
        return this.parseDelimiter(block);
      case "image":
        return this.parseImage(block);
      case "raw":
        return this.parseRawHtml(block);
      case "table":
        return this.parseTable(block);
      case "tabs":
        return this.parseTabs(block);
      case "checklist":
        return this.parseChecklist(block);
      case "nestedlist":
        return this.parseNestedChecklist(block);
      case "alert":
        return this.parseAlert(block);
      default:
        return "";
    }
  }

  registerHandlebarHelpers() {
    this.handlebars.registerHelper("ifCond", this.handlebarHelpers.ifCondition);
  }

  async initializeParser() {
    this.registerHandlebarHelpers();
    let base = import.meta.env.BASE_URL;
    if (import.meta.env.MODE === "development") {
      base = "http://localhost:5173/templates";
    }
    this.template = await this.loadTemplate(`${base}/${this.config.path}`);
    this.html = document.createElement("div");
    this.html.classList.add("container-fluid");
  }

  async parseDataToHtml(data) {
    await this.initializeParser();
    if (data.hasOwnProperty("blocks")) {
      for (let i = 0; i < data.blocks.length; i++) {
        // console.log(
        //   `found ${obj.blocks[i].type} element ${JSON.stringify(obj.blocks[i])}`
        // );
        this.html.insertAdjacentHTML(
          "beforeend",
          await this.handleTypes(data.blocks[i])
        );
      }
    } else {
      this.html.insertAdjacentHTML("beforeend", await this.handleTypes(data));
    }
    return this.html;
  }

  async loadFile(url) {
    try {
      let response = await fetch(url);
      if (response.ok) {
        return await response.text();
      }
      throw new Error("Network response was not ok.");
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  async loadTemplate(url) {
    let templateString = await this.loadFile(url);
    let wrapper = document.createElement("div");
    wrapper.innerHTML = templateString;
    return wrapper;
  }

  loadElementAsString(selector) {
    let element = this.template.querySelector(selector);
    let elementTemplate = document.importNode(element.content, true);
    let elementWrapper = document.createElement("div");
    elementWrapper.appendChild(elementTemplate);
    return elementWrapper.innerHTML;
  }

  parseParagraph(elem) {
    let paragraphTemplateString = this.loadElementAsString("#paragraph");
    let paragraphCompiled = this.handlebars.compile(paragraphTemplateString);
    let paragraphHtml = paragraphCompiled(elem);
    return paragraphHtml;
  }

  parseAlert(elem) {
    let warniningTemplateString = this.loadElementAsString("#alert");
    let warningCompiled = this.handlebars.compile(warniningTemplateString);
    let warningHtml = warningCompiled(elem);
    return warningHtml;
  }

  parseDelimiter(elem) {
    let delimiterTemplateString = this.loadElementAsString("#delimiter");
    let delimiterCompiled = this.handlebars.compile(delimiterTemplateString);
    let delimiterHtml = delimiterCompiled(elem);
    return delimiterHtml;
  }

  parseHeader(elem) {
    let headingTemplateString = this.loadElementAsString("#heading");
    let headingCompiled = this.handlebars.compile(headingTemplateString);
    let headingHtml = headingCompiled(elem);
    return headingHtml;
  }

  parseQuote(elem) {
    let quoteTemplateString = this.loadElementAsString("#blockquote");
    let quoteCompiled = this.handlebars.compile(quoteTemplateString);
    let quoteHtml = quoteCompiled(elem);
    return quoteHtml;
  }

  parseRawHtml(elem) {
    let html = escape(elem.data.html);
    let htmlTemplateString = this.loadElementAsString("#raw-html");
    let htmlCompiled = this.handlebars.compile(htmlTemplateString);
    let htmlHtml = htmlCompiled({ html: html });
    return htmlHtml;
  }

  parseCode(elem) {
    let codeTemplateString = this.loadElementAsString("#code-block");
    let codeCompiled = this.handlebars.compile(codeTemplateString);
    elem.data.code = elem.data.code.trim();
    let codeHtml = codeCompiled({
      data: elem.data,
      language: this.settings.languageList.find(
        (l) => l.code === elem.data.languageCode
      ).name,
    });
    return codeHtml;
  }

  parseChecklist(elem) {
    let checklistTemplateString = this.loadElementAsString("#checklist");
    let checklistCompiled = this.handlebars.compile(checklistTemplateString);
    let checklistHtml = checklistCompiled({ data: elem.data, id: elem.id });
    return checklistHtml;
  }

  parseNestedChecklist(elem) {
    let isOrdered = elem.data.style === "ordered";

    let nestedListTemplateString = this.loadElementAsString("#nested-list");
    let nestedListItemTemplateString =
      this.loadElementAsString("#nested-list-item");

    let unEscapedListTemplate = unescape(nestedListTemplateString);
    let unEscapedListItemTemplate = unescape(nestedListItemTemplateString);

    this.handlebars.registerPartial(
      "nested-list",
      unescape(unEscapedListTemplate)
    );
    this.handlebars.registerPartial(
      "nested-list-item",
      unescape(unEscapedListItemTemplate)
    );
    let nestedListCompiled = this.handlebars.compile(unEscapedListTemplate);
    let nestedListHtml = nestedListCompiled({
      items: elem.data.items,
      isOrdered: isOrdered,
    });
    return nestedListHtml;
  }

  parseList(elem) {
    let isOrdered = elem.data.style === "ordered";
    let listTemplateString = this.loadElementAsString("#list");
    let listCompiled = this.handlebars.compile(listTemplateString);
    let listHtml = listCompiled({
      items: elem.data.items,
      isOrdered: isOrdered,
    });
    return listHtml;
  }

  parseImage(elem) {
    let imageTemplateString = this.loadElementAsString("#image");
    let imageCompiled = this.handlebars.compile(imageTemplateString);
    let imageHtml = imageCompiled(elem);
    let handledImageHtml = this.handleImageUrls(imageHtml);
    return handledImageHtml;
  }

  handleImageUrls(html) {
    let wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    let images = wrapper.querySelectorAll("img");
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      image.setAttribute("loading", "lazy");
      let url = image.getAttribute("data-src");
      image.setAttribute("src", url);
      image.removeAttribute("data-src");
    }
    return wrapper.innerHTML;
  }

  parseTable(elem) {
    let renderer = `<table class="table table-bordered">`;
    if (elem.data.withHeadings) {
      renderer += `<thead><tr>`;
      elem.data.content[0].forEach((heading) => {
        renderer += `<th scope="col">${heading}</th>`;
      });
      renderer += `</tr></thead>`;
    }

    renderer += `<tbody>`;
    for (let i = 0; i < elem.data.content.length; i++) {
      if (elem.data.withHeadings === true && i === 0) {
        continue;
      }
      renderer += `<tr>`;
      elem.data.content[i].forEach((rowData) => {
        renderer += ` <td>${rowData}</td>`;
      });
      renderer += `</tr>`;
    }
    renderer += `</tbody></table>`;
    return renderer;
  }

  parseTabs(elem) {
    this.handleTabContentPartials();
    let tabsTemplateString = this.loadElementAsString("#tabs");
    let unEscapedTabsTemplate = unescape(tabsTemplateString);
    let tabCompiled = this.handlebars.compile(unEscapedTabsTemplate);
    elem.data.forEach((tab) => {
      tab.pre = Math.floor(Math.random() * 1000);
    });
    let tabHtml = tabCompiled({ data: elem.data });
    let handledImageHtml = this.handleImageUrls(tabHtml);
    return handledImageHtml;
  }

  handleTabContentPartials() {
    let tabTextTemplateString = this.loadElementAsString("#tab-text");
    let tabImageTemplateString = this.loadElementAsString("#tab-image");
    let tabCodeTemplateString = this.loadElementAsString("#tab-code-block");

    this.handlebars.registerPartial("tab-text", tabTextTemplateString);
    this.handlebars.registerPartial("tab-image", tabImageTemplateString);
    this.handlebars.registerPartial("tab-code-block", tabCodeTemplateString);
  }
}

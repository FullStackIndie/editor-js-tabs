import { LayoutTag, Liquid } from "liquidjs";
import TabsSettings from "../tabs/tabs-settings";
import { unescape } from "lodash-es";

export default class Liquid2Html {
  constructor(config) {
    this.config = config || this.defaultConfig;
    this.engine = new Liquid(this.config);
    this.html = document.createElement("div");
    this.settings = new TabsSettings();
  }

  defaultConfig = {
    cache: true,
    root: "liquid/",
    layouts: "layouts/bootstrap4",
    partials: "partials/bootstrap4",
    extname: ".liquid",
  };

  blockTypes = [
    "paragraph",
    "header",
    "list",
    "quote",
    "code",
    "codeBlock",
    "delimiter",
    "embed",
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
        return await this.renderPartial("paragraph", block.data);
      case "alert":
        return await this.renderPartial("alert", block.data);
      case "delimiter":
        return await this.renderPartial("delimiter", block.data);
      case "header":
        return await this.renderPartial("heading", block.data);
      case "quote":
        return await this.renderPartial("blockquote", block.data);
      case "codeBlock":
        block.data.language = this.settings.languageList.find(
          (l) => l.code === block.data.languageCode
        ).name;
        return await this.renderPartial("code-block", block.data);
      case "image":
        return await this.renderPartial("image", block.data);
      case "raw":
        return await this.renderPartial("html", block.data);
      case "embed":
        let html = unescape(block.data.html);
        html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        return html;
      case "list":
        return await this.renderPartial("list", block.data);
      case "table":
        return await this.renderPartial("table", block.data);
      case "checklist":
        return await this.renderPartial("checklist", block.data);
      case "nestedlist":
        return await this.renderPartial("nested-list/nested-list", block.data);
      case "tabs":
        console.log(block.data);
        block.data.forEach((tab) => {
          tab.data.forEach((content) => {
            if (content.type === "embed") {
              content.html = unescape(content.html);
              content.html = content.html.replace(/&lt;/g, "<");
              content.html = content.html.replace(/&gt;/g, ">");
            }
          });
        });
        return await this.renderPartial("tabs/tabs", block.data);
      default:
        return "";
    }
  }

  async parseDataToHtml(data) {
    this.html.insertAdjacentHTML("afterbegin", await this.renderLayout("main"));
    this.html = this.html.querySelector(".container");
    if (data.hasOwnProperty("blocks")) {
      for (let i = 0; i < data.blocks.length; i++) {
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

  async renderPartial(partial, data) {
    let render = await this.engine.renderFile(
      `${this.config.partials}/${partial}${this.config.extname}`,
      {
        data: data,
      }
    );
    if ((partial = "list")) {
    }
    return render;
  }

  async renderLayout(layout) {
    let render = await this.engine.renderFile(
      `${this.config.layouts}/${layout}${this.config.extname}`
    );
    return render;
  }

  async renderLayout(layout, data) {
    let render = await this.engine.renderFile(
      `${this.config.layouts}/${layout}${this.config.extname}`,
      {
        data: data,
      }
    );
    return render;
  }

  //   parseTabs(elem) {
  //     this.handleTabContentPartials();
  //     let tabsTemplateString = this.loadElementAsString("#tabs");
  //     let unEscapedTabsTemplate = unescape(tabsTemplateString);
  //     let tabCompiled = this.handlebars.compile(unEscapedTabsTemplate);
  //     elem.data.forEach((tab) => {
  //       tab.pre = Math.floor(Math.random() * 1000);
  //     });
  //     let tabHtml = tabCompiled({ data: elem.data });
  //     let handledImageHtml = this.handleImageUrls(tabHtml);
  //     return handledImageHtml;
  //   }

  //   handleTabContentPartials() {
  //     let tabTextTemplateString = this.loadElementAsString("#tab-text");
  //     let tabImageTemplateString = this.loadElementAsString("#tab-image");
  //     let tabCodeTemplateString = this.loadElementAsString("#tab-code-block");
  //     let tabEmbedTemplateString = this.loadElementAsString("#tab-embed");

  //     this.handlebars.registerPartial("tab-text", tabTextTemplateString);
  //     this.handlebars.registerPartial("tab-image", tabImageTemplateString);
  //     this.handlebars.registerPartial("tab-code-block", tabCodeTemplateString);
  //     this.handlebars.registerPartial("tab-embed", tabEmbedTemplateString);
  //   }
}

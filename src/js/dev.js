import { createHighlighter } from "shiki";
import Liquid2Html from "./parser/liquid2html.js";
import { useHighlightJS } from "../js/highlight.js";
import EventManager from "./tabs/events/event-manager";

export default class Dev {
  constructor() {
    this.liquid = new Liquid2Html();
    this.addEventListeners();
    this.attachRemoveEventListeners();
  }

  addEventListeners() {
    EventManager.subscribe("editor-save-data", this.renderHtml.bind(this));
  }

  async attachRemoveEventListeners() {
    window.addEventListener("unload", () => {
      EventManager.unsubscribe("editor-save-data", this.renderHtml.bind(this));
    });
  }

  async renderHtml(data) {
    let div =
      document.getElementById("dev-editor-preview") ||
      document.createElement("div");
    div.id = "dev-editor-preview";
    div.innerHTML = "";

    let liquidHtml = await this.liquid.parseDataToHtml(data);
    const html = await this.highlightCode(liquidHtml);
    div.insertAdjacentElement("beforeend", html);
    document.body.append(div);
  }
  async parseDataToHtml(data) {
    const html = await this.liquid.parseDataToHtml(data);
    console.log(html);
    html.querySelectorAll("input[type='checkbox']").forEach((check) => {
      check.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
    return html;
  }
  async highlightCode(html) {
    const highlighter = await createHighlighter({
      langs: ["html", "css", "javascript", "c#"],
      themes: ["dark-plus", "nord", "night-owl"],
    });
    html.querySelectorAll("pre code").forEach((code) => {
      code.innerHTML = highlighter.codeToHtml(code.textContent, {
        lang: code.getAttribute("data-lang"),
        theme: "night-owl",
      });
    });
    html.querySelectorAll("[data-copy]").forEach((copy) => {
      console.log("copying ---------------------------------");
      console.log(copy);
      copy.addEventListener("click", async function (e) {
        try {
           // properly implement copy button for code block
          let code = e.target.parentNode.closest("code");
          console.log(code);
          alert("Copied to clipboard");
          await navigator.clipboard.writeText(code.textContent);
        } catch (err) {
          console.log(err);
        }
      });
    });
    return html;
  }
}

async function highlightJS() {
  const hljs = await useHighlightJS();
  hljs.highlightAll();
}

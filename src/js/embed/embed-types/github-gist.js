export default class GithubGist {
  constructor() {}

  static handleGithubEmbed(html) {
    let div = document.createElement("div");
    div.setAttribute("data-embed", "");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "srcdoc",
      html
    );
    div.appendChild(iframe);
    return div;
  }

  static handleGithubUrl(url) {
    let div = document.createElement("div");
    div.setAttribute("data-url", "");
    let iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "320px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "srcdoc",
      `<html><body><script src='${url}.js'></script></body></html>`
    );
    div.appendChild(iframe);
    return div;
  }
}

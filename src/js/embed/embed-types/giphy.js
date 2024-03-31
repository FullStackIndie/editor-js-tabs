

export default class Giphy {
  static handleGiphyEmbed(html) {
    let div = document.createElement("div");
    div.setAttribute("data-embed", "");
    div.innerHTML = html;
    return div;
  }

  static handleGiphyUrl(url) {
    let oldUrl = url.split("/");
    let newUrl = `https://giphy.com/embed/${oldUrl[5]}`;
    let div = document.createElement("div");    
    div.setAttribute("data-embed", "");
    console.log(newUrl);
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", newUrl);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "480px");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    div.appendChild(iframe);
    return div;
  }
}

import escape from "lodash-es/escape";

export default class Parser {
  parseDataToHtml(data) {
    console.log(data);
    let html = `
<div class="container-fluid">`;
    let obj = JSON.parse(data);
    obj.blocks.forEach((block) => {
      html += "<br/>";
      if (block.type === "paragraph") {
        html += this.parseParagraph(block);
      }

      if (block.type === "warning") {
        html += this.parseWarning(block);
      }

      if (block.type === "delimiter") {
        html += this.parseDelimiter(block);
      }

      if (block.type === "checklist") {
        html += this.parseChecklist(block);
      }

      if (block.type === "nestedlist") {
        html += this.parseNestedChecklist(block);
      }

      if (block.type === "header") {
        html += this.parseHeader(block);
      }
      if (block.type === "quote") {
        html += this.parseQuote(block);
      }
      if (block.type === "raw") {
        html += this.parseRawHtml(block);
      }
      if (block.type === "code-block") {
        html += this.parseCode(block);
      }
      if (block.type === "table") {
        html += this.parseTable(block);
      }
      if (block.type === "tabs") {
        html += this.parseTabs(block);
      }
      if (block.type === "image") {
        html += this.parseImage(block);
      }
    });
    html += "</div>";
    return html;
  }

  parseParagraph(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let text = elem.data.text;
    let renderer = "";
    if (text == "" || text == null) {
      renderer += `<br/>`;
    } else {
      renderer += `<p ${this.addNewLineClass(text)}>${text}</p>`;
    }
    console.log(renderer);
    return renderer;
  }

  addNewLineClass(text) {
    if (text.includes("\n")) {
      return `class="multiline"`;
    }
    return "";
  }

  parseWarning(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let renderer = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">${elem.data.title}</h4>
        <p>${elem.data.message}</p>

      </div>
      `;
    console.log(renderer);
    return renderer;
  }

  parseDelimiter(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let renderer = `<hr>`;
    console.log(renderer);
    return renderer;
  }

  parseHeader(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let renderer = `<h${elem.data.level}>${elem.data.text}</h${elem.data.level}>`;
    console.log(renderer);
    return renderer;
  }

  parseQuote(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let renderer = `
      <blockquote class="blockquote text-${elem.data.alignment}">
  <p class="mb-0">${elem.data.text}</p>
  <footer class="blockquote-footer">${elem.data.caption}</footer>
</blockquote>
      `;
    console.log(renderer);
    return renderer;
  }

  parseRawHtml(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let html = escape(elem.data.html);
    let renderer = `
      <pre class="language-html"><code>${html}</code></pre>
      `;
    console.log(renderer);
    return renderer;
  }

  parseCode(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let html = escape(elem.data.code);
    let renderer = `
      <pre class="language-${elem.data.languageCode}"><code>${html}</code></pre>
      `;
    console.log(renderer);
    return renderer;
  }

  parseChecklist(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let renderer = ``;
    elem.data.items.forEach((checklist) => {
      let checked = "";
      if (checklist.checked) {
        checked = "checked";
      }
      renderer += `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="${elem.id}-${checklist.text}" ${checked}>
          <label class="form-check-label" for="${elem.id}-${checklist.text}">
            ${checklist.text}
          </label>
        </div>
          `;
    });
    return renderer;
  }

  parseNestedChecklist(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);

    let style = "";
    let renderer = ``;

    if (elem.data.style === "unordered") {
      style = "u";
    } else {
      style = "o";
    }

    renderer += this.renderParentList(elem.data.items, style);
    return renderer;
  }

  renderParentList(items, style) {
    let renderer = ``;
    renderer += `<${style}l>`;
    items.forEach((item) => {
      renderer += `<li>${item.content}`;
      if (item.items.length > 0) {
        renderer += this.renderNestedList(item, style);
      }
      renderer += `</li>`;
    });
    renderer += `</${style}l>`;
    return renderer;
  }

  renderNestedList(elem, style) {
    let renderer = "";
    renderer += `<${style}l type="a">`;
    elem.items.forEach((item) => {
      renderer += `<li>${item.content}</li>`;
      if (item.items.length > 0) {
        renderer += this.renderParentList(item.items, style);
      }
    });
    renderer += `</${style}l>`;
    return renderer;
  }

  parseImage(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let renderer = `<img src="${elem.data.file.url}" alt="${elem.data.caption}" class="img-fluid mx-auto d-block  mt-5">`;
    return renderer;
  }

  parseTable(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    let renderer = `<table class="table table-bordered">`;
    console.log(elem.data.withHeadings);
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
    console.log(renderer);
    return renderer;
  }

  parseTabs(elem) {
    console.log(`found ${elem.type} element ${JSON.stringify(elem)}`);
    const renderedPanels = this.handleTabRendering(
      elem.data.tabHeadingTitles,
      elem.data.tabContent
    );
    let renderer = `<div class="bordered-tab-contents">`;
    renderer += renderedPanels.tabs;
    renderer += renderedPanels.panels;
    renderer += `</div>`;
    return renderer;
  }

  renderTab(id, tabTitle, active) {
    let isActive = active ? "active" : "";
    return `  
    <li class="nav-item">
      <a class="nav-link ${isActive}" id="${tabTitle.toLowerCase()}-tab-${id}" data-toggle="tab" href="#${tabTitle.toLowerCase()}-${id}" role="tab" aria-controls="${tabTitle.toLowerCase()}-${id}"
        aria-selected="true">${tabTitle}<span class="ml-3"></span>
      </a>
    </li>`;
  }

  renderTabPanel(id, tabTitle, content, active) {
    let isActive = active ? "show active" : "";
    return `  
    <div class="tab-pane fade ${isActive}" id="${tabTitle.toLowerCase()}-${id}" role="tabpanel" aria-labelledby="${tabTitle.toLowerCase()}-tab-${id}">
    ${content}
    </div>`;
  }

  handleTabRendering(tabTitles, tabContent) {
    let tabId = crypto.randomUUID();
    let tabRenderer = `<ul class="nav nav-tabs " id="tab-${tabId}" role="tablist">`;
    let tabPanelRenderer = `<div class="tab-content bordered-tab-contents" id="tabContent-${tabId}">`;
    for (let i = 0; i <= tabTitles.length - 1; i++) {
      let currentId = crypto.randomUUID();
      if (i === 0) {
        tabRenderer += this.renderTab(currentId, tabTitles[i], true);
        tabPanelRenderer += this.renderTabPanel(
          currentId,
          tabTitles[i],
          tabContent[i],
          true
        );
      } else {
        tabRenderer += this.renderTab(currentId, tabTitles[i], false);
        tabPanelRenderer += this.renderTabPanel(
          currentId,
          tabTitles[i],
          tabContent[i],
          false
        );
      }
    }
    tabRenderer += `</ul>`;
    tabPanelRenderer += `</div>`;
    return { tabs: tabRenderer, panels: tabPanelRenderer };
  }
}

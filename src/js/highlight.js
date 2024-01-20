import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import csharp from "highlight.js/lib/languages/csharp";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import lua from "highlight.js/lib/languages/lua";
import makefile from "highlight.js/lib/languages/makefile";
import markdown from "highlight.js/lib/languages/markdown";
import nginx from "highlight.js/lib/languages/nginx";
import powershell from "highlight.js/lib/languages/powershell";
import protobuf from "highlight.js/lib/languages/protobuf";
import scss from "highlight.js/lib/languages/scss";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

export default function useHighlightJs() {
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("csharp", csharp);
  hljs.registerLanguage("dockerfile", dockerfile);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("makefile", makefile);
  hljs.registerLanguage("lua", lua);
  hljs.registerLanguage("markdown", markdown);
  hljs.registerLanguage("nginx", nginx);
  hljs.registerLanguage("powershell", powershell);
  hljs.registerLanguage("protobuf", protobuf);
  hljs.registerLanguage("scss", scss);
  hljs.registerLanguage("shell", shell);
  hljs.registerLanguage("sql", sql);
  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("yaml", yaml);
  return hljs;
}

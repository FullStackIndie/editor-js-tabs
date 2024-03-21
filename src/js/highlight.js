import hljs from "highlight.js/lib/core";

export const languageConfig = {
  languages: [
    "javascript",
    "css",
    "json",
    "markdown",
    "csharp",
    "python",
    "ruby",
    "typescript",
    "xml",
    "yaml",
  ],
};

export async function useHighlightJS(config) {
  if (!config) config = languageConfig;
  for (const language of config.languages) {
    const module = await import(
      /* @vite-ignore */ `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/${language}.min.js`
    );
    hljs.registerLanguage(language, module.default);
  }
  return hljs;
}

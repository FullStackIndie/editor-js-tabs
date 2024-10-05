import Header from "@editorjs/header";
import CodeBlock from "./code-block/code-block";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import RawTool from "@editorjs/raw";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import Underline from "@editorjs/underline";
import Delimiter from "@editorjs/delimiter";
import ImageTool from "@editorjs/image";
import NestedList from "@editorjs/nested-list";
import Tabs from "./tabs/editorjs-tabs";
import Embed from "./embed/embed";
import Alert from "editorjs-alert";
import AlignTune from "./tunes/align-tune/align-tune";
import TextVariantTune from "@editorjs/text-variant-tune";

export const editorConfig = {
  inlineToolbar: ["link", "marker", "bold", "italic", "underline"],
  tools: {
    alignTune: {
      class: AlignTune,
    },
    textVariantTune: {
      class: TextVariantTune,
    },
    paragraph: {
      class: Paragraph,
      config: {
        placeholder: "Write a blog article",
        preserveBlank: true,
      },
      inlineToolbar: true,
      tunes: ["alignTune", "textVariantTune"],
    },
    header: {
      class: Header,
      inlineToolbar: ["marker", "link"],
      config: {
        placeholder: "Enter a header",
      },
      shortcut: "CMD+SHIFT+H",
      tunes: ["alignTune"],
    },
    alert: {
      class: Alert,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+A",
      config: {
        defaultType: "primary",
        defaultAlign: "left",
        messagePlaceholder: "Enter something",
      },
    },
    raw: RawTool,
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: "https://dev.blog.fullstackindie.net/api/image", // Your backend file uploader endpoint
        },
        uploader: {
          uploadByUrl(url) {
            // No server upload, just return the url
            return new Promise((resolve) => {
              resolve({
                success: 1,
                file: {
                  url: url,
                },
              });
            });
          },
        },
      },
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    embed: {
      class: Embed,
      config: {
        useTune: true,
      },
    },
    quote: Quote,
    table: Table,
    delimiter: Delimiter,
    codeBlock: {
      class: CodeBlock,
    },
    inlineCode: InlineCode,
    underline: Underline,
    nestedlist: {
      class: NestedList,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
    },
    marker: {
      class: Marker,
      shortcut: "CMD+SHIFT+M",
    },
    tabs: {
      class: Tabs,
      inlineToolbar: true,
      config: {
        initialTabs: 2,
      },
    },
  },
};

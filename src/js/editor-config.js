import Header from "@editorjs/header";
import List from "@editorjs/list";
import CodeBlock from "./code-block/code-block";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import RawTool from "@editorjs/raw";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import Underline from "@editorjs/underline";
import Delimiter from "@editorjs/delimiter";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import NestedList from "@editorjs/nested-list";
import Tabs from "./tabs/editorjs-tabs";
import EmbedCustom from "./embed/embed";
import Alert from "editorjs-alert";
import AlignTune from "./tunes/align-tune/align-tune";

export const editorConfig = {
  inlineToolbar: ["link", "marker", "bold", "italic", "underline"],
  tools: {
    alignTune: {
      class: AlignTune,
    },
    paragraph: {
      class: Paragraph,
      config: {
        placeholder: "Write a blog article",
        preserveBlank: true,
      },
      inlineToolbar: true,
      tunes: ["alignTune"],
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
    list: {
      class: List,
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
    linkTool: {
      class: LinkTool,
      config: {
        endpoint:
          "http://localhost/phppot/jquery/editorjs/extract-link-data.php", // Your backend endpoint for url data fetching,
      },
    },
    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          instagram: true,
          vimeo: true,
          github: true,
          imgur: true,
        },
      },
    },
    embedCustom: {
      class: EmbedCustom,
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
    },
  },
};

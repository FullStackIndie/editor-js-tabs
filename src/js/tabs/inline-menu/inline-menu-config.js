import InlineAddImage from "./events/inline-add-image";
import InlineAddText from "./events/inline-add-text";
import InlineDeleteItem from "./events/inline-delete-item";
import InlineAddCode from "./events/inline-add-code";
import InlineAddEmbed from "./events/inline-add-embed";

export default class InlineMenuConfig {
  config = [
    {
      class: InlineAddText,
    },
    {
      class: InlineAddImage,
    },
    {
      class: InlineAddCode,
    },
    {
      class: InlineAddEmbed,
    },
    {
      class: InlineDeleteItem,
    },
  ];
}

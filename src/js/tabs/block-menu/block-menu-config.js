import BlockAddText from "./events/block-add-text";
import BlockAddCode from "./events/block-add-code";
import BlockAddImage from "./events/block-add-image";
import BlockAddTab from "./events/block-add-tab";

export default class BlockMenuConfig {
  config = [
    {
      class: BlockAddTab,
    },
    {
      class: BlockAddText,
    },
    {
      class: BlockAddImage,
    },
    {
      class: BlockAddCode,
    },
  ];
}

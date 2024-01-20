export default class AlignTune {
  constructor({ data, api, config }) {
    this.api = api;
    this.data = data;
    this.config = config;
    this.currentAlignment = null;
  }

  static get isTune() {
    return true;
  }

  alignments = {
    left: "left",
    center: "center",
    right: "right",
  };

  icons = {
    alignLeft: `
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6H21M8 10H21M8 14H21M8 18H21M3 6H5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    alignCenter: `
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21M3 14H21M17 10H7M17 18H7" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    alignRight: `
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10H16M3 14H21M3 18H16M3 6H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
  };

  render() {
    return [
      {
        icon: this.icons.alignLeft,
        label: "Align Left",
        onActivate: () => {
          let blockId = this.getCurrentBlockId();
          this.alignTextContent(this.alignments.left, blockId);
        },
      },
      {
        icon: this.icons.alignCenter,
        label: "Align Center",
        onActivate: () => {
          let blockId = this.getCurrentBlockId();
          this.alignTextContent(this.alignments.center, blockId);
        },
      },
      {
        icon: this.icons.alignRight,
        label: "Align Right",
        onActivate: () => {
          let blockId = this.getCurrentBlockId();
          this.alignTextContent(this.alignments.right, blockId);
        },
      },
    ];
  }

  save() {
    return {
      alignment: this.currentAlignment,
    };
  }

  getCurrentBlockId() {
    console.log(this.data);
    let index = this.api.blocks.getCurrentBlockIndex();
    let block = this.api.blocks.getBlockByIndex(index);
    let blockId = block.id;
    return blockId;
  }

  alignTextContent(align, blockId) {
    let elem = document.querySelector(
      `[data-id="${blockId}"] .ce-block__content`
    );
    this.currentAlignment = align;
    elem.style.textAlign = this.currentAlignment;
  }
}

export function alignTuneOnLoad(blockId, data) {
  let alignment = data.alignment;
  let elem = document.querySelector(
    `[data-id="${blockId}"] .ce-block__content`
  );
  console.log(elem);
  if (alignment) {
    elem.style.textAlign = alignment;
  } else {
    elem.style.textAlign = "left";
  }
}

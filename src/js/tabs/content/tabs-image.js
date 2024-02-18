import TabsDataItem from "./tabs-data-item";

export default class TabsImage {
  constructor() {
    this.tabsItem = new TabsDataItem();
  }

  imageSettings = {
    url: "",
    width: "400",
    height: "200",
    caption: "",
  };

  renderSavedImage(data) {
    let imageContentWrapper = this.renderImageContentWrapper();
    let imageContent = this.renderImageContent(data);
    imageContentWrapper.appendChild(imageContent);
    return imageContentWrapper;
  }

  renderUploadedImage(imageData) {
    let tabContentParent = document.querySelector(
      ".tab-content > .show.active"
    );
    let tabId = tabContentParent.getAttribute("id");
    let tabContent = document.getElementById(tabId);

    let imageContentWrapper = this.renderImageContentWrapper();
    this.imageSettings.url = imageData.file.url;
    let imageContent = this.renderImageContent(this.imageSettings);
    imageContentWrapper.appendChild(imageContent);
    this.addImageCaptionEventHandlers(imageContentWrapper);

    tabContent.appendChild(imageContentWrapper);
    return tabContent;
  }

  renderUploadedImage(imageData, parent) {
    let tabContentParent = document.querySelector(
      ".tab-content > .show.active"
    );
    let tabId = tabContentParent.getAttribute("id");
    let tabContent = document.getElementById(tabId);

    let imageContentWrapper = this.renderImageContentWrapper();
    this.imageSettings.url = imageData.file.url;
    let imageContent = this.renderImageContent(this.imageSettings);
    imageContentWrapper.appendChild(imageContent);
    this.addImageCaptionEventHandlers(imageContentWrapper);

    tabContent.appendChild(imageContentWrapper);
    return tabContent;
  }

  addImageCaptionEventHandlers(parent) {
    parent
      .querySelector("[data-tab-img-caption]")
      .addEventListener("input", (event) => {
        let parent = event.target.parentNode;
        let img = parent.querySelector("figure > img");
        let figCaption = parent.querySelector("figure > figcaption");
        img.alt = event.target.value;
        figCaption.textContent = event.target.value;
      });
  }

  renderImageContent(data) {
    let imageWrapper = this.tabsItem.renderDataItem("mt-1");
    let figureWrapper = this.renderImage(data);
    imageWrapper.appendChild(figureWrapper);
    return imageWrapper;
  }

  renderImage(data) {
    let figureWrapper = document.createElement("div");
    figureWrapper.classList.add("mx-auto", "d-block");

    let figure = document.createElement("figure");
    figure.classList.add("figure");

    let image = document.createElement("img");
    image.setAttribute("src", data.url);
    image.setAttribute("class", "img-fluid  mt-5 mb-2");
    image.setAttribute("width", data.width);
    image.setAttribute("height", data.height);
    image.setAttribute("alt", data.caption);
    image.setAttribute("data-tab-img", "");

    let figCaption = document.createElement("figcaption");
    figCaption.classList.add(
      "figure-caption",
      "text-center",
      "font-weight-bold"
    );
    figCaption.textContent = data.caption;

    let captionInput = document.createElement("input");
    captionInput.setAttribute("type", "text");
    captionInput.setAttribute("class", "form-control mb-5");
    captionInput.setAttribute("placeholder", "Image Caption");
    captionInput.setAttribute("id", "imageCaption");
    captionInput.setAttribute("aria-label", "Image Caption");
    captionInput.setAttribute("aria-describedby", "imageLabel");
    captionInput.setAttribute("data-tab-img-caption", "");
    captionInput.value = data.caption;

    figure.appendChild(image);
    figure.appendChild(figCaption);
    figure.appendChild(captionInput);
    figureWrapper.appendChild(figure);

    return figureWrapper;
  }

  uploadImage(callback, file) {
    if (!file) {
      console.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    fetch("https://dev.blog.fullstackindie.net/api/image", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the successful response
        console.log("Success:", data);
        // this.renderUploadedImage(data);
        callback.apply(this, [data]);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }

  createImageEventButton(callback) {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      // Handle the image file here
      // need callback to render image
      // passing it to uploadImage function since this function
      // is the entry point
      this.uploadImage(callback, file);
    });
    return imageInput;
  }
}

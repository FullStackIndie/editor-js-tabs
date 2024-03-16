import TabsDataItem from "./tabs-data-item";

export default class TabsImage {
  constructor() {
    this.tabsItem = new TabsDataItem();
  }

  imageSettings = {
    width: "400",
    height: "200",
  };

  renderSavedImage(data) {
    let imageContent = this.renderImageContent(data);
    return imageContent;
  }

  renderUploadedImage(data) {
    let tabContentParent = document.querySelector(
      ".tab-content > .show.active"
    );
    let tabId = tabContentParent.getAttribute("id");
    let tabContent = document.getElementById(tabId);

    let imageContent = this.renderImageContent(data);
    this.addImageCaptionEventHandlers(imageContent);

    tabContent.appendChild(imageContent);
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
    image.setAttribute("class", "img-fluid mt-5 mb-2");
    image.setAttribute("width", this.imageSettings.width);
    image.setAttribute("height", this.imageSettings.height);
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

  createImageEventButton() {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.addEventListener("change", (event) => {
      this.addImagePromise(event.target.files[0])
        .then((data) => {
          console.log(data);
          return this.renderUploadedImage(data.file);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    let image = imageInput.click();
    return image;
  }

  addImagePromise(file) {
    return new Promise((resolve, reject) => {
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
          resolve(data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
          reject(error);
        });
    });
  }
}

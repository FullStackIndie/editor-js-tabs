import { moveSvgIcon } from "./tabs-icons";

export default class TabsImageHandler {
  constructor() {}

  renderImage(data) {
    let tabContentParent = document.querySelector(
      ".tab-content > .show.active"
    );
    console.log(tabContentParent);
    let tabId = tabContentParent.getAttribute("id");
    console.log(tabId);
    let tabContent = document.getElementById(tabId);
    console.log(tabContent);
    let renderer = `<div class="row ml-1 mt-1">`;
    renderer += `${moveSvgIcon("edit-tab-img")}`;
    renderer += `<div class="mx-auto d-block">
    <figure class="figure">`;
    renderer += `<img src="${data.file.url}" class="img-fluid  mt-5 mb-2" width="400" height="300" alt="" data-tab-img>`;
    renderer += ` 
    <figcaption class="figure-caption text-center font-weight-bold">Image Caption</figcaption>
    </figure>`;
    renderer += ` 
    <input type="text" class="form-control mb-5" placeholder="Image Caption" id="imageCaption" aria-label="Image Caption" aria-describedby="imageLabel" data-tab-img-caption>
    </div>`;
    renderer += `</div>`;

    tabContent.insertAdjacentHTML("beforeend", renderer);
  }

  uploadImage(file) {
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
        this.renderImage(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }

  createImageSetting() {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      // Handle the image file here
      this.uploadImage(file);
    });
    return imageInput;
  }
}

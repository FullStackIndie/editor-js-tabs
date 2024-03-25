import { addImageSvgIcon } from "../../tabs-icons";
import TabsImage from "../../content/tabs-image";

export default class InlineAddImage {
  constructor(config) {

  }

  static get attribute() {
    return { menuKey: "add-tab-image", itemKey: "data-tab-img" };
  }

  static get icon() {
    return addImageSvgIcon;
  }

  static onDeleteEvent(event) {
    if (event.target) {
      let imgUrl = event.target.querySelector("img").src;
      let deletePromise = this.deleteImagePromise(imgUrl);
      deletePromise
        .then((data) => {
          console.log("Image Deleted from server: ", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  eventHandler(elem, selector) {
    elem.addEventListener("click", (e) => {
      let dataItem = e.target.closest(selector);
      let tabsImage = new TabsImage();
      tabsImage.createImageTabContentEventButton(dataItem);
    });
  }

  static deleteImagePromise(url) {
    return new Promise((resolve, reject) => {
      fetch(`https://dev.blog.fullstackindie.net/api/image?url=${url}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Handle the successful response
          console.log("Successfully deleted Image:", data);
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

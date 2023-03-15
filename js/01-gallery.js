import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const galleryElement = createGalleryElement(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryElement);

galleryContainer.addEventListener("click", onGalleryElementClick);

function createGalleryElement(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </div>`;
    })
    .join("");
}

function onGalleryElementClick(event) {
  event.preventDefault();

  const image = event.target;
  if (!image.classList.contains("gallery__image")) {
    return;
  }

  const bigImgUrl = image.dataset.source;
  const galleryLightBox = basicLightbox.create(`
    <img src="${bigImgUrl}" width="800" height="600">`);

  galleryLightBox.show();

  if (galleryLightBox.show() === true) {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        galleryLightBox.close();
      }
    });
  } else {
    document.removeEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        galleryLightBox.close();
      }
    });
  }
}

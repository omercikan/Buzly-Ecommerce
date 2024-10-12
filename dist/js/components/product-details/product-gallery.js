/*const productThumbsList = document.querySelectorAll<HTMLImageElement>('#productThumbsList li img');
const productMainImg = document.getElementById('productMainImg') as HTMLImageElement;

for(let thumb of productThumbsList) {
    thumb.addEventListener('click', () => {
        document.querySelector('img.active').classList.remove('active');
        thumb.classList.add('active');
        const thumbImg = thumb.src;
        productMainImg.src = thumbImg;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const productTitle = document.getElementById('productTitle') as HTMLHeadingElement;
    productThumbsList.forEach(thumb => thumb.alt = productTitle.textContent);
    document.title = `${productTitle.textContent} Fiyatı, Yorumları - Buzly`;
});
*/
import { productThumbnails } from "../../showProduct.js";
productThumbnails();
const productMainPicture = document.getElementById('productMainImg');
const thumbImages = document.querySelectorAll(".thumb-image");
const productThumbsList = document.querySelector('#productThumbsList');
productThumbsList.firstElementChild.querySelector('img').classList.add('active');
thumbImages.forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
        const target = e.target;
        const src = target.src;
        productMainPicture.src = src;
        thumbImages.forEach((active) => active.classList.remove('active'));
        thumb.classList.add('active');
    });
});
//# sourceMappingURL=product-gallery.js.map
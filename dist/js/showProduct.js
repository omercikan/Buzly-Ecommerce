import { productThumbSlider } from "./glide.js";
const dataProduct = localStorage.getItem('showProduct') ? JSON.parse(localStorage.getItem('showProduct')) : [];
document.title = `${dataProduct.name} - Buzly | İyi Fiyat, Hızlı Teslimat`;
//? Product main image ?//
const productMainPicture = document.getElementById('productMainImg');
productMainPicture.src = dataProduct.img.mainImage;
//? Product thumb gallery picture ?//
const productThumbsList = document.getElementById('productThumbsList');
export const productThumbnails = () => {
    let thumbImg = '';
    dataProduct.img.thumbs.forEach(thumb => {
        thumbImg += `
        <li class="glide__slide">
            <img src="${thumb}" class="thumb-image">
        </li>
        `;
        productThumbsList.innerHTML = thumbImg;
        productThumbSlider();
    });
};
productThumbnails();
//? Product information details ?//
const productInformation = document.getElementById('productInformation');
let features = '';
const productFeatures = dataProduct.productFeatures;
Object.keys(productFeatures).forEach((key) => {
    features += `
        <tr>
            <td>${key}</td>
            <td>${productFeatures[key]}</td>
        </tr>
    `;
    productInformation.innerHTML = features;
});
const productTableStockCode = document.getElementById('productTableStockCode');
productTableStockCode.innerText = dataProduct.ProductOther.stockCode;
//? Product Title ?//
const productTitle = document.getElementById('productTitle');
productTitle.innerText = dataProduct.name;
//? Product Vote skor and evaluation info ?//
const productVote = document.getElementById('productVote');
const productReview = document.getElementById('productReview');
productVote.innerText = dataProduct.vote;
productReview.innerText = dataProduct.evaluation;
//? Product new price and old price ?// 
const productNewPrice = document.getElementById('productNewPrice');
const productOldPrice = document.getElementById('productOldPrice');
productNewPrice.innerText = `${dataProduct.price.newPrice} TL`;
productOldPrice.innerText = `${dataProduct.price.oldPrice} TL`;
//? Product Description text ?//
const productDescription = document.getElementById('productDescription');
productDescription.innerText = dataProduct.productDetail;
//? Product stock code, categories and tickets text ?//
const productStockCode = document.getElementById('productStockCode');
const productCategories = document.getElementById('productCategories');
const productTickets = document.getElementById('productTickets');
productStockCode.innerText = dataProduct.ProductOther.stockCode;
productCategories.innerText = dataProduct.ProductOther.categories;
productTickets.innerText = dataProduct.ProductOther.tickets;
//? Produc tab panel head and description title field ?//
const tabPanelHead = document.querySelector('.tab-panel-description h2');
const tabPanelDesc = document.querySelector('.tab-panel-description p');
tabPanelHead.innerHTML = dataProduct.name;
tabPanelDesc.innerHTML = dataProduct.productDetail;
//? Breadcrumb list ?//
const breadcrumbList = document.querySelector('#breadcrumbList');
let breadcrumbs = `
    <li><a href="index.html">ana sayfa</a></li>
    <li><a href="#">${dataProduct.gender}</a></li>
    <li><a href="#">${dataProduct.category}</a></li>
    <li>${dataProduct.name}</li>
`;
breadcrumbList.innerHTML = breadcrumbs;
//? Product Amount ?//
const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const productAmountInput = document.getElementById('productAmountInput');
const addBasketBtn = document.getElementById('addBasketBtn');
const findCart = cart.find((product) => product.id === dataProduct.id);
if (findCart) {
    addBasketBtn.setAttribute('disabled', 'disabled');
}
else {
    let cartCount = document.querySelector('.cart-count');
    addBasketBtn.addEventListener('click', () => {
        addBasketBtn.setAttribute('disabled', 'disabled');
        const show = JSON.parse(localStorage.getItem('showProduct'));
        cart.push(Object.assign(Object.assign({}, show), { amount: Number(productAmountInput.value) }));
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCount.innerHTML = JSON.parse(localStorage.getItem('cart')).length;
    });
}

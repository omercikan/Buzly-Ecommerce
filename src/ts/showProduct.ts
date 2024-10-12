import { productThumbSlider } from "./glide.js";
const dataProduct = localStorage.getItem('showProduct') ? JSON.parse(localStorage.getItem('showProduct')) : [];
document.title = `${dataProduct.name} - Buzly | İyi Fiyat, Hızlı Teslimat`

//? Product main image ?//
const productMainPicture = document.getElementById('productMainImg') as HTMLImageElement;
productMainPicture.src = dataProduct.img.mainImage

//? Product thumb gallery picture ?//
const productThumbsList = document.getElementById('productThumbsList') as HTMLOListElement;

export const productThumbnails = () => {
    let thumbImg: string = ''
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
const productInformation = document.getElementById('productInformation') as HTMLTableSectionElement;

let features: string = '';
const productFeatures = dataProduct.productFeatures;

Object.keys(productFeatures).forEach((key) => {
    features += `
        <tr>
            <td>${key}</td>
            <td>${productFeatures[key as keyof typeof productFeatures]}</td>
        </tr>
    `;

    productInformation.innerHTML = features;
});

const productTableStockCode = document.getElementById('productTableStockCode') as HTMLTableColElement;
productTableStockCode.innerText = dataProduct.ProductOther.stockCode;

//? Product Title ?//
const productTitle = document.getElementById('productTitle') as HTMLHeadingElement;
productTitle.innerText = dataProduct.name

//? Product Vote skor and evaluation info ?//
const productVote = document.getElementById('productVote') as HTMLSpanElement;
const productReview = document.getElementById('productReview') as HTMLSpanElement;
productVote.innerText = dataProduct.vote;
productReview.innerText = dataProduct.evaluation;

//? Product new price and old price ?// 
const productNewPrice = document.getElementById('productNewPrice') as HTMLElement;
const productOldPrice = document.getElementById('productOldPrice') as HTMLElement;
productNewPrice.innerText = `${dataProduct.price.newPrice} TL`;
productOldPrice.innerText = `${dataProduct.price.oldPrice} TL`;

//? Product Description text ?//
const productDescription = document.getElementById('productDescription') as HTMLParagraphElement;
productDescription.innerText = dataProduct.productDetail

//? Product stock code, categories and tickets text ?//
const productStockCode = document.getElementById('productStockCode') as HTMLSpanElement;
const productCategories = document.getElementById('productCategories') as HTMLSpanElement;
const productTickets = document.getElementById('productTickets') as HTMLSpanElement;
productStockCode.innerText = dataProduct.ProductOther.stockCode;
productCategories.innerText = dataProduct.ProductOther.categories;
productTickets.innerText = dataProduct.ProductOther.tickets;

//? Produc tab panel head and description title field ?//
const tabPanelHead = document.querySelector('.tab-panel-description h2');
const tabPanelDesc = document.querySelector('.tab-panel-description p');

tabPanelHead.innerHTML = dataProduct.name;
tabPanelDesc.innerHTML = dataProduct.productDetail;

//? Breadcrumb list ?//
const breadcrumbList = document.querySelector('#breadcrumbList') as HTMLUListElement;

let breadcrumbs = `
    <li><a href="index.html">ana sayfa</a></li>
    <li><a href="#">${dataProduct.gender}</a></li>
    <li><a href="#">${dataProduct.category}</a></li>
    <li>${dataProduct.name}</li>
`;

breadcrumbList.innerHTML = breadcrumbs;

//? Product Amount ?//
const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
const productAmountInput = document.getElementById('productAmountInput') as HTMLInputElement;
const addBasketBtn = document.getElementById('addBasketBtn') as HTMLButtonElement;

const findCart = cart.find((product) => product.id === dataProduct.id)
if(findCart) {
    addBasketBtn.setAttribute('disabled', 'disabled')
} else {
    let cartCount = document.querySelector<HTMLElement>('.cart-count');

    addBasketBtn.addEventListener('click', () => {
        addBasketBtn.setAttribute('disabled', 'disabled')
        const show = JSON.parse(localStorage.getItem('showProduct'))
        cart.push({...show, amount: Number(productAmountInput.value)})
        localStorage.setItem('cart', JSON.stringify(cart))

        cartCount.innerHTML = JSON.parse(localStorage.getItem('cart')).length
    });
}
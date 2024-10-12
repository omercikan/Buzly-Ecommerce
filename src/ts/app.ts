import {userData} from "./components/userData.js";
userData()

import header from "./components/header.js";
header

import { checkSubscribe } from "./components/footer.js";
checkSubscribe();

import  productSliderFunc  from "./product.js";

// import { showProducts } from "./search-modal.js";
// import { goToFocusProduct } from "./search-modal.js";

import { searchFunc } from "./search-modal.js";

import { displayBlogs } from "./main-blogs.js";
import { displayAllBlogs } from "./main-blogs.js";
import { displayFocusCategory } from "./components/slider-orientation.js";
import { displayFocusCategorySeason } from "./components/slider-orientation.js";
import { displayFocusCategoryOffer } from "./components/slider-orientation.js";

//!<-- Get All Product save to localStorage start -->
async function productData() {
    const requestData = await fetch("./js/productData.json")
    const data = await requestData.json();
    data ? localStorage.setItem('products', JSON.stringify(data)) : [];
    // showProducts(data)
    searchFunc(data)
}

productData(); 
//!<-- Get All Product save to localStorage end -->

//!<-- Get Product First data save to localStorage start -->
async function firstProdutData() {
    const requestFirstData = await fetch('./js/productDataOne.json')
    const data = await requestFirstData.json()
    data ? localStorage.setItem('productsFirst', JSON.stringify(data)) : [];
    productSliderFunc();
}

firstProdutData();
//!<-- Get Product First data save to localStorage start -->

//!<-- Get Product First data save to localStorage start -->
async function secondProductData() {
    const requestSecondData = await fetch('./js/productDataTwo.json')
    const data = await requestSecondData.json();
    data ? localStorage.setItem('productsSecond', JSON.stringify(data)) : [];
    productSliderFunc();
}

secondProductData();
//!<-- Get Product First data save to localStorage end -->

//!<-- Get Blog data save to localStorage start -->
async function allBlogData() {
    const requestBlogData = await fetch('./js/json/blog.json');
    const data = await requestBlogData.json();
    
    if(data) {
        data ? localStorage.setItem('blogs', JSON.stringify(data)) : [];
        displayBlogs(data);
    }
};

allBlogData()
//!<-- Get Blog data save to localStorage end -->

//!<-- Get Blog data save to localStorage start -->
async function allBlogsData() {
    const requestBlogData = await fetch('./js/blog.json');
    const data = await requestBlogData.json();
    data ? localStorage.setItem('blogs', JSON.stringify(data)) : [];
    displayAllBlogs(data);    
}

allBlogsData()
//!<-- Get Blog data save to localStorage end -->

//!<-- Make a request to Categories start -->
async function categories() {
    const requestCategories = await fetch('./js/categories.json');
    const data = await requestCategories.json();
    data ? localStorage.setItem('categories', JSON.stringify(data)) : [];
    displayFocusCategory(data)
    displayFocusCategorySeason(data)
    displayFocusCategoryOffer(data)
}

categories();

//!<-- Make a request to Categories end -->

const cartCount = document.querySelector<HTMLSpanElement>('.cart-count');

cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";

//!Modal dialog start
const modalCloseBtn = document.querySelector<HTMLButtonElement>('.popup-close');
const popupParentHTML = document.querySelector<HTMLDivElement>('.popup-dialog');
const modalInput = document.getElementById('modalInput') as HTMLInputElement;
const popupCheckbox = document.getElementById('popupCheckbox') as HTMLInputElement;

setTimeout(() => {
    popupParentHTML.classList.add('show');
}, 10000);

modalCloseBtn.addEventListener('click', () => {
    popupParentHTML.classList.remove('show');
})

document.addEventListener('click', () => {
    popupParentHTML.classList.remove('show');
});

document.querySelector<HTMLDivElement>('.popup-container').addEventListener('click', (e) => e.stopPropagation());

document.querySelector<HTMLFormElement>('.popup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(!emailRegex.test(modalInput.value)) {
        const div = modalInput.nextElementSibling;
        modalInput.className = 'form-control is-invalid'
        div.textContent = 'Lütfen geçerli bir e-posta adresi girin.'
        div.className = 'invalid-feedback text-start'
    } else {
        modalInput.className = 'form-control is-valid'
        modalInput.nextElementSibling.textContent = ''
        popupParentHTML.classList.remove('show');
        document.querySelector('.set-global-message').classList.add('active');
        document.querySelector('.set-global-message p').textContent = 'Aboneliğiniz Alınmıştır.'

        setTimeout(() => {
            document.querySelector('.set-global-message').classList.remove('active');
        }, 3000);
    }

    // popupCheckbox.addEventListener('change', (e) => {
    //     const target = e.target as HTMLInputElement;
    //     const checked = target.checked;
    
    //     if(checked) {
    //         console.log('check');
    //     } else {
    //         console.log('not check');
    //     }
    // })
});

//!Modal dialog end
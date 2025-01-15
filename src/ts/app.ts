import {userData} from "./components/userData.js";
userData()

import header from "./components/header.js";
header

import { checkSubscribe } from "./components/footer.js";
checkSubscribe();

import productsGroup from "./product.js";
import { searchFunc } from "./search-modal.js";

import { displayBlogs } from "./main-blogs.js";
import { displayAllBlogs } from "./main-blogs.js";
import { displayFocusCategory, displayFocusCategorySeason, displayFocusCategoryOffer } from "./components/slider-orientation.js";

//!<-- Get All Product save to localStorage start -->
async function productData() {
    try {
        const requestData = await fetch("./data/json/productData.json")
        if(!requestData.ok) {
            throw new Error('Veriler yüklenemedi lütfen sayfayı tekrar yükleyin')
        }
        const data = await requestData.json();
        
        if(data) {
            localStorage.setItem('products', JSON.stringify(data))
            searchFunc(data)
            productsGroup();
        }
    } catch(err) {
        const messageElement = document.querySelector('.set-global-message')
        if(messageElement) {
            messageElement.classList.add('active');
            messageElement.querySelector('p span').textContent = err.message;
        }
    }
}

productData(); 
//!<-- Get All Product save to localStorage end -->

//!<-- Get Blog data save to localStorage start -->
async function allBlogData() {
    const requestBlogData = await fetch('./data/json/blog.json');
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
    const requestBlogData = await fetch('./data/json/blog.json');
    const data = await requestBlogData.json();
    data ? localStorage.setItem('blogs', JSON.stringify(data)) : [];
    displayAllBlogs(data);    
}

allBlogsData()
//!<-- Get Blog data save to localStorage end -->

//!<-- Make a request to Categories start -->
async function categories() {
    const requestCategories = await fetch('./data/json/categories.json');
    const data = await requestCategories.json();
    data ? localStorage.setItem('categories', JSON.stringify(data)) : [];
    displayFocusCategory(data)
    displayFocusCategorySeason(data)
    displayFocusCategoryOffer(data)
}

categories();
//!<-- Make a request to Categories end -->

const cartCountNum = document.querySelector('.cart-count');
cartCountNum.textContent = JSON.parse(localStorage.getItem('cart')).length

//!Modal dialog start
const modalCloseBtn = document?.querySelector<HTMLButtonElement>('.popup-close');
const popupParentHTML = document?.querySelector<HTMLDivElement>('.popup-dialog');
const modalInput = document?.getElementById('modalInput') as HTMLInputElement;

const modalDialog = (): void => {
    setTimeout(() => {
        popupParentHTML?.classList.add('show');
    }, 10000);
    
    modalCloseBtn?.addEventListener('click', () => {
        popupParentHTML?.classList.remove('show');
    })
    
    document?.addEventListener('click', () => {
        popupParentHTML?.classList.remove('show');
    });
    
    document?.querySelector<HTMLDivElement>('.popup-container')?.addEventListener('click', (e) => e.stopPropagation());
    
    document?.querySelector<HTMLFormElement>('.popup-form')?.addEventListener('submit', (e) => {
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
    });
}

modalDialog();
//!Modal dialog end
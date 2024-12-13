var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userData } from "./components/userData.js";
userData();
import header from "./components/header.js";
header;
import { checkSubscribe } from "./components/footer.js";
checkSubscribe();
import productsGroup from "./product.js";
import { searchFunc } from "./search-modal.js";
import { displayBlogs } from "./main-blogs.js";
import { displayAllBlogs } from "./main-blogs.js";
import { displayFocusCategory, displayFocusCategorySeason, displayFocusCategoryOffer } from "./components/slider-orientation.js";
//!<-- Get All Product save to localStorage start -->
function productData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestData = yield fetch("./data/json/productData.json");
            if (!requestData.ok) {
                throw new Error('Veriler yüklenemedi lütfen sayfayı tekrar yükleyin');
            }
            const data = yield requestData.json();
            if (data) {
                localStorage.setItem('products', JSON.stringify(data));
                searchFunc(data);
                productsGroup();
            }
        }
        catch (err) {
            const messageElement = document.querySelector('.set-global-message');
            if (messageElement) {
                messageElement.classList.add('active');
                messageElement.querySelector('p span').textContent = err.message;
            }
        }
    });
}
productData();
//!<-- Get All Product save to localStorage end -->
//!<-- Get Blog data save to localStorage start -->
function allBlogData() {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBlogData = yield fetch('./data/json/blog.json');
        const data = yield requestBlogData.json();
        if (data) {
            data ? localStorage.setItem('blogs', JSON.stringify(data)) : [];
            displayBlogs(data);
        }
    });
}
;
allBlogData();
//!<-- Get Blog data save to localStorage end -->
//!<-- Get Blog data save to localStorage start -->
function allBlogsData() {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBlogData = yield fetch('./data/json/blog.json');
        const data = yield requestBlogData.json();
        data ? localStorage.setItem('blogs', JSON.stringify(data)) : [];
        displayAllBlogs(data);
    });
}
allBlogsData();
//!<-- Get Blog data save to localStorage end -->
//!<-- Make a request to Categories start -->
function categories() {
    return __awaiter(this, void 0, void 0, function* () {
        const requestCategories = yield fetch('./data/json/categories.json');
        const data = yield requestCategories.json();
        data ? localStorage.setItem('categories', JSON.stringify(data)) : [];
        displayFocusCategory(data);
        displayFocusCategorySeason(data);
        displayFocusCategoryOffer(data);
    });
}
categories();
//!<-- Make a request to Categories end -->
//!Modal dialog start
const modalCloseBtn = document === null || document === void 0 ? void 0 : document.querySelector('.popup-close');
const popupParentHTML = document === null || document === void 0 ? void 0 : document.querySelector('.popup-dialog');
const modalInput = document === null || document === void 0 ? void 0 : document.getElementById('modalInput');
const modalDialog = () => {
    var _a, _b;
    setTimeout(() => {
        popupParentHTML === null || popupParentHTML === void 0 ? void 0 : popupParentHTML.classList.add('show');
    }, 10000);
    modalCloseBtn === null || modalCloseBtn === void 0 ? void 0 : modalCloseBtn.addEventListener('click', () => {
        popupParentHTML === null || popupParentHTML === void 0 ? void 0 : popupParentHTML.classList.remove('show');
    });
    document === null || document === void 0 ? void 0 : document.addEventListener('click', () => {
        popupParentHTML === null || popupParentHTML === void 0 ? void 0 : popupParentHTML.classList.remove('show');
    });
    (_a = document === null || document === void 0 ? void 0 : document.querySelector('.popup-container')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => e.stopPropagation());
    (_b = document === null || document === void 0 ? void 0 : document.querySelector('.popup-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(modalInput.value)) {
            const div = modalInput.nextElementSibling;
            modalInput.className = 'form-control is-invalid';
            div.textContent = 'Lütfen geçerli bir e-posta adresi girin.';
            div.className = 'invalid-feedback text-start';
        }
        else {
            modalInput.className = 'form-control is-valid';
            modalInput.nextElementSibling.textContent = '';
            popupParentHTML.classList.remove('show');
            document.querySelector('.set-global-message').classList.add('active');
            document.querySelector('.set-global-message p').textContent = 'Aboneliğiniz Alınmıştır.';
            setTimeout(() => {
                document.querySelector('.set-global-message').classList.remove('active');
            }, 3000);
        }
    });
};
modalDialog();
//!Modal dialog end

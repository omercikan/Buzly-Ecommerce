//!Product detail page color set active class add
const variationItems = document.querySelectorAll('.variation-item');
variationItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.variation-item.active').classList.remove('active');
        item.classList.add('active');
    });
});
//!Product detail page product size set active class add
const sizesList = document.querySelectorAll('.sizes-list span');
sizesList.forEach(size => {
    size.addEventListener('click', () => {
        document.querySelector('.sizes-list span.active').classList.remove('active');
        size.classList.add('active');
    });
});
//!Product heart mode
const productHeart = document.getElementById('productHeart');
const getLikesProduct = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : [];
const activeProduct = JSON.parse(localStorage.getItem('showProduct'));
// let likes: any = localStorage.getItem('likes');
// likes = likes ? JSON.parse(likes) : [];
// if (!Array.isArray(likes)) {
//     likes = [];
// }
productHeart.addEventListener('click', () => {
    if (productHeart.classList.contains('bi-heart')) {
        productHeart.className = 'bi bi-heart-fill active';
        getLikesProduct.push(activeProduct);
        localStorage.setItem('likes', JSON.stringify(getLikesProduct));
    }
    else {
        productHeart.className = 'bi bi-heart';
        const index = getLikesProduct.findIndex((product) => product.id === activeProduct.id);
        if (index > -1) {
            getLikesProduct.splice(index, 1);
            localStorage.setItem('likes', JSON.stringify(getLikesProduct));
        }
    }
});
const findFavoriteProduct = getLikesProduct.find((product) => product.id === activeProduct.id);
if (findFavoriteProduct) {
    productHeart.className = 'bi bi-heart-fill active';
}
//!Product size cart events
const sizeCartBtn = document.getElementById('sizeCart');
const sizeCartContainer = document.querySelector('.size-cart-container');
sizeCartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sizeCartContainer.classList.add('active');
    document.querySelector('body').style.overflow = 'hidden';
});
document.getElementById('closeCart').addEventListener('click', () => {
    sizeCartContainer.classList.remove('active');
    document.querySelector('body').style.overflow = 'visible';
});
window.addEventListener('click', () => {
    sizeCartContainer.classList.remove('active');
    document.querySelector('body').style.overflow = 'visible';
});
sizeCartContainer.querySelector('.size-cart-wrapper').addEventListener('click', (e) => e.stopPropagation());
//# sourceMappingURL=product-detail.js.map
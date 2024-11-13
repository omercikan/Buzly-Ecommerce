const activeCategory = localStorage.getItem('showCategory') ? JSON.parse(localStorage.getItem('showCategory')) : [];
const categoryProductsList = document.getElementById('categoryProductsList');
const params = new URLSearchParams(window.location.search);
const categoryName = params.get('category');
document.querySelector('.category-heading h2').innerHTML = categoryName;
let cart = [];
cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const addToCart = () => {
    const cartBtn = document.querySelectorAll('.add-to-cart');
    Array.from(cartBtn).map((button) => {
        const cartCount = document.querySelector('.cart-count');
        const inCart = cart.find((product) => product.id === Number(button.dataset.id));
        if (inCart) {
            button.setAttribute("disabled", "disabled");
        }
        else {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const findProduct = activeCategory.find((product) => product.id === Number(id));
                if (findProduct) {
                    cart.push(Object.assign(Object.assign({}, findProduct), { amount: 1 }));
                    localStorage.setItem('cart', JSON.stringify(cart));
                    button.setAttribute("disabled", "disabled");
                    cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : '0';
                }
            });
        }
    });
};
let likes = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : [];
const addToLikes = () => {
    const allHeartBtn = document.querySelectorAll('.add-to-likes');
    allHeartBtn.forEach((heart) => {
        const heartIcon = heart.querySelector('i');
        const id = heart.getAttribute("data-id");
        if (likes.some((product) => product.id === Number(id))) {
            heartIcon.className = 'bi bi-heart-fill active';
        }
        heart.addEventListener('click', () => {
            const id = heart.getAttribute("data-id");
            const findProduct = activeCategory.find((product) => product.id === Number(id));
            if (findProduct) {
                const productIndex = likes.findIndex((index) => index.id === Number(id));
                if (productIndex > -1) {
                    likes.splice(productIndex, 1);
                    heartIcon.className = 'bi bi-heart';
                }
                else {
                    likes.push(findProduct);
                    heartIcon.className = 'bi bi-heart-fill active';
                }
                localStorage.setItem('likes', JSON.stringify(likes));
            }
        });
    });
};
let showProduct = localStorage.getItem('showProduct') ? JSON.parse(localStorage.getItem('showProduct')) : [];
const showProductDetail = () => {
    const detailButton = document.querySelectorAll('.product-detail');
    detailButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute("data-id");
            const findProduct = activeCategory.find((product) => product.id === Number(id));
            if (findProduct) {
                localStorage.setItem('showProduct', JSON.stringify(findProduct));
                window.location.href = 'product-detail.html';
            }
        });
    });
};
const showCategory = () => {
    let categoryHTML = '';
    activeCategory.forEach((item) => {
        categoryHTML += `
            <li class="category-product-item">
                <div class="product-discount">
                    <span>-${item.discount}%</span> 
                </div> 
            
                <div class="product-img">
                    <a href="#" class='product-detail' data-id="${item.id}">
                    <img src="${item.img.mainImage}" alt="${item.name}" class="product-img-one">
                    <img src="${item.img.thumbs[1]}" alt="${item.name}" class="product-img-two">
                    </a> 
                </div>  
            
                <div class="product-details text-center">
                    <a href="#" class='product-detail' data-id="${item.id}">${item.name}</a>
                    <ul>
                    <li>
                        <strong>${item.vote}</strong>
                    </li>
            
                    <li>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-half"></i>
                    </li>
            
                    <li>
                        <strong>(${item.evaluation})</strong>
                    </li>
                    </ul>
            
                    <div class="product-price">
                    <strong>${item.price.newPrice} TL</strong>
                    <span>${item.price.oldPrice} TL</span>
                    </div>
                </div>
            
                <div class="product-links">
                    <button type="button" class="add-to-cart" data-id="${item.id}">
                        <i class="bi bi-basket"></i>
                    </button>
            
                    <button type="button" id="productHeartBtn" class="add-to-likes" data-id="${item.id}">
                        <i class="bi bi-heart"></i>
                    </button>
            
                    <button href="#" class="product-detail" data-id="${item.id}">
                        <i class="bi bi-eye-fill"></i>
                    </button>
            
                    <a href="#" id="productShareBtn">
                        <i class="bi bi-share-fill"></i>
                    </a>
                </div>
            </li>
        `;
    });
    categoryProductsList.innerHTML = categoryHTML;
    addToCart();
    addToLikes();
    showProductDetail();
};
showCategory();
//# sourceMappingURL=showCategory.js.map
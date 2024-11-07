let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
function displayProduct() {
    let cartProductHtml = '';
    const productListContainer = document.getElementById('productListContainer');
    cart.forEach((element) => {
        cartProductHtml += `
            <tr data-id="${element.id}">
                <td class="table-thumbnail">
                    <i class="bi bi-x delete-cart" data-id="${element.id}"></i>
                    <img src="${element.img.mainImage}" alt="product polo tshirt" data-id="${element.id}" class="goTo_Product">
                </td>  

                <td data-id="${element.id}" class="goTo_Product">${element.name}</td>
                <td class='productPrice'>${element.price.newPrice} TL</td>
                <td class="count-product">
                    <div class="counter-wrapper">
                        <button type="button" id="productDownBtn"><i class="bi bi-dash"></i></button>
                        <input type="number" pattern="[0-9]" min="1" max="10" value="${element.amount}" aria-label="Ürün adedi" class="productCountInput">
                        <button id="productUpBtn"><i class="bi bi-plus"></i></button>
                    </div>
                </td> 
    
                <td class="price">${(element.price.newPrice * element.amount).toFixed(2)} TL</td>
            </tr>
        `;
    });
    productListContainer.innerHTML = cartProductHtml;
    deleteCart();
    goToProduct();
}
const goToProduct = () => {
    const targetItems = document.querySelectorAll('.goTo_Product');
    targetItems.forEach((item) => {
        item.addEventListener('click', () => {
            const id = item.getAttribute("data-id");
            const findProduct = cart.find((product) => product.id === Number(id));
            if (findProduct) {
                localStorage.setItem('showProduct', JSON.stringify(findProduct));
                window.location.href = 'product-detail.html';
            }
            ;
        });
    });
};
const deleteCart = () => {
    const deleteCartButtons = document.querySelectorAll('.delete-cart');
    const cartCount = document.querySelector('.cart-count');
    deleteCartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const target = e.target;
            const id = target.dataset.id;
            cart = cart.filter((item) => item.id !== Number(id));
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";
            displayProduct();
            calculateCart();
        });
    });
};
export const calculateCart = () => {
    const totalPrice = document.getElementById('totalPrice');
    const productTotal = document.getElementById('productTotal');
    const cargoCheckbox = document.getElementById('cargoCheckbox');
    const fastCargo = 15;
    let itemsTotal = 0;
    cart.length > 0 && cart.reduce((acc, currentPrice) => itemsTotal += (acc = currentPrice.price.newPrice * currentPrice.amount), 0);
    productTotal.innerHTML = `${itemsTotal.toFixed(2)} TL`;
    totalPrice.innerHTML = `${itemsTotal.toFixed(2)} TL`;
    cargoCheckbox.addEventListener('change', (e) => {
        const target = e.target;
        const checked = target.checked;
        if (checked) {
            totalPrice.innerHTML = `${(itemsTotal + fastCargo).toFixed(2)} TL`;
        }
        else {
            totalPrice.innerHTML = `${itemsTotal.toFixed(2)} TL`;
        }
    });
};
displayProduct();
calculateCart();
//# sourceMappingURL=cartOperations.js.map
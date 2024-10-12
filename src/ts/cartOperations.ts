let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

function displayProduct() {
    let cartProductHtml: string = '';
    const productListContainer = document.getElementById('productListContainer') as HTMLTableSectionElement;

    cart.forEach(element => {
        cartProductHtml += `
            <tr data-id="${element.id}">
                <td class="table-thumbnail">
                <i class="bi bi-x delete-cart" data-id="${element.id}"></i>
                <img src="${element.img.mainImage}" alt="product polo tshirt">
                </td>  
                <td>${element.name}</td>
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
}

const deleteCart = () => {
    const deleteCartButtons = document.querySelectorAll<HTMLElement>('.delete-cart');
    const cartCount = document.querySelector<HTMLSpanElement>('.cart-count');
    const basketTableContainer = document.querySelector<HTMLDivElement>('.basket-table-container');

    deleteCartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const id = target.dataset.id
            cart = cart.filter((item) => item.id !== Number(id)) 
            localStorage.setItem('cart', JSON.stringify(cart));
            cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";

            // if(JSON.parse(localStorage.getItem('cart')).length <= 0) {
            //     basketTableContainer.innerHTML = '<p class="text-center fw-bolder">Sepetinizde hiç ürün yok.</p>'
            // }

            displayProduct();
            calculateCart();
        });
    });
};

export const calculateCart = () => {
    const totalPrice = document.getElementById('totalPrice') as HTMLSpanElement;
    const productTotal = document.getElementById('productTotal') as HTMLSpanElement;
    const cargoCheckbox = document.getElementById('cargoCheckbox') as HTMLInputElement;
    const fastCargo = 15;
    let itemsTotal = 0;

    cart.length > 0 && cart.map((item) => (itemsTotal +=  item.price.newPrice * item.amount));

    productTotal.innerHTML = `${itemsTotal.toFixed(2)} TL`;  
    totalPrice.innerHTML = `${itemsTotal.toFixed(2)} TL`;

    cargoCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const checked = target.checked;

        if(checked) {
            totalPrice.innerHTML = `${(itemsTotal + fastCargo).toFixed(2)} TL`;
        } else {
            totalPrice.innerHTML = `${itemsTotal.toFixed(2)} TL`
        }
    });
}

displayProduct();
calculateCart()
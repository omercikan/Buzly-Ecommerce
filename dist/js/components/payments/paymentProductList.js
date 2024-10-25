const cardStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const paymentList = document.getElementById('paymentList');
const paymentListText = document.querySelector('.payment-list-title');
let productListHTML = '';
cardStorage.forEach((item) => {
    productListHTML += `
        <li>
            <img src="${item.img.mainImage}" alt="${item.name}" width="87">
            <figcaption>${item.price.newPrice} TL</figcaption>
        </li>
    `;
    paymentList.innerHTML = productListHTML;
});
paymentListText.innerHTML = `Sipariş Özeti (${cardStorage.length})`;
//# sourceMappingURL=paymentProductList.js.map
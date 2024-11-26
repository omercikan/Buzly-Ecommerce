const cardStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const paymentList = document.getElementById('paymentList');
const paymentListText = document.querySelector('.payment-list-title');
const goToProductDetail = () => {
    const paymentImages = document.querySelectorAll('.payment-img');
    paymentImages.forEach((item) => {
        item.addEventListener('click', () => {
            const id = item.getAttribute("data-id");
            const findProduct = cardStorage.find((product) => product.id === Number(id));
            if (findProduct) {
                localStorage.setItem('showProduct', JSON.stringify(findProduct));
                window.location.href = "product-detail.html";
            }
        });
    });
};
let productListHTML = '';
cardStorage.forEach((item) => {
    productListHTML += `
        <li>
            <img src="${item.img.mainImage}" alt="${item.name}" width="87" data-id="${item.id}" class="payment-img">
            <figcaption>${item.price.newPrice} TL</figcaption>
        </li>
    `;
    paymentList.innerHTML = productListHTML;
    goToProductDetail();
});
paymentListText.innerHTML = `Sipariş Özeti (${cardStorage.length})`;

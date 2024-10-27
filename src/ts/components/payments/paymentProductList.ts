const cardStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const paymentList = document.getElementById('paymentList') as HTMLUListElement;
const paymentListText = document.querySelector<HTMLHeadingElement>('.payment-list-title');

const goToProductDetail = () => {
    const paymentImages = document.querySelectorAll('.payment-img');
    paymentImages.forEach((item) => {
        item.addEventListener('click', () => {
            const id = item.getAttribute("data-id");
            const findProduct = cardStorage.find((product) => product.id === Number(id));
            if(findProduct) {
                localStorage.setItem('showProduct', JSON.stringify(findProduct));
                window.location.href = "product-detail.html";
            }
        })
    })
}

let productListHTML: string = '';
cardStorage.forEach((item): undefined => {
    productListHTML+= `
        <li>
            <img src="${item.img.mainImage}" alt="${item.name}" width="87" data-id="${item.id}" class="payment-img">
            <figcaption>${item.price.newPrice} TL</figcaption>
        </li>
    `;

    paymentList.innerHTML = productListHTML;
    goToProductDetail();
});

paymentListText.innerHTML = `Sipariş Özeti (${cardStorage.length})`
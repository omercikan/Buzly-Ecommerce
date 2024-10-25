const cardStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const paymentList = document.getElementById('paymentList') as HTMLUListElement;
const paymentListText = document.querySelector<HTMLHeadingElement>('.payment-list-title');

let productListHTML: string = '';
cardStorage.forEach((item): undefined => {
    productListHTML+= `
        <li>
            <img src="${item.img.mainImage}" alt="${item.name}" width="87">
            <figcaption>${item.price.newPrice} TL</figcaption>
        </li>
    `;

    paymentList.innerHTML = productListHTML;
});

paymentListText.innerHTML = `Sipariş Özeti (${cardStorage.length})`
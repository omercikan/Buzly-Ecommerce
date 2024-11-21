//!Access storage basket data !//
const storageTotalPrice = JSON.parse(localStorage.getItem('cart')) || [];
//!Access storage basket data !//

//!Total price, discount, cargo, high discount, numbers !//
let totalPrice: number = 0;
let discount_threshold: number = 300;
let discountAmount: number = discount_threshold - 0.10;
let cargoPrice: number = 49.90;
let high_discount = 1000;
//!Total price, discount, cargo, high discount, numbers !//

//!Payment cargo price figures !//
const updateTotalPrice = (): void => {
    totalPrice = storageTotalPrice.reduce((acc, item) => acc + item.price.newPrice, 0)
    document.getElementById('paymentPrice').innerText = `${totalPrice.toFixed(2)} TL`;
    document.getElementById('paymentAllPrice').innerText = `${totalPrice.toFixed(2)} TL`;
    document.getElementById('paymentCargoPrice').innerText = `${cargoPrice.toFixed(2)} TL`;
}

updateTotalPrice()
//!Payment cargo price figures !//

//!Payment cargo state content !//
if(totalPrice > discount_threshold) {
    const discountPrice: number = totalPrice - cargoPrice;
    document.getElementById('paymentAllPrice').innerText = `${discountPrice.toFixed(2)} TL`;
    document.querySelector<HTMLLIElement>('.summary-cargo-field').style.display = 'block'
    document.querySelector<HTMLLIElement>('.summary-cargo-area').style.display = 'block'
}
//!Payment cargo state content !//

//!Calculate high discount and show content !//
if(totalPrice > high_discount) {
    const earningPrice: HTMLSpanElement = document.getElementById('earningPrice')
    const totalDiscount: number = (discountAmount - cargoPrice);
    
    earningPrice.innerText = `${totalDiscount.toFixed(2)} TL`
    document.querySelector<HTMLLIElement>('.summary-discount-field').style.display = 'block';
    document.getElementById('paymentAllPrice').innerText = `${((totalPrice - totalDiscount) - (cargoPrice)).toFixed(2)} TL`;
}
//!Calculate high discount and show content !//
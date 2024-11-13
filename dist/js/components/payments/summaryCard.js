const storageTotalPrice = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let totalPrice = 0;
let discountCargo = 49.90;
let discountAmount = 250 - 0.10;
storageTotalPrice.map((item) => (totalPrice) += (item.price.newPrice));
document.getElementById('paymentPrice').innerText = `${totalPrice.toFixed(2)} TL`;
document.getElementById('paymentAllPrice').innerText = `${totalPrice.toFixed(2)} TL`;
document.getElementById('paymentCargoPrice').innerText = `${discountCargo.toFixed(2)} TL`;
if (totalPrice > 300) {
    const discountPrice = totalPrice - discountCargo;
    document.getElementById('paymentAllPrice').innerText = `${discountPrice.toFixed(2)} TL`;
    document.querySelector('.summary-cargo-field').style.display = 'block';
    document.querySelector('.summary-cargo-area').style.display = 'block';
}
if (totalPrice > 1000) {
    const earningPrice = document.getElementById('earningPrice');
    // const totalDiscount = (discountAmount - discountCargo) (parseFloat(earningPrice.innerText))
    const totalDiscount = (discountAmount - discountCargo);
    earningPrice.innerText = `${totalDiscount.toFixed(2)} TL`;
    document.querySelector('.summary-discount-field').style.display = 'block';
    document.getElementById('paymentAllPrice').innerText = `${((totalPrice - totalDiscount) - (discountCargo)).toFixed(2)} TL`;
}
const cardItem = document.querySelectorAll('.card-lists li');
cardItem.forEach((card) => {
    card.addEventListener('click', () => {
        cardItem.forEach((item) => item.classList.remove('active'));
        card.classList.add('active');
    });
});
const paymentForm = document.getElementById('paymentForm');
const paymentInputs = document.querySelectorAll('.payment-input');
const confirmPaymentButton = document.getElementById('confirmPaymentButton');
paymentForm.addEventListener('input', (e) => {
    e.preventDefault();
    checkPaymentInput(paymentInputs);
});
const checkPaymentInput = (paymentInputs) => {
    let allFilled = true;
    paymentInputs.forEach((input) => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });
    if (allFilled) {
        confirmPaymentButton.classList.remove('disabled-button');
    }
    else {
        confirmPaymentButton.classList.add('disabled-button');
    }
};
const warning = document.querySelector('.warning-container');
confirmPaymentButton.addEventListener('click', () => {
    if (confirmPaymentButton.classList.contains('disabled-button')) {
        warning.classList.add('error');
    }
    if (warning.classList.contains('error')) {
        setTimeout(() => {
            warning.classList.remove('error');
        }, 5000);
    }
});
document.querySelector('#closeWarning').addEventListener('click', () => {
    warning.classList.remove('error');
});
setTimeout(() => {
    document.querySelector('.warning-container').classList.remove('error');
}, 6000);
document.querySelector('#cvvInput').addEventListener('input', (e) => {
    const target = e.target;
    if (target.value.length > 4) {
        target.value = target.value.slice(0, 4);
    }
});
//# sourceMappingURL=summaryCard.js.map
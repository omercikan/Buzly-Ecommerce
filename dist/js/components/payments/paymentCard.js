//!Select credit card !//
const cardItem = document.querySelectorAll('.card-lists li');
cardItem.forEach((card) => {
    card.addEventListener('click', () => {
        cardItem.forEach((item) => item.classList.remove('active'));
        card.classList.add('active');
    });
});
//!Select credit card !//
//!Payment form validate start !//
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
//!Payment form validate end !//
//!Show warning message !//
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
//!Show warning message !//
//!Cvv input max length limit !//
document.querySelector('#cvvInput').addEventListener('input', (e) => {
    const target = e.target;
    if (target.value.length > 4) {
        target.value = target.value.slice(0, 4);
    }
});
//!Cvv input max length limit !//

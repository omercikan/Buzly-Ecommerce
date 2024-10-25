const storageTotalPrice = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
let totalPrice: number = 0;
let discountCargo: number = 49.90;
let discountAmount: number = 500;

storageTotalPrice.map((item) => (totalPrice) += (item.price.newPrice));
document.getElementById('paymentPrice').innerText = `${totalPrice.toFixed(2)} TL`;
document.getElementById('paymentAllPrice').innerText = `${totalPrice.toFixed(2)} TL`;
document.getElementById('paymentCargoPrice').innerText = `${discountCargo.toFixed(2)} TL`;


if(totalPrice > 300) {
    const discountPrice = totalPrice - discountCargo;
    document.getElementById('paymentAllPrice').innerText = `${discountPrice.toFixed(2)} TL`;
    document.querySelector<HTMLLIElement>('.summary-cargo-field').style.display = 'block'
    document.querySelector<HTMLLIElement>('.summary-cargo-area').style.display = 'block'
}

if(totalPrice > 500) {
    const earningPrice = document.getElementById('earningPrice')
    // const totalDiscount = (discountAmount - discountCargo) (parseFloat(earningPrice.innerText))
    const totalDiscount = (discountAmount - discountCargo);
    
    earningPrice.innerText = `${totalDiscount.toFixed(2)} TL`
    document.querySelector<HTMLLIElement>('.summary-discount-field').style.display = 'block';
    document.getElementById('paymentAllPrice').innerText = `${((totalPrice - totalDiscount) - (discountCargo)).toFixed(2)} TL`;
}

const cardItem = document.querySelectorAll<HTMLLIElement>('.card-lists li');
cardItem.forEach((card: HTMLLIElement): undefined => {
    card.addEventListener('click', (): undefined => {
        cardItem.forEach((item: HTMLLIElement): void => item.classList.remove('active'));
        card.classList.add('active')
    })
})

const paymentForm = document.getElementById('paymentForm') as HTMLFormElement;
const paymentInputs = document.querySelectorAll<HTMLInputElement>('.payment-input');
const confirmPaymentButton = document.getElementById('confirmPaymentButton') as HTMLButtonElement;

paymentForm.addEventListener('input', (e) => {
    e.preventDefault();
    checkPaymentInput(paymentInputs);
});

const checkPaymentInput = (paymentInputs: NodeListOf<HTMLInputElement>): undefined => {
    let allFilled: boolean = true;

    paymentInputs.forEach((input: HTMLInputElement): undefined => {
        if(input.value.trim() === '') {
            allFilled = false;
        }
    });

    if(allFilled) {
        confirmPaymentButton.classList.remove('disabled-button');
    } else {
        confirmPaymentButton.classList.add('disabled-button');
    }
} 

const warning = document.querySelector<HTMLDivElement>('.warning-container')
confirmPaymentButton.addEventListener('click', () => {
    if(confirmPaymentButton.classList.contains('disabled-button')) {
        warning.classList.add('error')
    }

    if(warning.classList.contains('error')) {
        setTimeout(() => {
            warning.classList.remove('error')
        }, 5000);
    }
})

document.querySelector<HTMLElement>('#closeWarning').addEventListener('click', () => {
    warning.classList.remove('error')
});

setTimeout(() => {
    document.querySelector<HTMLDivElement>('.warning-container').classList.remove('error')
}, 6000);


document.querySelector<HTMLInputElement>('#cvvInput').addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    
    if(target.value.length > 4) {
        target.value = target.value.slice(0, 4);
    }
})
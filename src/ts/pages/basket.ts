import { calculateCart } from "../cartOperations.js";
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

//!Basket page product list product number up or product number down
const productDownBtn = document.querySelectorAll<HTMLButtonElement>('#productDownBtn');
const productUpBtn = document.querySelectorAll<HTMLButtonElement>('#productUpBtn');

//!Click Down product number
productDownBtn.forEach((down) => {
    down.addEventListener('click', function(): void {
        const productRow = this.closest('tr');
        const productCountInput = productRow.querySelector('.productCountInput') as HTMLInputElement;

        if(productCountInput) {
            let currentValue: number = parseInt(productCountInput.value) || 0;
            if(currentValue > 0) {
                productCountInput.value = (currentValue - 1).toString();
                
                setTimeout(() => {
                    updateSpinner('spinner', 'running', 'active')
                }, 500);
        
                setTimeout(() => {
                    updateSpinner('spinner', 'paused', document.querySelector('.spinner').classList.remove('active'))
                }, 1500);
            } 
        }

        const id: string = productRow.getAttribute("data-id");
        const findProduct = cart.find((product) => product.id === Number(id));
        findProduct.amount = productCountInput.value;
        const price: number = findProduct.price.newPrice;
        const updateAmount: number = Number(findProduct.amount);
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`

        calculateBasket();
        cargoStatus();
    });
});

//!Click Up product number
productUpBtn.forEach((up) => {
    up.addEventListener('click', function(): void {
        const productRow = this.closest('tr');
        const productCountInput = productRow.querySelector('.productCountInput') as HTMLInputElement;
        
        if(productCountInput) {
            let currentValue: number = parseInt(productCountInput.value) || 0;
            if(currentValue < 10) {
                productCountInput.value = (currentValue + 1).toString();
                
                setTimeout(() => {
                    updateSpinner('spinner', 'running', 'active');
                }, 500);
                
                setTimeout(() => {
                    updateSpinner('spinner', 'paused', document.querySelector('.spinner').classList.remove('active'));
                }, 1500);
            }

        }

        const id: string = productRow.getAttribute("data-id");
        const findProduct = cart.find((product) => product.id === Number(id));
        findProduct.amount = productCountInput.value;
        const price: number = findProduct.price.newPrice;
        const updateAmount: number = Number(findProduct.amount);
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`

        calculateBasket();
        cargoStatus();
    });
});

const calculateBasket = (): void => {
    let fastCargo: number = 15;
    let totalPrice: number = 0;
    cart.reduce((acc, currentPrice) => totalPrice += (acc = currentPrice.price.newPrice * currentPrice.amount) , 0);

    const productTotal = document.getElementById('productTotal') as HTMLSpanElement;
    const totalProductPrice = document.getElementById('totalPrice') as HTMLSpanElement;
    const cargoCheckbox = document.getElementById('cargoCheckbox') as HTMLInputElement;

    productTotal.innerHTML = `${totalPrice.toFixed(2)} TL`
    totalProductPrice.innerHTML = `${totalPrice.toFixed(2)} TL`

    cargoCheckbox.addEventListener('change', (e: Event): void => {
        const target = e.target as HTMLInputElement;
        const checked = target.checked;

        if(checked) {
            totalProductPrice.innerHTML = `${(totalPrice + fastCargo).toFixed(2)} TL`;
        } else {
            totalProductPrice.innerHTML = `${(totalPrice).toFixed(2)} TL`
        }
    })
};

const updateSpinner = (item: string, animationState: string, remove): void => {
    document.querySelector<HTMLDivElement>(`.${item}`);
    document.querySelector<HTMLDivElement>(`.${item} .load`).style.animationPlayState = animationState;
    document.querySelector(`.${item}`).classList.add(remove)
};

//!do not allow if the number is greater than ten
const productCountInput = document.querySelectorAll<HTMLInputElement>('.productCountInput')
productCountInput.forEach((input) => {
    input.addEventListener('input', () => {
        const productRow = input.closest('tr');
        const productCountInput = productRow.querySelector('.productCountInput') as HTMLInputElement;
        let currentValue: string = input.value
        
        if(parseInt(currentValue) > 10) {
            input.value = '10';
            currentValue = input.value
        }

        if(currentValue.length > 1 && currentValue.startsWith('0')) {
            input.value = currentValue.substring(1)
        }

        setTimeout(() => {
            updateSpinner('spinner', 'running', 'active')
        }, 500);

        setTimeout(() => {
            updateSpinner('spinner', 'paused', document.querySelector('.spinner').classList.remove('active'))
        }, 1500);

        const id: string = productRow.getAttribute("data-id");
        const findProduct = cart.find((product) => product.id === Number(id));
        findProduct.amount = productCountInput.value;
        const price = findProduct.price.newPrice;
        const updateAmount = Number(findProduct.amount);
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`

        calculateBasket();
    });
})

//!Coupon check events
const couponCodeInput = document.getElementById('couponCodeInput') as HTMLInputElement;
const applyCouponBtn = document.getElementById('applyCouponBtn') as HTMLInputElement;

const successCode = (input: HTMLInputElement, message: string): void => {
    input.className = 'form-control is-valid'
    input.closest('div').querySelector('.coupon-message').textContent = message;
};

const errorCode = (input: HTMLInputElement, message: string): void => {
    input.className = 'form-control is-invalid'
    input.closest('div').querySelector('.coupon-message').textContent = message;
}

applyCouponBtn.addEventListener('click', (): void => {
    if(couponCodeInput.value === 'omercikan') {
        successCode(couponCodeInput, '');
        const totalPrice = document.getElementById('totalPrice');
        let currentPrice = parseInt(totalPrice.textContent);
        let discount: number = 0.10;

        let discountPrice: number = currentPrice - (currentPrice * discount);
        totalPrice.textContent = `${discountPrice} TL`
    } else if(couponCodeInput.value === '') {
        errorCode(couponCodeInput, 'Bu alan boş bırakılamaz.');
    } else {
        errorCode(couponCodeInput, 'Geçersiz kod!');
    }
});

const cartCount = document.querySelector<HTMLSpanElement>('.cart-count');

cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";

const cargoStatus = (): void => {
    const totalProductPrice = document.getElementById('totalPrice') as HTMLSpanElement;
    const totalPrice = parseInt(totalProductPrice.innerText) || 0;

    if(totalPrice >= 300) {
        document.querySelector<HTMLParagraphElement>('.free-progress-text').innerHTML = '<i class="bi bi-box-seam text-success"></i> <span class="ms-1">Kargo Bedava!</span>'
        document.querySelector<HTMLDivElement>('.free-progress-bar__inner').style.width = '100%';
        document.querySelector<HTMLLIElement>('.discount-summary').style.display = 'flex';
        const totalPrice = document.getElementById('totalPrice') as HTMLSpanElement;
        const numberTotalPrice = parseInt(totalPrice.innerText);
        totalPrice.innerHTML = `${(numberTotalPrice - 49.9).toFixed(2)} TL`
    } else if(totalPrice === 0) {
        document.querySelector<HTMLParagraphElement>('.free-progress-text').innerHTML = '<i class="bi bi-basket3"></i> Sepetiniz boş görünüyor! Favori ürünlerinizi ekleyin ve alışveriş keyfini hemen yaşayın!'
        document.querySelector<HTMLDivElement>('.free-progress-bar__inner').style.width = '0%';
    } else {
        document.querySelector<HTMLLIElement>('.discount-summary').style.display = 'none';
        document.querySelector<HTMLParagraphElement>('.free-progress-text').innerHTML = `<i class="bi bi-box-seam"></i> Kargonuzun bedava olması için <strong>${300 - totalPrice} TL</strong> daha ürün ekleyin`
        document.querySelector<HTMLDivElement>('.free-progress-bar__inner').style.width = 'calc(100% - 10%)';
    }

}  

cargoStatus();

const confirmBasketBtn = document.getElementById('confirmBasketBtn') as HTMLButtonElement;
const confirmBasketFunc = (): void => {
    if(cart.length > 0) {
        confirmBasketBtn.addEventListener('click', () => {
            window.location.href = 'payment.html'
        })
    }
}

confirmBasketFunc();

document.querySelector<HTMLButtonElement>('#updateBasketButton').addEventListener('click', () => {
    window.location.reload();
})
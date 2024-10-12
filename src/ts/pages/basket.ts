import { calculateCart } from "../cartOperations.js";
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

//!Basket page product list product number up or product number down
const productDownBtn = document.querySelectorAll<HTMLButtonElement>('#productDownBtn');
const productUpBtn = document.querySelectorAll<HTMLButtonElement>('#productUpBtn');

//!Click Down product number
productDownBtn.forEach(down => {
    down.addEventListener('click', function() {
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

        const id = productRow.getAttribute("data-id");
        const findProduct = cart.find((product) => product.id === Number(id));
        findProduct.amount = productCountInput.value;
        const price = findProduct.price.newPrice;
        const updateAmount = Number(findProduct.amount);
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`

        calculateBasket();
    });
});

//!Click Up product number
productUpBtn.forEach(up => {
    up.addEventListener('click', function() {
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

        const id = productRow.getAttribute("data-id");
        const findProduct = cart.find((product) => product.id === Number(id));
        findProduct.amount = productCountInput.value;
        const price = findProduct.price.newPrice;
        const updateAmount = Number(findProduct.amount);
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`

        calculateBasket();
    });
});

const calculateBasket = () => {
    let totalPrice: number = 0;
    cart.map((item) => (totalPrice += item.price.newPrice * item.amount))

    const productTotal = document.getElementById('productTotal') as HTMLSpanElement;
    const totalProductPrice = document.getElementById('totalPrice') as HTMLSpanElement;
    const cargoCheckbox = document.getElementById('cargoCheckbox') as HTMLInputElement;
    let fast = 15;

    productTotal.innerHTML = `${totalPrice.toFixed(2)} TL`
    totalProductPrice.innerHTML = `${totalPrice.toFixed(2)} TL`

    cargoCheckbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const checked = target.checked;

        if(checked) {
            totalProductPrice.innerHTML = `${(totalPrice + fast).toFixed(2)} TL`;
        } else {
            totalProductPrice.innerHTML = `${(totalPrice).toFixed(2)} TL`
        }
    })
};

const updateSpinner = (item: string, animationState: string, remove) => {
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

        const id = productRow.getAttribute("data-id");
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

const successCode = (input: HTMLInputElement, message: string) => {
    input.className = 'form-control is-valid'
    input.closest('div').querySelector('.coupon-message').textContent = message;
};

const errorCode = (input: HTMLInputElement, message: string) => {
    input.className = 'form-control is-invalid'
    input.closest('div').querySelector('.coupon-message').textContent = message;
}

applyCouponBtn.addEventListener('click', () => {
    if(couponCodeInput.value === 'omercikan') {
        successCode(couponCodeInput, '');
        const totalPrice = document.getElementById('totalPrice');
        let currentPrice = parseInt(totalPrice.textContent);
        let discount = 0.10;

        let discountPrice = currentPrice - (currentPrice * discount);
        totalPrice.textContent = `${discountPrice} TL`
    } else if(couponCodeInput.value === '') {
        errorCode(couponCodeInput, 'Bu alan boş bırakılamaz.');
    } else {
        errorCode(couponCodeInput, 'Geçersiz kod!');
    }
});

/*const cargoCheckbox = document.getElementById('cargoCheckbox') as HTMLInputElement;
cargoCheckbox.addEventListener('click', () => {
    const totalPrice = document.getElementById('totalPrice');
    const currentPrice = parseInt(totalPrice.textContent);
    let priceFastCargo = 15;
    if(cargoCheckbox.checked) {
        totalPrice.textContent = `${currentPrice + priceFastCargo} TL`
    } else {
        totalPrice.textContent = `${currentPrice - priceFastCargo} TL`
    }
});*/

const cartCount = document.querySelector<HTMLSpanElement>('.cart-count');

cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";

const cargoStatus = () => {
    const totalProductPrice = document.getElementById('totalPrice') as HTMLSpanElement;
    const totalPrice = parseInt(totalProductPrice.innerText)

    if(totalPrice >= 300) {
        document.querySelector<HTMLParagraphElement>('.free-progress-text').innerHTML = '<i class="bi bi-box-seam text-success"></i> <span class="ms-1">Kargo Bedava!</span>'
        document.querySelector<HTMLDivElement>('.free-progress-bar__inner').style.width = '100%';
        document.querySelector<HTMLLIElement>('.discount-summary').style.display = 'flex';
        const discountSummaryPrice = document.getElementById('discountSummaryPrice') as HTMLSpanElement;
        const discountPrice = parseInt(discountSummaryPrice.innerText)
        const totalPrice = document.getElementById('totalPrice') as HTMLSpanElement;
        const numberTotalPrice = parseInt(totalPrice.innerText);
        totalPrice.innerHTML = `${(numberTotalPrice - 49.9).toFixed(2)} TL`
    } else if(totalPrice === 0) {
        document.querySelector<HTMLParagraphElement>('.free-progress-text').innerHTML = '<i class="bi bi-basket3"></i> Sepetiniz boş görünüyor! Favori ürünlerinizi ekleyin ve alışveriş keyfini hemen yaşayın!'
        document.querySelector<HTMLDivElement>('.free-progress-bar__inner').style.width = '0%';
    } else {
        document.querySelector<HTMLParagraphElement>('.free-progress-text').innerHTML = `<i class="bi bi-box-seam"></i> Kargonuzun bedava olması için <strong>${300 - totalPrice} TL</strong> daha ürün ekleyin`
        document.querySelector<HTMLDivElement>('.free-progress-bar__inner').style.width = 'calc(100% - 10%)';
    }
}  
cargoStatus();
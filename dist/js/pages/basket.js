let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
//!Basket page product list product number up or product number down
const productDownBtn = document.querySelectorAll('#productDownBtn');
const productUpBtn = document.querySelectorAll('#productUpBtn');
//!Click Down product number
productDownBtn.forEach(down => {
    down.addEventListener('click', function () {
        const productRow = this.closest('tr');
        const productCountInput = productRow.querySelector('.productCountInput');
        if (productCountInput) {
            let currentValue = parseInt(productCountInput.value) || 0;
            if (currentValue > 0) {
                productCountInput.value = (currentValue - 1).toString();
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
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`;
        calculateBasket();
    });
});
//!Click Up product number
productUpBtn.forEach(up => {
    up.addEventListener('click', function () {
        const productRow = this.closest('tr');
        const productCountInput = productRow.querySelector('.productCountInput');
        if (productCountInput) {
            let currentValue = parseInt(productCountInput.value) || 0;
            if (currentValue < 10) {
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
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`;
        calculateBasket();
    });
});
const calculateBasket = () => {
    let totalPrice = 0;
    cart.map((item) => (totalPrice += item.price.newPrice * item.amount));
    const productTotal = document.getElementById('productTotal');
    const totalProductPrice = document.getElementById('totalPrice');
    const cargoCheckbox = document.getElementById('cargoCheckbox');
    let fast = 15;
    productTotal.innerHTML = `${totalPrice.toFixed(2)} TL`;
    totalProductPrice.innerHTML = `${totalPrice.toFixed(2)} TL`;
    cargoCheckbox.addEventListener('change', (e) => {
        const target = e.target;
        const checked = target.checked;
        if (checked) {
            totalProductPrice.innerHTML = `${(totalPrice + fast).toFixed(2)} TL`;
        }
        else {
            totalProductPrice.innerHTML = `${(totalPrice).toFixed(2)} TL`;
        }
    });
};
const updateSpinner = (item, animationState, remove) => {
    document.querySelector(`.${item}`);
    document.querySelector(`.${item} .load`).style.animationPlayState = animationState;
    document.querySelector(`.${item}`).classList.add(remove);
};
//!do not allow if the number is greater than ten
const productCountInput = document.querySelectorAll('.productCountInput');
productCountInput.forEach((input) => {
    input.addEventListener('input', () => {
        const productRow = input.closest('tr');
        const productCountInput = productRow.querySelector('.productCountInput');
        let currentValue = input.value;
        if (parseInt(currentValue) > 10) {
            input.value = '10';
            currentValue = input.value;
        }
        if (currentValue.length > 1 && currentValue.startsWith('0')) {
            input.value = currentValue.substring(1);
        }
        setTimeout(() => {
            updateSpinner('spinner', 'running', 'active');
        }, 500);
        setTimeout(() => {
            updateSpinner('spinner', 'paused', document.querySelector('.spinner').classList.remove('active'));
        }, 1500);
        const id = productRow.getAttribute("data-id");
        const findProduct = cart.find((product) => product.id === Number(id));
        findProduct.amount = productCountInput.value;
        const price = findProduct.price.newPrice;
        const updateAmount = Number(findProduct.amount);
        productCountInput.closest('tr').querySelector('.price').innerHTML = `${(price * updateAmount).toFixed(2)} TL`;
        calculateBasket();
    });
});
//!Coupon check events
const couponCodeInput = document.getElementById('couponCodeInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const successCode = (input, message) => {
    input.className = 'form-control is-valid';
    input.closest('div').querySelector('.coupon-message').textContent = message;
};
const errorCode = (input, message) => {
    input.className = 'form-control is-invalid';
    input.closest('div').querySelector('.coupon-message').textContent = message;
};
applyCouponBtn.addEventListener('click', () => {
    if (couponCodeInput.value === 'omercikan') {
        successCode(couponCodeInput, '');
        const totalPrice = document.getElementById('totalPrice');
        let currentPrice = parseInt(totalPrice.textContent);
        let discount = 0.10;
        let discountPrice = currentPrice - (currentPrice * discount);
        totalPrice.textContent = `${discountPrice} TL`;
    }
    else if (couponCodeInput.value === '') {
        errorCode(couponCodeInput, 'Bu alan boş bırakılamaz.');
    }
    else {
        errorCode(couponCodeInput, 'Geçersiz kod!');
    }
});
const cartCount = document.querySelector('.cart-count');
cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";
const cargoStatus = () => {
    const totalProductPrice = document.getElementById('totalPrice');
    const totalPrice = parseInt(totalProductPrice.innerText);
    if (totalPrice >= 300) {
        document.querySelector('.free-progress-text').innerHTML = '<i class="bi bi-box-seam text-success"></i> <span class="ms-1">Kargo Bedava!</span>';
        document.querySelector('.free-progress-bar__inner').style.width = '100%';
        document.querySelector('.discount-summary').style.display = 'flex';
        const discountSummaryPrice = document.getElementById('discountSummaryPrice');
        const discountPrice = parseInt(discountSummaryPrice.innerText);
        const totalPrice = document.getElementById('totalPrice');
        const numberTotalPrice = parseInt(totalPrice.innerText);
        totalPrice.innerHTML = `${(numberTotalPrice - 49.9).toFixed(2)} TL`;
    }
    else if (totalPrice === 0) {
        document.querySelector('.free-progress-text').innerHTML = '<i class="bi bi-basket3"></i> Sepetiniz boş görünüyor! Favori ürünlerinizi ekleyin ve alışveriş keyfini hemen yaşayın!';
        document.querySelector('.free-progress-bar__inner').style.width = '0%';
    }
    else {
        document.querySelector('.free-progress-text').innerHTML = `<i class="bi bi-box-seam"></i> Kargonuzun bedava olması için <strong>${300 - totalPrice} TL</strong> daha ürün ekleyin`;
        document.querySelector('.free-progress-bar__inner').style.width = 'calc(100% - 10%)';
    }
};
cargoStatus();
const confirmBasketBtn = document.getElementById('confirmBasketBtn');
const confirmBasketFunc = () => {
    if (cart.length > 0) {
        confirmBasketBtn.addEventListener('click', () => {
            window.location.href = 'payment.html';
        });
    }
};
confirmBasketFunc();
document.querySelector('#updateBasketButton').addEventListener('click', () => {
    window.location.reload();
});
export {};
//# sourceMappingURL=basket.js.map
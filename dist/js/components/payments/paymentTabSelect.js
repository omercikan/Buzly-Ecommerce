const paymentTabs = document.querySelectorAll('.payment-section div');
paymentTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelector('div.active').classList.remove('active');
        tab.classList.add('active');
        if (document.querySelector('.p-address-tab').classList.contains('active')) {
            document.querySelector('.payment-address-container').classList.add('active');
            document.querySelector('.payment-card-container').classList.remove('active');
        }
        else {
            document.querySelector('.payment-address-container').classList.remove('active');
            document.querySelector('.payment-card-container').classList.add('active');
        }
    });
});
//# sourceMappingURL=paymentTabSelect.js.map
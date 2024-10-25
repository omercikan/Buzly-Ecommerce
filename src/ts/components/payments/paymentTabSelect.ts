const paymentTabs = document.querySelectorAll<HTMLDivElement>('.payment-section div');

paymentTabs.forEach((tab: HTMLDivElement): undefined => {
    tab.addEventListener('click', () => {
        document.querySelector<HTMLDivElement>('div.active').classList.remove('active');
        tab.classList.add('active')

        if(document.querySelector<HTMLDivElement>('.p-address-tab').classList.contains('active')) {
            document.querySelector<HTMLDivElement>('.payment-address-container').classList.add('active')
            document.querySelector<HTMLDivElement>('.payment-card-container').classList.remove('active')
        } else {
            document.querySelector<HTMLDivElement>('.payment-address-container').classList.remove('active')
            document.querySelector<HTMLDivElement>('.payment-card-container').classList.add('active')
        }
    });
});
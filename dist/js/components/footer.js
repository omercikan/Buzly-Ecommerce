export const checkSubscribe = () => {
    //!<-- Home page subscribe form check event -->
    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeInput = document.getElementById('subscribeInput');
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkSubscribe(subscribeInput.value);
    });
    function checkSubscribe(inputValue) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inputValue === '' || !regex.test(inputValue)) {
            subscribeForm.style.animationName = 'error';
            setTimeout(() => {
                subscribeForm.style.animationName = '';
            }, 500);
        }
        else {
            subscribeForm.querySelector('div').classList.add('success');
            subscribeForm.querySelector('button').disabled = true;
            subscribeInput.readOnly = true;
        }
    }
    //!<-- Home page subscribe form check event -->
};
checkSubscribe();
//# sourceMappingURL=footer.js.map
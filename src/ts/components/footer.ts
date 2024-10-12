export const checkSubscribe = () => {
    //!<-- Home page subscribe form check event -->
    const subscribeForm = document.getElementById('subscribeForm') as HTMLFormElement;
    const subscribeInput = document.getElementById('subscribeInput') as HTMLInputElement;

    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkSubscribe(subscribeInput.value);
    });

    function checkSubscribe(inputValue: string) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        if(inputValue === '' || !regex.test(inputValue)) {
            subscribeForm.style.animationName = 'error'
            setTimeout(() => {
                subscribeForm.style.animationName = ''
            }, 500);
        } else {
        subscribeForm.querySelector<HTMLDivElement>('div').classList.add('success');
        subscribeForm.querySelector<HTMLButtonElement>('button').disabled = true;
        subscribeInput.readOnly = true;
        }
    }
    //!<-- Home page subscribe form check event -->
}

checkSubscribe();
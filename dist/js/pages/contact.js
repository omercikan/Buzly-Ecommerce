//!Html Contact page form elements
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');
const successMessage = document.querySelector('.success-message');
const backBtn = document.querySelector('.back-btn');
//!If success false throw the error event
const error = (input) => {
    input.className = 'form-control is-invalid';
};
//!If successful, send success message
const success = (input) => {
    input.className = 'form-control is-valid';
};
//!Check all form inputs
const checkInput = (inputs) => {
    let isStateValid = true;
    inputs.forEach(input => {
        if (input.value === '') {
            error(input);
            isStateValid = false;
        }
        else {
            success(input);
        }
    });
    return isStateValid;
};
//!Submit contact page form event check
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const isInputsValid = checkInput([nameInput, surnameInput, emailInput, messageInput]);
    const isEmailValid = checkEmail(emailInput);
    if (isInputsValid && isEmailValid) {
        contactForm.classList.add('close');
        successMessage.classList.add('active');
    }
    else {
        contactForm.style.display = 'block';
    }
});
//!Email regex details check
const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value)) {
        error(input);
        return false;
    }
    else {
        success(input);
        return true;
    }
};
backBtn.addEventListener('click', () => {
    contactForm.classList.remove('close');
    successMessage.classList.remove('active');
});

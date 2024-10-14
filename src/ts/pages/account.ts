//!Account login or sign up button options event !//
const accountOptions = document.querySelectorAll<HTMLButtonElement>('.account-options button');
accountOptions.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector<HTMLButtonElement>('button.active').classList.remove('active');
        button.classList.add('active');
    }); 
});      
//!Account login or sign up button options event !//

//!Accout page password click show or again click hidden !//
const showPasswordIcon = document.querySelectorAll<HTMLElement>('#showPassword');

const ModeShowPasswords = (variable: HTMLInputElement, type: string, icon: HTMLElement, className: string) => {
    variable.type = type;
    icon.className = className
};

const signUpPasswordIcon = document.querySelector<HTMLElement>('.signUp-password-icon');
signUpPasswordIcon.addEventListener('click', function(): void { 
    const signupPasswordInput = document.getElementById('signupPasswordInput') as HTMLInputElement;
    signupPasswordInput.type === 'password' ? ModeShowPasswords(signupPasswordInput, 'text', signUpPasswordIcon, 'bi bi-eye-slash') : ModeShowPasswords(signupPasswordInput, 'password', signUpPasswordIcon, 'bi bi-eye');  
});

const loginPasswordIcon = document.querySelector<HTMLElement>('.login-password-icon');
loginPasswordIcon.addEventListener('click', function(): void {
    const loginPasswordInput = document.getElementById('loginPasswordInput') as HTMLInputElement;
    loginPasswordInput.type === 'password' ? ModeShowPasswords(loginPasswordInput, 'text', loginPasswordIcon, 'bi bi-eye-slash') : ModeShowPasswords(loginPasswordInput, 'password', loginPasswordIcon, 'bi bi-eye');
});
//!Accout page password click show or again click hidden !//

//!Account page gender option add active-gender class !//
const genderBtnGroup = document.querySelectorAll<HTMLElement>('.gender-btn-group button');
genderBtnGroup.forEach(button => { 
    button.addEventListener('click', function() {
        genderBtnGroup.forEach(activeButton => activeButton.classList.remove('active-gender'));
        button.classList.add('active-gender'); 
    });   
})
//!Account page gender option add active-gender class !// 
  
//!Account page login or sign up mode event !//
const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
const SignUpButton = document.getElementById('SignUpButton') as HTMLButtonElement;
const signupForm = document.getElementById('signupForm') as HTMLFormElement;
const loginForm = document.getElementById('loginForm') as HTMLFormElement;

loginButton.addEventListener('click', () => { 
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

SignUpButton.addEventListener('click', () => {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

const signupPasswordInput = document.getElementById('signupPasswordInput') as HTMLInputElement;
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const signUpNameInput = document.getElementById('signUpNameInput') as HTMLInputElement;
    const signUpEmailInput = document.getElementById('signUpEmailInput') as HTMLInputElement;
    const memberCheckbox = document.getElementById('memberCheckbox') as HTMLInputElement;
    const electronicCheckbox = document.getElementById('electronicCheckbox') as HTMLInputElement;
    const dataCheckbox = document.getElementById('dataCheckbox') as HTMLInputElement;
    const isvalidationForms = checkSignUpForm([signUpNameInput, signUpEmailInput, signupPasswordInput]);
    const isvalidationCheckboxs = checkboxControl([memberCheckbox, electronicCheckbox, dataCheckbox]);
    const isvalidationEmail = checksEmail(signUpEmailInput);
    signupPasswordInput.style.backgroundImage = 'none';

    if(isvalidationForms && isvalidationCheckboxs && isvalidationEmail) { 
        const welcomeMessage = document.querySelector('.set-global-message');
        welcomeMessage.querySelector('p').textContent = `Kayıt işleminiz başarıyla tamamlandı! ${signUpNameInput.value.toLocaleUpperCase()}, Yönlendiriliyorsunuz..`
        welcomeMessage.classList.add('active');

        let count = 5;
        const messageTime = setInterval(() => {
            if(count > 0) {
                count--;
                welcomeMessage.querySelector<HTMLSpanElement>('span').textContent = count.toString();
            } else {
                clearInterval(messageTime);
                const userName = encodeURIComponent(signUpNameInput.value);
                location.href = `index.html?account=${userName}`;
            }
        }, 1000);
    } 
});

const signUpRandomIcon = document.querySelector<HTMLElement>('.signUp-random-icon');
signupPasswordInput.addEventListener('keypress', () => {
    checkPasswordStrong(signupPasswordInput, 0, 7, 12, 20);
    signUpRandomIcon.classList.add('active');

    signUpRandomIcon.addEventListener('click', () => {
        const chatSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/";
        let password = '';
        const passwordLength = 41;
        for(let i = 0; i < passwordLength; i++) {
            const randomPassword = Math.floor(Math.random() * chatSet.length);
            password += chatSet[randomPassword];
        }
        
        signupPasswordInput.value = password
        passwordProgressState(passwordParentBar, passwordStateBar, '0BC15C', 100);
        passwordProgressText(progressText, 'Güçlü Şifre', '0BC15C');
    });
})

function passwordProgressState(variable, which, background, width) {
    variable.style.display = 'block'
    which.style.background = `#${background}`
    which.style.width = `${width}%`
}

function passwordProgressText(display, text: string, color: string) {
    display.style.display = 'block';
    display.textContent = text;
    display.style.color = `#${color}`;
}

const passwordParentBar = document.querySelector<HTMLDivElement>('.progress-bar');
const passwordStateBar = document.querySelector<HTMLDivElement>('.inner-bar');
const progressText = document.getElementById('progressText') as HTMLSpanElement;
const checkPasswordStrong = (signupPasswordInput?: HTMLInputElement, zero?: number, min?: number, middle?: number, max?: number) => {
    if(signupPasswordInput.value.length >= zero) {
        passwordProgressState(passwordParentBar, passwordStateBar, 'BB0000', 0)
        passwordProgressText(progressText, 'Basit Şifre', 'BB0000')
    } if(signupPasswordInput.value.length >= min) {
        passwordProgressState(passwordParentBar, passwordStateBar, 'BB0000', 25);
        passwordProgressText(progressText, 'Zayıf Şifre', 'BB0000')
        if (signupPasswordInput.value.length >= middle) {
            passwordProgressState(passwordParentBar, passwordStateBar, 'D7972C', 50)
            passwordProgressText(progressText, 'Orta Şifre', 'D7972C')
        } if(signupPasswordInput.value.length >= max) {
            passwordProgressState(passwordParentBar, passwordStateBar, '0BC15C', 100)
            passwordProgressText(progressText, 'Güçlü Şifre', '0BC15C')
        }
    } 
};

const errorSignUpEmail = (email: HTMLInputElement) => {
    email.className = 'form-control is-invalid rounded-2 py-2'
};

const successSignUpEmail = (email: HTMLInputElement) => {
    email.className = 'form-control is-valid rounded-2 py-2'
};

const checksEmail = (email: HTMLInputElement): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegex.test(email.value)) {
        errorSignUpEmail(email);
        return false;
    } else {
        successSignUpEmail(email);
        return true
    }
}

//!State if error throw incorrect
const errorForm = (input: HTMLInputElement) => {
    input.className = 'form-control is-invalid rounded-2 py-2';
};

//!State if success throw correct
const successForm = (input: HTMLInputElement) => {
    input.className = 'form-control is-valid rounded-2 py-2'
};

//!Account page form inputs control
const checkSignUpForm = (inputs: HTMLInputElement[]) => {
    let isValid = true;
    inputs.forEach(input => {
        if(input.value === '' || input.checked) {
            errorForm(input);
            isValid = false
        } else {
            successForm(input);
            isValid = true;
        }
    });
    return isValid;
}

//!Checkbox errorr state
const errorCheckbox = (checkbox: HTMLInputElement) => {
    checkbox.style.borderColor = '#dc3545';
}

//!Checkbox success state
const successCheckbox = (checkbox: HTMLInputElement) => {
    checkbox.style.borderColor = '#1367ef';
};

//!Account page form checkboxs control
const checkboxControl = (checkboxs: HTMLInputElement[]): boolean => {
    let isInvalid = true;
    checkboxs.forEach(checkbox => {
        if(!checkbox.checked) {
            isInvalid = false;
            errorCheckbox(checkbox);
        } else {
            successCheckbox(checkbox);
        }
    });
    return isInvalid;
};
  
const loginEmailInput = document.getElementById('loginEmailInput') as HTMLInputElement;
const loginPasswordInput = document.getElementById('loginPasswordInput') as HTMLInputElement;

//!Account page login form submit event
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkLoginForm([loginEmailInput, loginPasswordInput]);
    checkLoginEmail(loginEmailInput);

    loginPasswordInput.style.backgroundImage = 'none';
});

const checkLoginForm = (inputs) => {
    inputs.forEach(input => {
        if(input.value === '') {
            errorLoginForm(input);
        } else {
            successLoginForm(input);
        }
    });
};

const checkLoginEmail = (email) => {
    const regexLoginEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regexLoginEmail.test(email.value)) {
        errorLoginForm(email);
    } else {
        successLoginForm(email);
    }
};

const errorLoginForm = (input: HTMLInputElement) => {
    input.className = 'form-control is-invalid rounded-2 py-2';
};

const successLoginForm = (input: HTMLInputElement) => {
    input.className = 'form-control is-valid rounded-2 py-2';
};

//!Accout page sign up options html elements
const popupContainer = document.querySelector<HTMLDivElement>('.popup-containers');
const popupOptions = document.querySelectorAll<HTMLDivElement>('.popup-options div');
const popupOptionsChild = document.querySelectorAll<HTMLDivElement>('.popup-content-child');

const expressConsentContent = document.querySelector<HTMLDivElement>('.popup-content__express-consent');
const lightingTextContent = document.querySelector<HTMLDivElement>('.popup-content__lighting-text');
const membershipContent = document.querySelector<HTMLDivElement>('.popup-content__membership-text');
const body = document.querySelector('body');

//!Show desired content 
function showContent(content: HTMLDivElement): undefined {
    expressConsentContent.style.display = 'none';
    lightingTextContent.style.display = 'none';
    membershipContent.style.display = 'none';

    content.style.display = 'block';
    document.querySelector('.popup-details').classList.add('open')
};

//!Desired index in active
function setActiveOption(optionIndex: number): undefined {
    popupOptions.forEach(option => option.classList.remove('active'));
    popupOptions[optionIndex].classList.add('active');
}

//!All popup options
popupOptions.forEach((option, index): undefined => {
    option.addEventListener('click', () => {
        setActiveOption(index);
        
        if(option.textContent === 'Açık Rıza Metni') {
            showContent(expressConsentContent);
        } else if(option.textContent === 'Aydınlatma Metni') {
            showContent(lightingTextContent);
        } else {
            showContent(membershipContent);
        }
    });
})

//!Click the close popup container
document.querySelector('#closePopupAccount').addEventListener('click', () => {
    popupContainer.classList.remove('open')
    body.style.overflow = 'visible';
});

//!Click popup text and show the container
function openPopup(content: HTMLDivElement, optionIndex: number) {
    popupContainer.classList.add('open')
    body.style.overflow = 'hidden'
    showContent(content);
    setActiveOption(optionIndex);
}

//!Popup texts area
document.getElementById('openPolicyText').addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(expressConsentContent, 0);
});

document.getElementById('openLightingText').addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(lightingTextContent, 1);
});

document.getElementById('openMembership').addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(membershipContent, 2);
});
//!Account page form validation events
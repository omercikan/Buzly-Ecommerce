//! Signup Form Elements //!
const signUpNameInput = document.getElementById('signUpNameInput');
const signUpEmailInput = document.getElementById('signUpEmailInput');
const signUpPasswordInput = document.getElementById('signupPasswordInput');
const signUpBtn = document.getElementById('signUpBtn');
//! Signup Form Elements //!
//! User account data !//
const userAccountList = JSON.parse(localStorage.getItem('userAccountInfo')) || [];
//! User account data !//
//! Login Form Elements //!
import { loginEmailInput, loginPasswordInput } from "./account.js";
const loginBtn = document.getElementById('loginBtn');
//! Login Form Elements //!
const message = document.querySelector('.set-global-message');
//! User fields interface !//
//! User account info class structure !//
class UserAccountInfo {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
//! User account info class structure !//
//! Get user data function !//
const getUserAccountInfo = () => {
    signUpBtn.addEventListener('click', () => {
        const regexLoginEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const user = new UserAccountInfo(signUpNameInput.value, signUpEmailInput.value, signUpPasswordInput.value);
        if (user.name.length > 0 && regexLoginEmail.test(user.email) && user.password.length > 0) {
            userAccountList.push(user);
            localStorage.setItem('userAccountInfo', JSON.stringify(userAccountList));
        }
    });
};
//! Get user data function !//
//! Check user account info function !//
const checkUserAccountInfo = () => {
    loginBtn.addEventListener('click', () => {
        const matchedUser = userAccountList.find(user => user.email === loginEmailInput.value && user.password === loginPasswordInput.value);
        if (matchedUser) {
            message.classList.add('active');
            const paragraph = message.querySelector('p');
            if (paragraph) {
                paragraph.textContent = `Doğrulama başarılı 👋 Hoşgeldin ${matchedUser.name}!`;
            }
            const span = message.querySelector('span');
            if (span) {
                span.textContent = '';
            }
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
        else {
            message.classList.add('active');
            const paragraph = message.querySelector('p');
            if (paragraph) {
                paragraph.textContent = `E-Posta veya Şifre hatalı!`;
            }
            const span = message.querySelector('span');
            if (span) {
                span.textContent = '';
            }
            setTimeout(() => {
                message.classList.remove('active');
            }, 3000);
        }
    });
};
//! Check user account info function !//
checkUserAccountInfo();
getUserAccountInfo();

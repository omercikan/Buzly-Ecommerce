//! Signup Form Elements //!
const signUpNameInput = document.getElementById('signUpNameInput') as HTMLInputElement; 
const signUpEmailInput = document.getElementById('signUpEmailInput') as HTMLInputElement; 
const signUpPasswordInput = document.getElementById('signupPasswordInput') as HTMLInputElement;
const signUpBtn = document.getElementById('signUpBtn') as HTMLButtonElement;
//! Signup Form Elements //!

//! User account data !//
const userAccountList: User[] = JSON.parse(localStorage.getItem('userAccountInfo')) || [];
//! User account data !//

//! Login Form Elements //!
import { loginEmailInput, loginPasswordInput } from "./account.js";
const loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
//! Login Form Elements //!

const message = document.querySelector('.set-global-message');

//! User fields interface !//
interface User {
    name: string,
    email: string,
    password: string;
}
//! User fields interface !//

//! User account info class structure !//
class UserAccountInfo implements User{
    public email: string;
    public name: string;
    public password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;       
        this.email = email;
        this.password = password;
    }
}
//! User account info class structure !//

//! Get user data function !//
const getUserAccountInfo = (): void => {
    signUpBtn.addEventListener('click', () => {
        const regexLoginEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const user = new UserAccountInfo(signUpNameInput.value, signUpEmailInput.value, signUpPasswordInput.value)
        
        if(user.name.length > 0 && regexLoginEmail.test(user.email) && user.password.length > 0) {
            userAccountList.push(user)
            localStorage.setItem('userAccountInfo', JSON.stringify(userAccountList));
            checkUserAccountInfo();
        }
    });
};
//! Get user data function !//

//! Check user account info function !//
const checkUserAccountInfo = (): void => {
    loginBtn.addEventListener('click', () => {
        userAccountList.map((user) => {
            if(user.email === loginEmailInput.value && user.password === loginPasswordInput.value) {
                message.classList.add('active')
                message.querySelector('p').textContent = `Doğrulama başarılı 👋 Hoşgeldin ${user.name}!`
                message.querySelector('span').textContent = '';
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 3000);
            } else {
                message.classList.add('active')
                message.querySelector('p').textContent = `E-Posta veya Şifre hatalı!`
                message.querySelector('span').textContent = ``

                setTimeout(() => {
                    message.classList.remove('active')
                }, 3000);
            }
        })
    })
}
//! Check user account info function !//

checkUserAccountInfo();
getUserAccountInfo();
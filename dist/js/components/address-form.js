var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import updateAddressDOM from "./payments/addressForm.js";
//? Invoice buttons html elements and focus active mode / START ?//
const invoiceButtons = document.querySelectorAll('.invoice-buttons button');
const framer = document.querySelector('.selected-frame');
const selectedModeInputs = document.querySelector('.selected-mode-active-inputs');
for (let button of invoiceButtons) {
    button.addEventListener('click', () => {
        document.querySelector('button.selected').classList.remove('selected');
        selectedModeInputs.classList.add('active');
        button.classList.add('selected');
        const selectedFramer = document.querySelector('.selected-frame.selected');
        if (selectedFramer) {
            framer.classList.remove('selected');
        }
        else {
            selectedModeInputs.classList.remove('active');
            framer.classList.add('selected');
        }
    });
}
//? Invoice buttons html elements and focus active mode / END ?//
//? Change address text click show the address form template / START ?//
const changeAddressText = document.getElementById('changeAddressText');
changeAddressText ? changeAddressText.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.address-template').classList.add('open');
    document.querySelector('html').style.overflow = 'hidden';
}) : '';
//? Change address text click show the address form template / END ?//
//? Change address text click close the address form template / START ?//
document.getElementById('closeChangeAddress').addEventListener('click', () => {
    document.querySelector('.address-template').classList.remove('open');
    document.querySelector('html').style.overflow = 'visible';
});
//? Change address text click close the address form template / END ?//
//! Validation Address template form inputs elements / START !//
const addressForm = document.getElementById('addressForm');
const allAddressInputs = document.querySelectorAll('.address-input');
addressForm.addEventListener('submit', (e) => {
    var _a;
    e.preventDefault();
    const validateAll = controlAllInput([allAddressInputs]);
    const validePhone = controlPhoneInput(document.getElementById('phoneInput'), 10);
    controlLength([document.getElementById('nameInput'), document.getElementById('surnameInput')], 3);
    let commercialInputsValid = true;
    if (selectedModeInputs && selectedModeInputs.classList.contains('active')) {
        commercialInputsValid = controlCommercialForm([document.querySelectorAll('.commercial-input')]);
    }
    if (validateAll && validePhone && commercialInputsValid) {
        document.querySelector('.address-message-container').classList.add('active');
        document.querySelector('.address-template').classList.remove('open');
        document.querySelector('html').style.overflow = 'visible';
        document.querySelectorAll('.address-message button').forEach((close) => {
            close.addEventListener('click', () => {
                document.querySelector('.address-message-container').classList.remove('active');
            });
        });
        const nameValue = document.querySelector('#nameInput').value;
        const surnameValue = document.querySelector('#surnameInput').value;
        const phoneValue = document.querySelector('#phoneInput').value;
        const addressValue = document.querySelector('#addressArea').value;
        const addressHeadingValue = document.querySelector('#addressHeadingInput').value;
        const userData = {
            "id": 0,
            "name": nameValue,
            "surname": surnameValue,
            "phone": phoneValue,
            "address": addressValue,
            "heading": addressHeadingValue
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        updateAddressDOM(userData);
        allAddressInputs.forEach((input) => {
            input.value = '';
            input.className = 'global-input';
        });
    }
    else {
        (_a = document.querySelector('.address-message-container')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
        document.querySelector('.address-template').classList.add('open');
        document.querySelector('html').style.overflow = 'visible';
    }
});
//! Validate Commercial form / START !//
const controlCommercialForm = (inputs) => {
    let isAllCommercialValid = true;
    inputs.forEach((inputGroup) => {
        inputGroup.forEach((input) => {
            const htmlInput = input;
            const validateInput = () => {
                const div = input.nextElementSibling;
                if (htmlInput && htmlInput.value && htmlInput.value.trim()) {
                    input.className = 'form-control is-valid';
                    div.style.display = 'none';
                }
                else {
                    input.className = 'form-control is-invalid';
                    div.className = 'invalid-feedback';
                    div.style.display = 'block';
                    isAllCommercialValid = false;
                }
            };
            validateInput();
            addressForm.addEventListener('submit', validateInput);
        });
    });
    return isAllCommercialValid;
};
//! Validate Commercial form / END !//
//! Validate phone input / START !//
const controlPhoneInput = (input, length) => {
    let validePhone = true;
    if (input.value.length < length) {
        input.className = 'form-control is-invalid';
        const div = input.nextElementSibling;
        div.style.display = 'block';
        div.innerText = 'Lütfen 10 rakamdan oluşan bir numara giriniz';
        div.className = 'invalid-feedback';
        validePhone = false;
    }
    else {
        input.className = 'form-control is-valid';
        const div = input.nextElementSibling;
        div.style.display = 'none';
    }
    return validePhone;
};
//! Validate phone input / END !//
//! Validate length is name input, surname input are phone input / START !//
const controlLength = (inputs, length) => {
    inputs.forEach((input) => {
        if (input.value.length < length) {
            const div = input.nextElementSibling;
            div.className = 'invalid-feedback';
            div.style.display = 'block';
            input.className = 'form-control is-invalid';
            div.innerText = '3 - 30 karakter uzunluğunda olmalıdır';
        }
    });
};
//! Validate length is name input, surname input are phone input / END !//
//! All inputs basic validate / START !//
const controlAllInput = (inputsGroups) => {
    let isValidate = true;
    inputsGroups.forEach((inputs) => {
        inputs.forEach((input) => {
            if (input.value) {
                successAddressInput(input);
            }
            else {
                errorAddressInput(input);
                isValidate = false;
            }
        });
    });
    return isValidate;
};
//! All inputs basic validate / END !//
//! Validate address input show the error moment / START !//
const errorAddressInput = (input) => {
    input.className = 'form-control is-invalid';
    const errorDiv = input.nextElementSibling;
    errorDiv.className = 'invalid-feedback';
    errorDiv.style.display = 'block';
};
//! Validate address input show the error moment / END !//
//! Validate address input show the success moment / START !//
const successAddressInput = (input) => {
    input.className = 'form-control is-valid';
    const div = input.nextElementSibling;
    div.style.display = 'none';
};
//! Validate address input show the success moment / END !//
//! Validate control length to phone input / START !//
const phoneInput = document.getElementById('phoneInput');
phoneInput.addEventListener('input', () => {
    phoneInput.value.length > 10 ? phoneInput.value = phoneInput.value.slice(0, 10) : undefined;
});
//! Validate control length to phone input / END !//
//! Validation Address template form inputs elements / END !//
//! Click location icon auto complete input fields / START !//
document.querySelector('.location-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess);
    }
});
function onSuccess(location) {
    return __awaiter(this, void 0, void 0, function* () {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const apiKey = "25cc226f653e4e099e04f4266282f718";
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
        const request = yield fetch(apiUrl);
        const data = yield request.json();
        const neighbourhood = data.results[0].components.suburb;
        const street = data.results[0].components.road;
        const postCode = data.results[0].components.postcode;
        const town = data.results[0].components.town;
        const province = data.results[0].components.province;
        const results = `${neighbourhood}, ${street}, ${postCode} ${town} ${province}`;
        document.querySelector('#provinces option').innerText = province;
        document.querySelector('#provinces option').value = province;
        document.querySelector('#neighbourhoodInput').value = neighbourhood;
        document.querySelector('#districtInput').value = town;
        const input = document.getElementById('addressArea');
        input.value = results;
    });
}
//! Click location icon auto complete input fields / END !//

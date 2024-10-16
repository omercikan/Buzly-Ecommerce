//? Invoice buttons html elements and focus active mode / START ?//
const invoiceButtons = document.querySelectorAll<HTMLButtonElement>('.invoice-buttons button');
const framer = document.querySelector<HTMLSpanElement>('.selected-frame');
const selectedModeInputs = document.querySelector<HTMLDivElement>('.selected-mode-active-inputs');

for(let button of invoiceButtons) {
    button.addEventListener('click', () => {
        document.querySelector<HTMLButtonElement>('button.selected').classList.remove('selected');
        selectedModeInputs.classList.add('active')
        button.classList.add('selected');

        const selectedFramer = document.querySelector<HTMLSpanElement>('.selected-frame.selected');

        if(selectedFramer) {
            framer.classList.remove('selected')
        } else {
            selectedModeInputs.classList.remove('active')
            framer.classList.add('selected')
        }
    });
}
//? Invoice buttons html elements and focus active mode / END ?//

//? Change address text click show the address form template / START ?//
document.getElementById('changeAddressText').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector<HTMLDivElement>('.address-template').classList.add('open')
    document.querySelector('html').style.overflow = 'hidden'
})
//? Change address text click show the address form template / END ?//

//? Change address text click close the address form template / START ?//
document.getElementById('closeChangeAddress').addEventListener('click', () => {
    document.querySelector<HTMLDivElement>('.address-template').classList.remove('open')
    document.querySelector('html').style.overflow = 'visible'
})
//? Change address text click close the address form template / END ?//

//! Validation Address template form inputs elements / START !//
const addressForm = document.getElementById('addressForm') as HTMLFormElement;
const allAddressInputs = document.querySelectorAll<HTMLInputElement>('.address-input');

addressForm.addEventListener('submit', (e: Event): undefined => {
    e.preventDefault();
    const validateAll = controlAllInput([allAddressInputs])
    const validePhone = controlPhoneInput(document.getElementById('phoneInput') as HTMLInputElement, 10);
    const valideLength = controlLength([document.getElementById('nameInput'), document.getElementById('surnameInput')], 3)

    let commercialInputsValid: boolean = true;

    if(selectedModeInputs && selectedModeInputs.classList.contains('active')) {
       commercialInputsValid = controlCommercialForm([document.querySelectorAll<HTMLInputElement>('.commercial-input')])
    }

    if(validateAll && validePhone && commercialInputsValid) {
        document.querySelector('.address-message-container').classList.add('active');
        document.querySelector<HTMLDivElement>('.address-template').classList.remove('open')
        document.querySelector('html').style.overflow = 'visible'

        document.querySelectorAll('.address-message button').forEach((close) => {
            close.addEventListener('click', () => {
                document.querySelector('.address-message-container').classList.remove('active');
            });
        });

        allAddressInputs.forEach((input: HTMLInputElement) => {
            input.value = '';
            input.className = 'global-input';
        })
    } else {
        document.querySelector('.address-message-container').classList.remove('active');
        document.querySelector<HTMLDivElement>('.address-template').classList.add('open');
        document.querySelector('html').style.overflow = 'visible';
    }
});

//! Validate Commercial form / START !//
const controlCommercialForm = (inputs) => {
    let isAllCommercialValid: boolean = true;

    inputs.forEach((inputGroup: NodeListOf<HTMLInputElement>): void => {
        inputGroup.forEach((input: HTMLInputElement): void => {
            const htmlInput = input as HTMLInputElement; 
            const validateInput = () => {
                const div = input.nextElementSibling as HTMLDivElement;
    
                if(htmlInput && htmlInput.value && htmlInput.value.trim()) {
                    input.className = 'form-control is-valid';
                    div.style.display = 'none';
                } else {
                    input.className = 'form-control is-invalid';
                    div.className = 'invalid-feedback';
                    div.style.display = 'block';
                    isAllCommercialValid = false
                }
            }
    
            validateInput();
            addressForm.addEventListener('submit', validateInput);
        });
    })
    
    return isAllCommercialValid
}
//! Validate Commercial form / END !//

//! Validate phone input / START !//
const controlPhoneInput = (input: HTMLInputElement, length: number): boolean => {
    let validePhone = true;
    if(input.value.length < length) {
        input.className = 'form-control is-invalid';
        const div = input.nextElementSibling as HTMLDivElement;
        div.style.display = 'block'
        div.innerText = 'Lütfen 10 rakamdan oluşan bir numara giriniz';
        div.className = 'invalid-feedback'
        validePhone = false;
    } else {
        input.className = 'form-control is-valid';
        const div = input.nextElementSibling as HTMLDivElement;
        div.style.display = 'none';
    }

    return validePhone;
}
//! Validate phone input / END !//

//! Validate length is name input, surname input are phone input / START !//
const controlLength = (inputs, length: number): undefined => {
    inputs.forEach((input): undefined => {
        if(input.value.length < length) {
            const div = input.nextElementSibling as HTMLDivElement;
            div.className = 'invalid-feedback';
            div.style.display = 'block';
            input.className = 'form-control is-invalid'
            div.innerText = '3 - 30 karakter uzunluğunda olmalıdır'
        }
    })
}
//! Validate length is name input, surname input are phone input / END !//

//! All inputs basic validate / START !//
const controlAllInput = (inputsGroups: NodeListOf<HTMLInputElement>[]): boolean => {
    let isValidate = true;
    inputsGroups.forEach((inputs: NodeListOf<HTMLInputElement>): void => {
        inputs.forEach((input: HTMLInputElement): void => {
            if(input.value) {
                successAddressInput(input)
            } else {
                errorAddressInput(input)
                isValidate = false
            }
        });        
    });

    return isValidate
}
//! All inputs basic validate / END !//

//! Validate address input show the error moment / START !//
const errorAddressInput = (input: HTMLInputElement): undefined => {
    input.className = 'form-control is-invalid'
    const errorDiv = input.nextElementSibling as HTMLDivElement;
    errorDiv.className = 'invalid-feedback';
    errorDiv.style.display = 'block'
}
//! Validate address input show the error moment / END !//

//! Validate address input show the success moment / START !//
const successAddressInput = (input: HTMLInputElement): undefined => {
    input.className = 'form-control is-valid'
    const div = input.nextElementSibling as HTMLDivElement
    div.style.display = 'none'
}
//! Validate address input show the success moment / END !//

//! Validate control length to phone input / START !//
const phoneInput = document.getElementById('phoneInput') as HTMLInputElement;
phoneInput.addEventListener('input', () => {
    phoneInput.value.length > 10 ? phoneInput.value = phoneInput.value.slice(0, 10) : undefined;
})
//! Validate control length to phone input / END !//

//! Validation Address template form inputs elements / END !//

//! Click location icon auto complete input fields / START !//
document.querySelector('.location-btn').addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess);
    }
})

async function onSuccess(location): Promise<undefined> {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const apiKey = "25cc226f653e4e099e04f4266282f718";
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    const request = await fetch(apiUrl);
    const data = await request.json();
    const neighbourhood = data.results[0].components.suburb;
    const street = data.results[0].components.road;
    const postCode = data.results[0].components.postcode;
    const town = data.results[0].components.town;
    const province = data.results[0].components.province;
    const results = `${neighbourhood}, ${street}, ${postCode} ${town} ${province}`

    document.querySelector<HTMLSelectElement>('#provinces option').innerText = province
    document.querySelector<HTMLSelectElement>('#provinces option').value = province
    document.querySelector<HTMLInputElement>('#neighbourhoodInput').value = neighbourhood
    document.querySelector<HTMLInputElement>('#districtInput').value = town
    const input = document.getElementById('addressArea') as HTMLTextAreaElement;
    input.value = results;
}
//! Click location icon auto complete input fields / END !//
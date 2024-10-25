let userData = JSON.parse(localStorage.getItem('userData')) || null;

document.querySelector<HTMLDivElement>('.add-address')?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('.address-template')?.classList.add('open')
})

let allAddressData = JSON.parse(localStorage.getItem('addressDatas')) || [];

const selectFocusAddress = () => {
    const allTypeAddress = document.querySelectorAll('.type-address') as NodeListOf<HTMLDivElement>;
    allTypeAddress.forEach((item) => {
        item.addEventListener('click', () => {
           

            document.querySelector('.loader-wrapper').classList.add('active')
            setTimeout(() => {
                const selectedAddress = document.querySelector('.type-address.selected');
                if(selectedAddress) {
                    selectedAddress.classList.remove('selected');
                }
                item.classList.add('selected')
                
                if(item.classList.contains('selected')) {
                    document.querySelectorAll('.radio-icon').forEach((icon) => icon.className = 'bi bi-circle radio-icon')
                    item.querySelector('.radio-icon').className = 'bi bi-record-circle radio-icon'
                }
                document.querySelector('.loader-wrapper').classList.remove('active')
            }, 500);
        });      
    });
}

const editFocusAddress = () => {
    const editAddressText = document.querySelectorAll<HTMLSpanElement>('.editAddress'); 
    editAddressText.forEach((edit) => {
        edit.addEventListener('click', () => {
            const id = edit.getAttribute('data-id');
            const findAddress = allAddressData.find((address) => address.id === Number(id))
            if(findAddress) {
                let obj = {
                    name: findAddress.name = "Mehmet",
                    surname: findAddress.surname = 'Çıkan'
                }

                localStorage.setItem('addressDatas', JSON.stringify(obj))
            }
        })
    })
}

function loadAddressData() {
    const addressDataStorage = JSON.parse(localStorage.getItem('addressDatas'));

    if (addressDataStorage && addressDataStorage.length > 0) {
        document.querySelector('#paymentAddressDOM') ? document.querySelector('#paymentAddressDOM').innerHTML = '' : '';
        addressDataStorage.forEach((data) => {
            let addNewAddresHTML = `
                 <div class="type-address" data-id='${data.id}'>
                    <div class="type-header d-flex justify-content-between me-auto mb-2">
                        <div class="type-radio">
                            <i class="bi bi-circle radio-icon"></i>
                            <span>${data.heading}</span>
                        </div>
                    </div>
        
                    <div class="type-box">
                        <div class="type-box-head">
                            <div class="box-head-info">
                            <div class="head-name">
                                <i class="bi bi-person-fill"></i>
                                <span>${data.name} ${data.surname}</span>
                            </div>
        
                            <div class="head-phone">
                                <i class="bi bi-phone"></i>
                                <span>${data.phone}</span>
                            </div>
                            </div>
        
                            <div class="head-address">
                            <p>
                                ${data.address}
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
           document.querySelector('#paymentAddressDOM')?.insertAdjacentHTML('beforeend', addNewAddresHTML);
        });
    }

    selectFocusAddress();
    editFocusAddress();
}

window.addEventListener('DOMContentLoaded', loadAddressData);

document.querySelector('#saveFormButton')?.addEventListener('click', () => {
    const nameValue = document.querySelector<HTMLInputElement>('#nameInput');
    const surnameValue = document.querySelector<HTMLInputElement>('#surnameInput');
    const provincesValue = document.querySelector<HTMLSelectElement>('#provinces');
    const phoneValue = document.querySelector<HTMLInputElement>('#phoneInput');
    const addressValue = document.querySelector<HTMLInputElement>('#addressArea');
    const addressHeadingValue = document.querySelector<HTMLInputElement>('#addressHeadingInput');

    interface Address {
        id: number;
        name: string;
        surname: string;
        phone: string | number;
        address: string;
        heading: string;
    }

    const AddressData: Address = {
        id: allAddressData.length + 1,
        name: nameValue.value,
        surname: surnameValue.value,
        phone: phoneValue.value,
        address: addressValue.value,
        heading: addressHeadingValue.value
    };  

    if(nameValue.value && surnameValue.value && phoneValue.value && addressValue.value && addressHeadingValue.value) {
        allAddressData.push(AddressData);
        localStorage.setItem('addressDatas', JSON.stringify(allAddressData));
        loadAddressData();
        
        setTimeout(() => {
            document.querySelector<HTMLElement>('.address-template')?.classList.remove('open');

            document.querySelectorAll('input').forEach((input) => {
                const div = input.parentElement.lastElementChild as HTMLDivElement
                if(div.classList.contains('invalid-feedback')) {
                    div.style.display = 'none';
                    input.className = 'global-input';
                    addressValue.className = 'global-input';
                    const addressDiv = addressValue.nextElementSibling as HTMLDivElement
                    addressDiv.style.display = 'none';
                    provincesValue.className = 'global-input'
                    provincesValue.value = ''
                    provincesValue.querySelector('option').removeAttribute('disabled')
                }
            })
        }, 10);
    
        document.querySelector<HTMLFormElement>('.paymentForm').reset();
    }
})

const createAddressHTML = (userData: any): string => {
    if(userData) {
        return `
        <div class="type-address selected" data-id='${userData.id}'>
            <div class="type-header d-flex justify-content-between me-auto mb-2">
                <div class="type-radio">
                    <i class="bi bi-record-circle radio-icon"></i>
                    <span id="userHead">${userData.heading}</span>
                </div>
            </div>
        
            <div class="type-box">
                <div class="type-box-head">
                    <div class="box-head-info">
                        <div class="head-name">
                            <i class="bi bi-person-fill"></i>
                            <span id="userName">${userData.name} ${userData.surname}</span>
                        </div>
            
                        <div class="head-phone">
                            <i class="bi bi-phone"></i>
                            <span id="userPhone">${userData.phone}</span>
                        </div>
                    </div>
            
                    <div class="head-address">
                        <p id="userAddress">
                            ${userData.address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    return '';
}

const updateAddressDOM = (userData) => {
    const selectAddressDOM = document.querySelector<HTMLDivElement>('#selectAddressDOM');
    if(selectAddressDOM && userData) {
        selectAddressDOM.innerHTML = createAddressHTML(userData);
    } else {
        if(selectAddressDOM) {
            selectAddressDOM.innerHTML = ''
        }
    }
}

export default updateAddressDOM;

document.addEventListener('DOMContentLoaded', () => {
    updateAddressDOM(userData)
});
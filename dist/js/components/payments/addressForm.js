var _a, _b;
let userData = JSON.parse(localStorage.getItem('userData')) || null;
(_a = document.querySelector('.add-address')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    var _a;
    (_a = document.querySelector('.address-template')) === null || _a === void 0 ? void 0 : _a.classList.add('open');
});
let allAddressData = JSON.parse(localStorage.getItem('addressDatas')) || [];
const selectFocusAddress = () => {
    const allTypeAddress = document.querySelectorAll('.type-address');
    allTypeAddress.forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelector('.loader-wrapper').classList.add('active');
            setTimeout(() => {
                const selectedAddress = document.querySelector('.type-address.selected');
                if (selectedAddress) {
                    selectedAddress.classList.remove('selected');
                }
                item.classList.add('selected');
                if (item.classList.contains('selected')) {
                    document.querySelectorAll('.radio-icon').forEach((icon) => icon.className = 'bi bi-circle radio-icon');
                    item.querySelector('.radio-icon').className = 'bi bi-record-circle radio-icon';
                }
                document.querySelector('.loader-wrapper').classList.remove('active');
            }, 500);
        });
    });
};
const editFocusAddress = () => {
    const editAddressText = document.querySelectorAll('.editAddress');
    editAddressText.forEach((edit) => {
        edit.addEventListener('click', () => {
            const id = edit.getAttribute('data-id');
            const findAddress = allAddressData.find((address) => address.id === Number(id));
            if (findAddress) {
                let obj = {
                    name: findAddress.name = "Mehmet",
                    surname: findAddress.surname = 'Çıkan'
                };
                localStorage.setItem('addressDatas', JSON.stringify(obj));
            }
        });
    });
};
function loadAddressData() {
    const addressDataStorage = JSON.parse(localStorage.getItem('addressDatas'));
    if (addressDataStorage && addressDataStorage.length > 0) {
        document.querySelector('#paymentAddressDOM') ? document.querySelector('#paymentAddressDOM').innerHTML = '' : '';
        addressDataStorage.forEach((data) => {
            var _a;
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
            (_a = document.querySelector('#paymentAddressDOM')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', addNewAddresHTML);
        });
    }
    selectFocusAddress();
    editFocusAddress();
}
window.addEventListener('DOMContentLoaded', loadAddressData);
(_b = document.querySelector('#saveFormButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    const nameValue = document.querySelector('#nameInput');
    const surnameValue = document.querySelector('#surnameInput');
    const provincesValue = document.querySelector('#provinces');
    const phoneValue = document.querySelector('#phoneInput');
    const addressValue = document.querySelector('#addressArea');
    const addressHeadingValue = document.querySelector('#addressHeadingInput');
    const AddressData = {
        id: allAddressData.length + 1,
        name: nameValue.value,
        surname: surnameValue.value,
        phone: phoneValue.value,
        address: addressValue.value,
        heading: addressHeadingValue.value
    };
    if (nameValue.value && surnameValue.value && phoneValue.value && addressValue.value && addressHeadingValue.value) {
        allAddressData.push(AddressData);
        localStorage.setItem('addressDatas', JSON.stringify(allAddressData));
        loadAddressData();
        setTimeout(() => {
            var _a;
            (_a = document.querySelector('.address-template')) === null || _a === void 0 ? void 0 : _a.classList.remove('open');
            document.querySelectorAll('input').forEach((input) => {
                const div = input.parentElement.lastElementChild;
                if (div.classList.contains('invalid-feedback')) {
                    div.style.display = 'none';
                    input.className = 'global-input';
                    addressValue.className = 'global-input';
                    const addressDiv = addressValue.nextElementSibling;
                    addressDiv.style.display = 'none';
                    provincesValue.className = 'global-input';
                    provincesValue.value = '';
                    provincesValue.querySelector('option').removeAttribute('disabled');
                }
            });
        }, 10);
        document.querySelector('.paymentForm').reset();
    }
});
const createAddressHTML = (userData) => {
    if (userData) {
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
};
const updateAddressDOM = (userData) => {
    const selectAddressDOM = document.querySelector('#selectAddressDOM');
    if (selectAddressDOM && userData) {
        selectAddressDOM.innerHTML = createAddressHTML(userData);
    }
    else {
        if (selectAddressDOM) {
            selectAddressDOM.innerHTML = '';
        }
    }
};
export default updateAddressDOM;
document.addEventListener('DOMContentLoaded', () => {
    updateAddressDOM(userData);
});

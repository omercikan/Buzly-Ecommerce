//!Click open sidebar menu and click close sidebar menu start
const sidebarMenu = () => {
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menu = document.querySelector('.header-links-group');
    openMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        menu.style.left = '0%';
    });
    document.addEventListener('click', () => {
        menu.style.left = '-100%';
    });
    menu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    closeMenu.addEventListener('click', () => {
        menu.style.left = '-100%';
    });
};
const searchModal = () => {
    //!Click open 'search modal' menu and click close 'search modal' start
    const searchModal = document.querySelector('.search-modal');
    const searchModalWrapper = document.querySelector('.search-modal__wrapper');
    const openSearchModal = document.querySelector('#openSearchModal');
    const closeSearchModal = document.querySelector('#closeSearchModal');
    openSearchModal.addEventListener('click', (event) => {
        event.stopPropagation();
        searchModal.classList.add('active');
    });
    document.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
    searchModalWrapper.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    closeSearchModal.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
    //!Click open 'search modal' menu and click close 'search modal' end
};
const navbarCategories = () => {
    //!<-- The image changes when hovering over category products -->
    const allDropdownMenuItems = document.querySelectorAll('.focus-change-products li a');
    const dropdownImage = document.getElementById('dropdownImage');
    allDropdownMenuItems.forEach((items) => {
        items.addEventListener('mouseenter', function () {
            const targetImage = this.getAttribute('data-image');
            dropdownImage.src = targetImage;
        });
    });
    //!<-- The image changes when hovering over category products --> 
};
const headerFunc = () => {
    sidebarMenu();
    searchModal();
    navbarCategories();
};
export default headerFunc();
//# sourceMappingURL=header.js.map
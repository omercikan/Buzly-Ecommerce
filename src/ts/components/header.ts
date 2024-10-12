//!Click open sidebar menu and click close sidebar menu start
const sidebarMenu = () => {
    const openMenu = document.getElementById('openMenu') as HTMLElement;
    const closeMenu = document.getElementById('closeMenu') as HTMLElement; 
    const menu = document.querySelector<HTMLUListElement>('.header-links-group');
    
    openMenu.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        menu.style.left = '0%' 
    }); 
     
    document.addEventListener('click', () => {
        menu.style.left = '-100%' 
    });
    
    menu.addEventListener('click', (event: Event) => {
        event.stopPropagation();
    })
    
    closeMenu.addEventListener('click', () => {
        menu.style.left = '-100%'
    });
};

const searchModal = () => {
    //!Click open 'search modal' menu and click close 'search modal' start
    const searchModal = document.querySelector<HTMLDivElement>('.search-modal');
    const searchModalWrapper = document.querySelector<HTMLDivElement>('.search-modal__wrapper');
    const openSearchModal = document.querySelector<HTMLElement>('#openSearchModal');
    const closeSearchModal = document.querySelector<HTMLElement>('#closeSearchModal');

    openSearchModal.addEventListener('click', (event: Event) => {
        event.stopPropagation();
        searchModal.classList.add('active')
    });

    document.addEventListener('click', () => {
        searchModal.classList.remove('active')
    });

    searchModalWrapper.addEventListener('click', (event: Event) => {
        event.stopPropagation()
    });

    closeSearchModal.addEventListener('click', () => {
        searchModal.classList.remove('active')
    });
    //!Click open 'search modal' menu and click close 'search modal' end
};

const navbarCategories = () => {
    //!<-- The image changes when hovering over category products -->
    const allDropdownMenuItems = document.querySelectorAll<HTMLAnchorElement>('.focus-change-products li a');
    const dropdownImage = document.getElementById('dropdownImage') as HTMLImageElement;

    allDropdownMenuItems.forEach((items) => {
        items.addEventListener('mouseenter', function() {
            const targetImage: string | null = this.getAttribute('data-image');
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
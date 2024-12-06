const sliderSavingLink = document.querySelectorAll<HTMLAnchorElement>('.slider-saving-link');
const params = new URLSearchParams(window.location.search);
const categoryName = params.get('category');

document.querySelector<HTMLHeadingElement>('.category-heading h2') ? categoryName : '';
document.querySelector<HTMLHeadingElement>('.category-heading span') ? categoryName : '';

export const displayFocusCategory = (fashionStorage) => {
    if(sliderSavingLink) {
        sliderSavingLink.forEach((link) => {
            link.addEventListener('click', () => {
                fashionStorage.forEach((data: any) => {
                    if(link.getAttribute('data-id') === data.category) {
                        localStorage.setItem('showCategory', JSON.stringify(data.products));
                        window.location.href = `category.html?category=${encodeURIComponent(data.category)}`
                    }
                });
            });
        })
    }
}

const seasonLink = document.querySelector<HTMLAnchorElement>('.season-link');

export const displayFocusCategorySeason = (shoeStorage) => {
    if(seasonLink) {
        seasonLink.addEventListener('click', () => {
            shoeStorage.forEach((data: any) => {
                if(seasonLink.getAttribute('data-id') === data.category) {
                    localStorage.setItem('showCategory', JSON.stringify(data.products));
                    window.location.href = `category.html?category=${encodeURIComponent(data.category)}`
                }
            });
        })
    }
}

const otherOfferLink = document.querySelector<HTMLAnchorElement>('.other-offer-link');

export const displayFocusCategoryOffer = (electronicStorage) => {
    if(otherOfferLink) {
        otherOfferLink.addEventListener('click', () => {
            electronicStorage.forEach((data: any) => {
                if(otherOfferLink.getAttribute('data-id') === data.category) {
                    localStorage.setItem('showCategory', JSON.stringify(data.products));
                    window.location.href = `category.html?category=${encodeURIComponent(data.category)}`;
                }
            });
        })
    }
}
const productFirstList = document.getElementById('productFirstList');
const productSecondList = document.getElementById('productSecondList');
export function productFirstSlider() {
    if (productFirstList) {
        const configOne = {
            perView: 4,
            gap: 10,
            autoplay: false,
            bound: true,
            breakpoints: {
                992: { perView: 3, },
                768: { perView: 2, },
                375: { perView: 1, }
            }
        };
        const carousel = document.querySelector('.product-carousel');
        if (carousel) {
            const glide = new Glide('.product-carousel', configOne).mount();
            setTimeout(() => {
                glide.update({ autoplay: 2000 });
            }, 500);
        }
    }
}
export function productSecondSlider() {
    if (productSecondList) {
        const configTwo = {
            perView: 4,
            gap: 10,
            autoplay: false,
            bound: true,
            breakpoints: {
                992: { perView: 3, },
                768: { perView: 2, },
                375: { perView: 1, }
            }
        };
        const carousel = document.querySelector('.product-carouselTwo');
        if (carousel) {
            const glide = new Glide('.product-carouselTwo', configTwo).mount();
            setTimeout(() => {
                glide.update({ autoplay: 2000 });
            }, 500);
        }
    }
}
export function productThumbSlider() {
    const configThumbs = {
        perView: 5,
        gap: 5,
        bound: true,
        breakpoints: {
            992: {
                perView: 3,
            },
        }
    };
    new Glide('.product-thumbs', configThumbs).mount();
}

declare var Glide: any;

const productFirstList = document.getElementById('productFirstList') as HTMLUListElement;

export function productFirstSlider() {
    const configOne = {
        perView: 4,
        gap: 10,
        // autoplay: 4000,
        bound: true,
        breakpoints: {
            992: {
                perView: 3,
            },
    
            768: {
                perView: 2,
            },
    
            576: {
                perView: 1,
            }
        }
    }
     
   productFirstList && new Glide('.product-carousel', configOne).mount()
}

export function productSecondSlider() {
    const configTwo = {
        perView: 4,
        gap: 10,
        // autoplay: 4000,
        bound: true,
        breakpoints: {
            992: {
                perView: 3,
            },
    
            768: {
                perView: 2,
            },
    
            576: {
                perView: 1,
            }
        }
    }

   productFirstList && new Glide('.product-carouselTwo', configTwo).mount()
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
    }

    new Glide('.product-thumbs', configThumbs).mount();
}
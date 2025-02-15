//* -----------PRODUCTS SLIDER------------- *//

//!Products slider start !//
import { productFirstSlider }  from "./glide.js";
import { productSecondSlider }  from "./glide.js";
//!Products slider end !//

//* -----------PRODUCTS SLIDER------------- *//

//* --------ADD TO CART OPERATIONS---------- *//

//!Add to cart product operations start !//
const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];

const ADD_TO_CART = (): void => {
  const productCartElement = document.getElementsByClassName('add-to-cart');
  const PRODUCTS_DATA = JSON.parse(localStorage.getItem('products'));

  if(productCartElement) {
    Array.from(productCartElement).forEach((cart: HTMLButtonElement): void => {
      const id: number = Number(cart.getAttribute('data-id'));
      const findCartProduct = PRODUCTS_DATA.find((product) => product.id === id)
      const cartCount = document.querySelector<HTMLSpanElement>('.cart-count');


      if(findCartProduct) {
        cart.addEventListener('click', (event: Event) => {
          cartStorage.push({...findCartProduct, amount: 1})
          localStorage.setItem('cart', JSON.stringify(cartStorage))
          const cartBtn = event.target as HTMLButtonElement;
          cartBtn.setAttribute('disabled', 'disabled');
          cartCount.innerHTML = cartStorage.length;
        })
      }

      const inCart = cartStorage.find((inProduct) => inProduct.id === id)
      if(inCart) {
        cart.setAttribute('disabled', 'disabled');
      }
    })
  }
}

//!Add to cart product operations end !//

//* --------ADD TO CART OPERATIONS---------- *//

//* --------ADD TO LIKES OPERATIONS---------- *//

//!Add to likes product operations start !//
const likeStorage = JSON.parse(localStorage.getItem('likes')) || []

const ADD_TO_LIKES = (): void => {
  const productLikesElement = document.getElementsByClassName('add-to-likes');
  const PRODUCTS_DATA = JSON.parse(localStorage.getItem('products'));

  Array.from(productLikesElement).forEach((like: HTMLButtonElement): void => {
    const id: number = Number(like.getAttribute('data-id'))
    const findLikeProduct: object = PRODUCTS_DATA.find((product) => product.id === id)

    if(findLikeProduct) {
      like.addEventListener('click', (): void => {
        const findLikesProductIndex: number = likeStorage.findIndex((product) => product.id === id); 

        if(findLikesProductIndex > -1) {
          likeStorage.splice(findLikesProductIndex, 1)
          like.querySelector('i').className = 'bi bi-heart'
        } else {
          likeStorage.push(findLikeProduct);

          like.querySelector('i').className = 'bi bi-heart-fill active'
        }

        localStorage.setItem('likes', JSON.stringify(likeStorage));
      })
    }

    const inLikes = likeStorage.find((inLikes) => inLikes.id === id)
    const heartIcon = like.querySelector('i');
    
    if(inLikes) {
      heartIcon.className = 'bi bi-heart-fill active'
    }
  })
};

//!Add to likes product operations end !//

//* --------ADD TO LIKES OPERATIONS---------- *//

//* --------SHOW THE PRODUCT DETAILS-------- *//

//! Which product clicked the eye icon or clicked product redirect detail page start !//
const SHOW_PRODUCT_DETAIL = (): void => {
  const productDetailButtonsElements = document.getElementsByClassName('product-link');
  const PRODUCTS_DATA = JSON.parse(localStorage.getItem('products'));
  let matchedElement: object;
  
  Array.from(productDetailButtonsElements).forEach((detail) => {
    const id: number = Number(detail.getAttribute('data-id'));
    const findProduct = PRODUCTS_DATA.find((product) => product.id === id);
    
    detail.addEventListener('click', (e) => {
    e.preventDefault();
      if(findProduct) {
        matchedElement = findProduct;
        localStorage.setItem('showProduct', JSON.stringify(matchedElement))
        window.location.href = 'product-detail.html'
      }
    })
  })
}
//! Which product clicked the eye icon or clicked product redirect detail page end !//

//* --------SHOW THE PRODUCT DETAILS-------- *//

const shareEvents = (): void => {
  const productShareBtn = document.querySelectorAll<HTMLAnchorElement>('#productShareBtn');

  productShareBtn.forEach((share: HTMLAnchorElement): void => {
    share.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const shareWrapperElement = document.querySelector('.share-wrapper')

      if(shareWrapperElement) {
        shareWrapperElement.classList.toggle('open')
      }

      if(shareWrapperElement && shareWrapperElement.classList.contains('open')) {
        document.getElementById('copyUrl').addEventListener('click', () => {
          const url: string = window.location.href;
          navigator.clipboard.writeText(url)
          copyUrl.classList.contains('bi-clipboard') ? copyUrl.className = 'bi bi-clipboard-check-fill' : null;

          setTimeout(() => {
              copyUrl.className = 'bi bi-clipboard'
          }, 3000);
        });

        shareWrapperElement.addEventListener('click', (e: Event) => e.stopPropagation());
        document.querySelector('body').addEventListener('click', () => shareWrapperElement.classList.remove('open'))
      }
    })
  })
}

//* ----PRODUCT CREATE HTML STRUCTURE----- *//

//!Product fields's important interface start!//
interface ProductFields {
  discount: number;
  id: number;
  name: string;
  vote: number;
  evaluation: number;
  img: {
    mainImage: string;
    thumbs: string[];
  };
  price: {
    newPrice: number;
    oldPrice: number;
  } 
}
//!Product fields's important interface end!//

//!Product create basic structere start !//
const GeneraProductHTML = (products: ProductFields[] | object[]): string => {
  return products.map((product): string => `
    <li class="product-item glide__slide">
      <div class="product-discount">
        <span>-${product.discount}%</span> 
        </div> 
        
        <div class="product-img">
          <a href="#" class='product-link' data-id="${product.id}">
            <img src="${product.img.mainImage}" alt="${product.name} 1" class="product-img-one">
            <img src="${product.img.thumbs[1]}" alt="${product.name} 2" class="product-img-two">
          </a> 
        </div>  

        <div class="product-details text-center">
          <a href="#" class='product-link' data-id="${product.id}">${product.name}</a>
          <ul>
            <li>
              <strong>${product.vote}</strong>
            </li>

            <li>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </li>

            <li>
              <strong>(${product.evaluation})</strong>
            </li>
          </ul>

          <div class="product-price">
            <strong>${product.price.newPrice} TL</strong>
            <span>${product.price.oldPrice} TL</span>
          </div>
        </div>

        <div class="product-links">
          <button type="button" class='add-to-cart' data-id="${product.id}">
            <i class="bi bi-basket"></i>
          </button>

          <button type="button" id="productHeartBtn" class="add-to-likes" data-id="${product.id}">
            <i class="bi bi-heart"></i>
          </button>

          <a href="#" class='show-product-detail product-link' data-id="${product.id}">
            <i class="bi bi-eye-fill"></i>
          </a>

          <a href="#" id="productShareBtn">
            <i class="bi bi-share-fill"></i>
          </a>
        </div>
      </li>
  `).join('')
}

//!Product create basic structere end !//

//* ----PRODUCT CREATE HTML STRUCTURE----- *//

//* --------FIRST PRODUCT GROUP---------- *//

//!First product group start !//
export const FirstProductGroup = (): void => {
  const productFirstList = document.getElementById('productFirstList') as HTMLUListElement;
  const PRODUCTS_DATA: object[] = JSON.parse(localStorage.getItem('products'));
  
  if(productFirstList) {
    productFirstList.innerHTML = GeneraProductHTML(PRODUCTS_DATA.slice(0, 4));
    productFirstSlider();
  }
};

//!First product group end !//

//* --------FIRST PRODUCT GROUP---------- *//

//* --------LAST PRODUCT GROUP---------- *//

//!Last product group start !//
export const LastProductGroup = (): void => {
  const productSecondList = document.getElementById('productSecondList') as HTMLUListElement;
  const PRODUCTS_DATA: object[] = JSON.parse(localStorage.getItem('products'));
  
  if(productSecondList) {
    productSecondList.innerHTML = GeneraProductHTML(PRODUCTS_DATA.slice(4, 8));
    productSecondSlider();
    ADD_TO_CART();
    ADD_TO_LIKES();
    SHOW_PRODUCT_DETAIL();
    shareEvents();
  }
};

//!Last product group end !//

//* --------LAST PRODUCT GROUP---------- *//

const productsGroup = (): void => {
  FirstProductGroup();
  LastProductGroup();
}

export default productsGroup;
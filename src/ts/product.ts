import { productFirstSlider }  from "./glide.js";
import { productSecondSlider }  from "./glide.js";

let cart = [];
cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

function firstProductBasketBtn() {
  const basketBtn = document.getElementsByClassName('add-to-cart') as HTMLCollectionOf<HTMLButtonElement>;

  Array.from(basketBtn).forEach((basket: HTMLButtonElement): void => {
    const cartCount = document.querySelector<HTMLSpanElement>('.cart-count');
    const inCart = cart.find((item) => item.id === Number(basket.dataset.id));

    if(inCart) {
      basket.setAttribute("disabled", "disabled");
    } else {
      basket.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const id = target.dataset.id;
        const findProduct = productsFirst.find((product) => product.id === Number(id));

        if(findProduct) {
          cart.push({...findProduct, amount: 1})
          localStorage.setItem("cart", JSON.stringify(cart));
          basket.setAttribute("disabled", "disabled");
           cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";
        }
      }); 
    };
  });
};

function secondProductBasketBtn() {
  const basketBtn = document.getElementsByClassName('add-to-cart') as HTMLCollectionOf<HTMLButtonElement>;
  Array.from(basketBtn).forEach((basket) => {
    const cartCount = document.querySelector<HTMLSpanElement>('.cart-count');
    const inCart = cart.find((item) => item.id === Number(basket.dataset.id))

    if(inCart) {
      basket.setAttribute("disabled", "disabled")
    } else {
      basket.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const id = target.dataset.id;
        const findProduct = productsSecond.find((product) => product.id === Number(id))
  
        if(findProduct) {
          cart.push({...findProduct, amount: 1})
          localStorage.setItem('cart', JSON.stringify(cart))
          basket.setAttribute("disabled", "disabled")
          cartCount.innerHTML = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : "0";
        }
      });
    }
  });
};

function showProductDetailFirst() {
  const showProduct = document.getElementsByClassName('show-product-detail');

  Array.from(showProduct).forEach((show) => {
    show.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const id = target.dataset.id;
      window.location.href = 'product-detail.html'
      const findProduct = productsFirst.find((product) => product.id === Number(id));
      localStorage.setItem('showProduct', JSON.stringify(findProduct))
    });
  });
};

function showProductDetailSecond() {
  const showProduct = document.querySelectorAll('.show-product-detail-second');
  showProduct.forEach((show) => {
    show.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const id = target.dataset.id;
      window.location.href = 'product-detail.html'
      const findProduct = productsSecond.find((product) => product.id === Number(id));
      localStorage.setItem('showProduct', JSON.stringify(findProduct))
    });
  });
};

function getProductLinkFirst() {
  const productLink = document.querySelectorAll<HTMLAnchorElement>('.product-link-first');
  productLink.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-id');
      const findProduct = productsFirst.find((product) => product.id === Number(id))
      window.location.href = 'product-detail.html'
      localStorage.setItem('showProduct', JSON.stringify(findProduct))
    })
  })
}

function getProductLinkSecond() {
  const productLink = document.querySelectorAll<HTMLAnchorElement>('.product-link-second');

  productLink.forEach((link) => {
    link.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const id = link.getAttribute('data-id')
      const findProduct = productsSecond.find((product) => product.id === Number(id))
      window.location.href = 'product-detail.html'
      localStorage.setItem('showProduct', JSON.stringify(findProduct))
    });
  });
};

let likes = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : [];
function addToLikes() {
  const allHeartBtn = document.querySelectorAll('.add-to-likes')

  allHeartBtn.forEach((heart) => {
    const heartIcon = heart.querySelector<HTMLElement>('i');
    const id = heart.getAttribute('data-id')
  
    if(likes.some((product) => product.id === Number(id))) {
      heartIcon.className = 'bi bi-heart-fill active';
    }

    heart.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLButtonElement;
      const id = target.dataset.id;
      const findProduct = productsFirst.find((product) => product.id === Number(id));
      
      if(findProduct) {
        const productIndex = likes.findIndex((product) => product.id === Number(id));

        if(productIndex > -1) {
          likes.splice(productIndex, 1);
          heartIcon.className = 'bi bi-heart';
        } else {
          likes.push(findProduct);
          heartIcon.className = 'bi bi-heart-fill active';
        }

        localStorage.setItem('likes', JSON.stringify(likes));
      };
    });
  });
};

function addToLikesSecond() {
  const allHeartBtn = document.querySelectorAll<HTMLElement>('.add-to-likes-second');

  allHeartBtn.forEach((heart) => {
    const heartIcon = heart.querySelector<HTMLElement>('i');
    const id = heart.getAttribute('data-id');

    if(likes.some((product) => product.id === Number(id))) {
      heartIcon.className = 'bi bi-heart-fill active';
    };

    heart.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLButtonElement;
      const id = target.dataset.id;
      const findProduct = productsSecond.find((product) => product.id === Number(id));

      if(findProduct) {
        const productIndex = likes.findIndex((product) => product.id === Number(id));

        if(productIndex > -1) {
          likes.splice(productIndex, 1);
          heartIcon.className = 'bi bi-heart';
        } else {
          likes.push(findProduct);
          heartIcon.className = 'bi bi-heart-fill active';
        }

        localStorage.setItem('likes', JSON.stringify(likes));
      };
    });
  });
};

const shareEvents = () => {
  const productShareBtn = document.querySelectorAll<HTMLAnchorElement>('#productShareBtn');

  productShareBtn.forEach((share) => {
    share.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelector('.share-wrapper').classList.toggle('open');

      if(document.querySelector('.share-wrapper').classList.contains('open')) {
        document.getElementById('copyUrl').addEventListener('click', () => {
          const url = window.location.href;
          navigator.clipboard.writeText(url)
          copyUrl.classList.contains('bi-clipboard') ? copyUrl.className = 'bi bi-clipboard-check-fill' : null;

          setTimeout(() => {
              copyUrl.className = 'bi bi-clipboard'
          }, 3000);
        });
      }
    })
  })
}

window.addEventListener('DOMContentLoaded', () => {
  getProductDataFirst();
  getProductDataSecond();
});

window.addEventListener('storage', () => {
  addToLikes();
})

let productsFirst = [];
let productsSecond = [];

const getProductDataFirst = () => {
productsFirst = localStorage.getItem('productsFirst') ? JSON.parse(localStorage.getItem('productsFirst')) : [];
const productFirstList = document.getElementById('productFirstList') as HTMLUListElement;

let resultProductFirstHtml: string = '';
  productsFirst.forEach(element => {
    resultProductFirstHtml += `
    <li class="product-item glide__slide">
      <div class="product-discount">
        <span>-${element.discount}%</span> 
        </div> 
        
        <div class="product-img">
          <a href="#" class='product-link-first' data-id="${element.id}">
            <img src="${element.img.mainImage}" alt="${element.name} 1" class="product-img-one">
            <img src="${element.img.thumbs[1]}" alt="${element.name} 2" class="product-img-two">
          </a> 
        </div>  

        <div class="product-details text-center">
          <a href="#" class='product-link-first' data-id="${element.id}">${element.name}</a>
          <ul>
            <li>
              <strong>${element.vote}</strong>
            </li>

            <li>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </li>

            <li>
              <strong>(${element.evaluation})</strong>
            </li>
          </ul>

          <div class="product-price">
            <strong>${element.price.newPrice} TL</strong>
            <span>${element.price.oldPrice} TL</span>
          </div>
        </div>

        <div class="product-links">
          <button type="button" class='add-to-cart' data-id="${element.id}">
            <i class="bi bi-basket"></i>
          </button>

          <button type="button" id="productHeartBtn" class="add-to-likes" data-id="${element.id}">
            <i class="bi bi-heart"></i>
          </button>

          <a href="#" class='show-product-detail' data-id="${element.id}">
            <i class="bi bi-eye-fill"></i>
          </a>

          <a href="#" id="productShareBtn">
            <i class="bi bi-share-fill"></i>
          </a>
        </div>
      </li>
      `;
  });
    
  productFirstList ? productFirstList.innerHTML = resultProductFirstHtml : "";
  productFirstSlider();
  firstProductBasketBtn();
  showProductDetailFirst();
  getProductLinkFirst();
  addToLikes()
}

const getProductDataSecond = () => {
  productsSecond = localStorage.getItem('productsSecond') ? JSON.parse(localStorage.getItem('productsSecond')) : [];
  const productSecondList = document.getElementById('productSecondList') as HTMLUListElement;

  let resultProductSecondHtml: string = '';
    productsSecond.forEach(element => {
      resultProductSecondHtml += `
        <li class="product-item glide__slide">
          <div class="product-discount">
            <span>-${element.discount}%</span> 
          </div> 

          <div class="product-img">
            <a href="#" class='product-link-second' data-id="${element.id}">
              <img src="${element.img.mainImage}" alt="${element.name} 1" class="product-img-one">
              <img src="${element.img.thumbs[1]}" alt="${element.name} 2" class="product-img-two">
            </a> 
          </div>  

          <div class="product-details text-center">
            <a href="#" class='product-link-second' data-id="${element.id}">${element.name}</a>
            <ul>
              <li>
                <strong>${element.vote}</strong>
              </li>

              <li>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
              </li>

              <li>
                <strong>(${element.evaluation})</strong>
              </li>
            </ul>

            <div class="product-price">
              <strong>${element.price.newPrice} TL</strong>
              <span>${element.price.oldPrice} TL</span>
            </div>
          </div>

          <div class="product-links">
            <button type="button" class="add-to-cart" data-id="${element.id}">
              <i class="bi bi-basket"></i>
            </button>

            <button type="button" id="productHeartBtn" class="add-to-likes-second" data-id="${element.id}">
              <i class="bi bi-heart"></i>
            </button>

            <a href="#" class="show-product-detail-second" data-id="${element.id}">
              <i class="bi bi-eye-fill"></i>
            </a>

            <a href="#" id="productShareBtn">
              <i class="bi bi-share-fill"></i>
            </a>
          </div>
        </li>
    `;
  });

  productSecondList ? productSecondList.innerHTML = resultProductSecondHtml : "";
  productSecondSlider();
  secondProductBasketBtn();
  showProductDetailSecond();
  getProductLinkSecond();
  addToLikesSecond();
  shareEvents();
}

function productSliderFunc() {
  getProductDataFirst();
  getProductDataSecond();
} 

export default productSliderFunc;
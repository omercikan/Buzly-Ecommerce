const storage = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : [];
const searchLikesInput = document.getElementById('searchLikesInput') as HTMLInputElement;
const likesProductsItems = document.getElementById('likesProductsItems') as HTMLUListElement

const checkEmptyList = () => {
    if(storage.length === 0) {
        document.querySelector<HTMLDivElement>('.empty-message').style.display = 'block';
    } else {
        document.querySelector<HTMLDivElement>('.empty-message').style.display = 'none';
    }
};

const removeFavoriteProduct = () => {
    const closeIcon = document.getElementsByClassName('close-icon');
    Array.from(closeIcon).forEach((close) => {
        close.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const id = target.dataset.id;
            const findProduct = storage.find((product) => product.id === Number(id))
            const findIndex = storage.findIndex((product) => product === findProduct)

            if(findProduct) {
                storage.splice(findIndex, 1)
                localStorage.setItem('likes', JSON.stringify(storage))

                likesProductHTML = '';
                addFavoriteProducts();
                checkEmptyList();
            }
        });
    });
};

const goToFocusProduct = (): void => {
    const likesProductItem = document.querySelectorAll<HTMLLIElement>('.likes-product-item');
    likesProductItem.forEach((item: HTMLLIElement) => {
        item.addEventListener('click', (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const id = target.dataset.id;
            const findItem = storage.find((item: {id: number}) => item.id === Number(id));

            if(findItem) {
                window.location.href = 'product-detail.html';
                localStorage.setItem('showProduct', JSON.stringify(findItem));
            }
        });
    });
};

let likesProductHTML: string = '';
const addFavoriteProducts = () => {
    likesProductHTML = ''

    storage.forEach(element => {
        likesProductHTML += `
             <li class="likes-product-item" data-id="${element.id}">
                <i class="bi bi-x-lg close-icon" data-id="${element.id}"></i>
                <div class="likes-product-img">
                <img src="${element.img.mainImage}" alt="${element.name}">
                </div>
    
                <h2 class="likes-product-title">${element.name}</h2>
    
                <div class="likes-product-details">
                <div class="likes-product-details__votes d-flex gap-2">
                    <span>${element.vote}</span>
                    <ul class="d-flex likes-stars text-warning">
                    <li><i class="bi bi-star-fill"></i></li>
                    <li><i class="bi bi-star-fill"></i></li>
                    <li><i class="bi bi-star-fill"></i></li>
                    <li><i class="bi bi-star-fill"></i></li>
                    <li><i class="bi bi-star-fill"></i></li>
                    </ul>
                    <span>(${element.evaluation})</span> 
                </div>
    
                <span class="likes-product-price">${element.price.newPrice} TL</span>
                </div>
            </li>
        `;
    });  
    
    likesProductsItems.innerHTML = likesProductHTML;
    removeFavoriteProduct();
    checkEmptyList();
    goToFocusProduct();
} 
 
addFavoriteProducts();

searchLikesInput.addEventListener('input', () => {
    let searchHTML: string = '';

    storage.forEach(element => {
        if(element.name.toLowerCase().includes(searchLikesInput.value.toLowerCase())) {
            searchHTML += `
            <li class="likes-product-item">
                <i class="bi bi-x-lg close-icon" data-id="${element.id}"></i>
                <div class="likes-product-img">
                <img src="${element.img.mainImage}" alt="${element.name}">
                </div>
    
                <h2 class="likes-product-title">${element.name}</h2>
    
                <div class="likes-product-details">
                    <div class="likes-product-details__votes d-flex gap-2">
                        <span>${element.vote}</span>
                        <ul class="d-flex likes-stars text-warning">
                        <li><i class="bi bi-star-fill"></i></li>
                        <li><i class="bi bi-star-fill"></i></li>
                        <li><i class="bi bi-star-fill"></i></li>
                        <li><i class="bi bi-star-fill"></i></li>
                        <li><i class="bi bi-star-fill"></i></li>
                        </ul>
                        <span>(${element.evaluation})</span> 
                    </div>
    
                    <span class="likes-product-price">${element.price.newPrice} TL</span>
                </div>
            </li>
            `;
        }
    });

    likesProductsItems.innerHTML = searchHTML; 
    removeFavoriteProduct();
    checkEmptyList();

    if (searchHTML === '') {
        document.querySelector<HTMLDivElement>('.empty-message').style.display = 'block';
        document.querySelector<HTMLDivElement>('.empty-message h3').innerText = 'Aradığınız kriterlere uygun ürün bulunamadı. 😞';
        document.querySelector<HTMLDivElement>('.empty-message p').innerText = '';
    } else {
        document.querySelector<HTMLDivElement>('.empty-message').style.display = 'none';
    }
});
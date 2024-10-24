const allProductData = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
const searchModalResults = document.getElementById('searchModalResults') as HTMLDivElement;
const searchModalInput = document.getElementById('searchModalInput') as HTMLInputElement;

let resultsProductHTML: string = '';

export const showProducts = (allProductData) => {
    allProductData.forEach((data): undefined => {
        resultsProductHTML += `
            <a href="#" class="result-item" data-id="${data.id}">
                <img src="${data.img.mainImage}" alt="${data.name}"> 
      
                <div class="result-item__info">
                  <h4>${data.name}</h4>
                  <span class="search-code">Stok Kodu: ${data.ProductOther.stockCode}</span>
                  <span class="search-price">${data.price.newPrice} TL</span>
                </div>
            </a>
        `;
    
        searchModalResults.innerHTML = resultsProductHTML;
    });
}

showProducts(allProductData)

const searchProduct = (allProductData) => {
    searchModalInput.addEventListener('input', () => {
        let searchHTML: string = '';
        
        allProductData.forEach((search): undefined => {
            if(search.name.trim().toLowerCase().includes(searchModalInput.value.trim().toLowerCase())) {
                searchHTML += `
                    <a href="#" class="result-item" data-id="${search.id}">
                        <img src="${search.img.mainImage}" alt="${search.name}"> 
            
                        <div class="result-item__info">
                        <h4>${search.name}</h4>
                        <span class="search-code">Stok Kodu: ${search.ProductOther.stockCode}</span>
                        <span class="search-price">${search.price.newPrice} TL</span>
                        </div>
                    </a>
                `;
            }
    
        });
        
        searchModalResults.innerHTML = searchHTML;
        goToFocusProduct(allProductData);
    
        if(searchHTML === '') {
            document.querySelector<HTMLDivElement>('.modal-empty-message').style.display = 'block'
        } else {
            document.querySelector<HTMLDivElement>('.modal-empty-message').style.display = 'none'
        }
    })
} 

searchProduct(allProductData)

export const goToFocusProduct = (allProductData) => {
    const itemLink = document.querySelectorAll<HTMLAnchorElement>('.result-item');

    itemLink.forEach((item): undefined => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const findProduct = allProductData.find((product) => product.id === Number(id))
            localStorage.setItem('showProduct', JSON.stringify(findProduct));
            window.location.href = 'product-detail.html'
        });
    });
};

goToFocusProduct(allProductData)

export function searchFunc(allProductData) {
    showProducts(allProductData);
    goToFocusProduct(allProductData);
    searchProduct(allProductData);
}
const allProductData = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
const searchModalResults = document.getElementById('searchModalResults');
const searchModalInput = document.getElementById('searchModalInput');
const searchTitle = document.querySelector('.search-title');
export const showProducts = (allProductData) => {
    let resultsProductHTML = '';
    allProductData.forEach((data) => {
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
};
showProducts(allProductData);
const searchProduct = (allProductData) => {
    searchModalInput.addEventListener('input', () => {
        let searchHTML = '';
        allProductData.forEach((product) => {
            if (product.name.trim().toLowerCase().includes(searchModalInput.value.trim().toLowerCase())) {
                searchHTML += `
                    <a href="#" class="result-item" data-id="${product.id}">
                        <img src="${product.img.mainImage}" alt="${product.name}"> 
                        <div class="result-item__info">
                            <h4>${product.name}</h4>
                            <span class="search-code">Stok Kodu: ${product.ProductOther.stockCode}</span>
                            <span class="search-price">${product.price.newPrice} TL</span>
                        </div>
                    </a>
                `;
            }
        });
        if (searchModalInput.value.length > 0) {
            searchTitle.textContent = `Arama Sonuçları (${searchModalResults.children.length})`;
        }
        else {
            searchTitle.textContent = `Ürünler`;
        }
        searchModalResults.innerHTML = searchHTML;
        goToFocusProduct(allProductData);
        const emptyMessageElement = document.querySelector('.modal-empty-message');
        if (emptyMessageElement) {
            emptyMessageElement.style.display = searchHTML === '' ? 'block' : 'none';
        }
    });
};
searchProduct(allProductData);
export const goToFocusProduct = (allProductData) => {
    const itemLink = document.querySelectorAll('.result-item');
    itemLink.forEach((item) => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const findProduct = allProductData.find((product) => product.id === Number(id));
            localStorage.setItem('showProduct', JSON.stringify(findProduct));
            window.location.href = 'product-detail.html';
        });
    });
};
goToFocusProduct(allProductData);
export function searchFunc(allProductData) {
    showProducts(allProductData);
    goToFocusProduct(allProductData);
    searchProduct(allProductData);
}
//# sourceMappingURL=search-modal.js.map
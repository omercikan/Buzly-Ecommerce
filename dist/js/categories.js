const categoryLinks = document.querySelectorAll('#categoryLink');
categoryLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute("data-id");
        const Categorystorage = JSON.parse(localStorage.getItem("categories"));
        Categorystorage.forEach(category => {
            if (id === category.category) {
                localStorage.setItem('showCategory', JSON.stringify(category.products));
                window.location.href = `category.html?category=${encodeURIComponent(category.category)}`;
            }
        });
    });
});
//# sourceMappingURL=categories.js.map
const productZoom = () => {
    const productImgWrapper = document.querySelector('.product-main-img');
    const productImg = document.getElementById('productMainImg');
    productImgWrapper.addEventListener('mousemove', (e) => {
        const target = e.target;
        const x = e.clientX - target.offsetLeft;
        const y = e.clientY - target.offsetTop;
        productImg.style.transformOrigin = `${x}px ${y}px`;
        productImg.style.transform = 'scale(5)';
        productImg.style.transition = 'none';
    });
    productImgWrapper.addEventListener('mouseleave', () => {
        productImg.style.transformOrigin = 'center';
        productImg.style.transform = 'scale(1)';
        productImg.style.transition = '.3s ease';
    });
};
productZoom();
//# sourceMappingURL=zoom.js.map
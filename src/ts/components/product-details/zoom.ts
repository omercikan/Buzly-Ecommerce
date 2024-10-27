const productZoom = () => {
    const productImgWrapper = document.querySelector('.product-main-img') as HTMLDivElement;
    const productImg = document.getElementById('productMainImg') as HTMLImageElement;

    productImgWrapper.addEventListener('mousemove', (e) => {
        const target = e.target as HTMLDivElement;
        const x = e.clientX - target.offsetLeft;
        const y = e.clientY - target.offsetTop;
        
        productImg.style.transformOrigin = `${x}px ${y}px`
        productImg.style.transform = 'scale(2)'
        productImg.style.transition = 'none'
    });

    productImgWrapper.addEventListener('mouseleave', () => {
        productImg.style.transformOrigin = 'center'
        productImg.style.transform = 'scale(1)'
        productImg.style.transition = '.3s ease'
    })
};

productZoom();
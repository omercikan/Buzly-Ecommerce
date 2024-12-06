//!Dom content loaded show new year animate showed and removed five secondas later !//
document.addEventListener('DOMContentLoaded', () => {
    const getAnimation = sessionStorage.getItem('new-year-animate');
    if (!getAnimation && window.innerWidth <= 430) {
        const animationElement = document.querySelector('.new-year-animate');
        const htmlElement = document.querySelector('html');
        animationElement.style.display = 'block';
        htmlElement.style.overflow = 'hidden';
        setTimeout(() => {
            sessionStorage.setItem('new-year-animate', 'true');
            htmlElement.style.overflowY = 'visible';
            htmlElement.style.overflowX = 'hidden';
            animationElement.remove();
        }, 5000);
    }
    else {
        const animationElement = document.querySelector('.new-year-animate');
        animationElement.remove();
    }
});
//!Dom content loaded show new year animate showed and removed five secondas later !//

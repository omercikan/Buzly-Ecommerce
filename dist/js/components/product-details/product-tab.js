const parentTabsDOM = document.querySelector('.product-tabs');
const productTabHead = document.querySelectorAll('.product-tabs__list li');
const contents = document.querySelectorAll('.product-tabs__panel .panel-child');
parentTabsDOM.addEventListener('click', (e) => {
    const target = e.target;
    const id = target.dataset.id;
    if (id) {
        productTabHead.forEach((head) => head.classList.remove('active'));
        target.classList.add('active');
        contents.forEach((content) => content.classList.remove('active'));
        const element = document.getElementById(id);
        element.classList.add('active');
    }
    ;
});

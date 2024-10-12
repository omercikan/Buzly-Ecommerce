const parentTabsDOM = document.querySelector<HTMLDivElement>('.product-tabs');
const productTabHead = document.querySelectorAll<HTMLLIElement>('.product-tabs__list li');
const contents = document.querySelectorAll<HTMLDivElement>('.product-tabs__panel .panel-child');

parentTabsDOM.addEventListener('click', (e: Event): undefined => {
    const target = e.target as HTMLElement;
    const id: string = target.dataset.id;

    if(id) {
        productTabHead.forEach((head) => head.classList.remove('active'));
        target.classList.add('active');
        contents.forEach((content) => content.classList.remove('active'))
        const element = document.getElementById(id);
        element.classList.add('active');
    };
});
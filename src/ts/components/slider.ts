const homeSlider = () => {
    let sliderIndex = 1;
    
    let autoPlaySlider;
    function startAutoPlay(): undefined {
        autoPlaySlider = setInterval(() => {
            moveSlider(1);
        }, 3000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlaySlider)
    }
    
    const moveSlider = (index: number) => {
        showSlider(sliderIndex += index);
    };
    
    const currentSlider = (index: number) => {
        showSlider(sliderIndex = index);
    };
    
    const showSlider = (index) => {
        const sliderItems = document.getElementsByClassName('slider-elements__item') as HTMLCollectionOf<HTMLDivElement>;
        const sliderDots = document.querySelectorAll<HTMLButtonElement>('.slider-elements__dots button');
    
        if(index > sliderItems.length) {
            sliderIndex = 1;
        }
    
        if(index < 1) {
            sliderIndex = sliderItems.length;
        }
        
        for(let i = 0; i < sliderItems.length; i++) {
           sliderItems[i].style.display = 'none'
        }
    
        for(let i = 0; i < sliderDots.length; i++) {
            sliderDots[i].className = sliderDots[i].className.replace('active', '');
        }
        
        sliderItems[sliderIndex - 1].style.display = 'flex';
        sliderDots[sliderIndex - 1].className += 'active' 
    }
    showSlider(sliderIndex)
    startAutoPlay();
    
    const bigSliderNextBtn = document.getElementById('bigSliderNextBtn') as HTMLButtonElement;
    bigSliderNextBtn.addEventListener('click', () => {
        moveSlider(1)
    });
    
    /*Mouse enter event is now not active!
    bigSliderNextBtn.addEventListener('mouseenter', () => {
        const sliderItems = [...document.getElementsByClassName('slider-elements__item')] as HTMLDivElement[];
    
        stopAutoPlay()
        sliderItems.forEach(item => item.classList.remove('fade'));
    });*/
    
    bigSliderNextBtn.addEventListener('mouseleave', () => {
        const sliderItems = [...document.getElementsByClassName('slider-elements__item')] as HTMLDivElement[];
    
        startAutoPlay();
        sliderItems.forEach(item => item.classList.add('fade'));
    })
    
    document.getElementById('bigSliderPrevBtn').addEventListener('click', () => {
        moveSlider(-1)
    });

    document.getElementById('sliderDotOne').addEventListener('click', () => currentSlider(1))
    document.getElementById('sliderDotTwo').addEventListener('click', () => currentSlider(2))
    document.getElementById('sliderDotThree').addEventListener('click', () => currentSlider(3))
}

homeSlider();
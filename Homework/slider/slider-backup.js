let sliders = document.getElementsByClassName('slider');

for (let i = 0; i < sliders.length; i++) {
    makeSlider(sliders[i])
}

function f() {
    
}

function makeSlider (sliderNode) {
    let sliderStyles = getComputedStyle(sliderNode);
    let slidesCollection = sliderNode.getElementsByClassName('slides-wrap')[0].getElementsByTagName('div');
    let btnWrapNode = sliderNode.getElementsByClassName('slider__btn-wrap')[0];
    for (let i = 0; i < slidesCollection.length; i++) {
        let slidePos = i * +sliderStyles.height.slice(0, -2);
        let btnNode = document.createElement('div');
        btnNode.classList.add('slider__btn');
        btnNode.setAttribute('data-slide-position', slidePos);
        btnNode.addEventListener("click", changeSlide);
        btnWrapNode.appendChild(btnNode);
    }
}

function changeSlide () {
    this.parentNode.previousElementSibling.style.top =  '-' + this.getAttribute('data-slide-position') + 'px';
}
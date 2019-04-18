let sliders = document.getElementsByClassName('c-slider');

for (let i = 0; i < sliders.length; i++) {
  makeSlider(sliders[i])
}

function getHeight(node) {
  let sliderHeight = getComputedStyle(node.parentNode.parentNode).height.slice(0, -2);
  return sliderHeight * node.getAttribute('data-slide-position');
}

function makeSlider(sliderNode) {
  let slidesCollection = sliderNode.getElementsByClassName('slides-wrap')[0].getElementsByClassName('slides__item');
  let btnWrapNode = sliderNode.getElementsByClassName('slider__btn-wrap')[0];
  for (let i = 0; i < slidesCollection.length; i++) {
    let btnNode = document.createElement('div');
    btnNode.classList.add('slider__btn');
    btnNode.setAttribute('data-slide-position', i);
    btnNode.addEventListener("click", changeSlide);
    btnWrapNode.appendChild(btnNode);
  }
}



function changeSlide() {
  this.parentNode.previousElementSibling.style.top = '-' + getHeight(this) + 'px';
}


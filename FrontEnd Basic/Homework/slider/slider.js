/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
function initializeSliders() {
    const sliders = document.querySelectorAll('.slider');
    for (let node of sliders) {
        createSlider(node);
    }

    function controlSlideTo() {
        const sliderNode = this.parentNode.parentNode;
        const slidesNode = sliderNode.querySelector('.slider__slides');
        const sliderNodeOffsetWidth = sliderNode.offsetWidth;
        controlActive(sliderNode, this);
        slideTo(sliderNode, slidesNode, sliderNodeOffsetWidth, parseInt(this.getAttribute('data-slide-to'), 10));
    }

    function slideTo(sliderNode, slidesNode, sliderNodeOffsetWidth, n) {
        slidesNode.style.transform = `translateX(-${sliderNodeOffsetWidth * n}px)`;
        sliderNode.setAttribute('data-current-slide', n);
    }

    function createControl(sliderNode) {
        function createControlDots() {
            const sliderSlideCollection = sliderNode.querySelectorAll('.slider__slide');
            const sliderControlDots = document.createElement('div');
            sliderControlDots.classList.add('slider__control-dots');

            if(sliderNode.classList.contains('slider--preview')) {
                const slidesPreviewCollection = sliderNode.querySelectorAll('.slider__control-dot-preview-img');
                let paths = [];
                for (let node of slidesPreviewCollection) {
                    paths.push(node.getAttribute('src'));
                }
                for (let i = 0; i < sliderSlideCollection.length; i++) {
                    const btnNode = document.createElement('a');
                    btnNode.classList.add('slider__control-dot-preview');
                    btnNode.setAttribute('role', 'button');
                    btnNode.setAttribute('data-slide-to', i);
                    btnNode.style.backgroundImage = `url(${paths[i]})`;
                    btnNode.addEventListener('click', controlSlideTo);
                    sliderControlDots.appendChild(btnNode);
                }
                sliderNode.appendChild(sliderControlDots);
                return;
            }
            for (let i = 0; i < sliderSlideCollection.length; i++) {
                const btnNode = document.createElement('a');
                btnNode.classList.add('slider__control-dot');
                btnNode.setAttribute('role', 'button');
                btnNode.setAttribute('data-slide-to', i);
                btnNode.addEventListener('click', controlSlideTo);
                sliderControlDots.appendChild(btnNode);
            }

            sliderNode.appendChild(sliderControlDots);
        }

        function createControlArrows() {
            const btnPrev = document.createElement('a');
            btnPrev.setAttribute('role', 'button');
            btnPrev.setAttribute('data-slider-direction', 'prev');
            btnPrev.classList.add('slider__btn-prev');
            const btnNext = document.createElement('a');
            btnNext.setAttribute('role', 'button');
            btnNext.setAttribute('data-slider-direction', 'next');
            btnNext.classList.add('slider__btn-next');
            btnPrev.addEventListener('click', changeSlide.bind(null, ['prev', sliderNode]));
            btnNext.addEventListener('click', changeSlide.bind(null, ['next', sliderNode]));
            sliderNode.appendChild(btnPrev);
            sliderNode.appendChild(btnNext);
        }

        if (sliderNode.classList.contains('slider--control-dots')) {
            createControlDots();
        }
        if (sliderNode.classList.contains('slider--control-arrows')) {
            createControlArrows();
        }
    }


    function changeSlide(...args) {
        const direction = args[0][0];
        const sliderNode = args[0][1];
        const sliderNodeOffsetWidth = sliderNode.offsetWidth;
        const slidesNode = sliderNode.querySelector('.slider__slides');
        const slidesCount = slidesNode.querySelectorAll('.slider__slide').length - 1;
        const currentSlide = parseInt(sliderNode.getAttribute('data-current-slide'), 10);

        switch (direction) {
            case 'prev':
                if (currentSlide === 0) {
                    slideTo(sliderNode, slidesNode, sliderNodeOffsetWidth, slidesCount);
                } else {
                    slideTo(sliderNode, slidesNode, sliderNodeOffsetWidth, currentSlide - 1);
                }
                break;

            case 'next':
                if (currentSlide < slidesCount) {
                    slideTo(sliderNode, slidesNode, sliderNodeOffsetWidth, currentSlide + 1);
                } else {
                    slideTo(sliderNode, slidesNode, sliderNodeOffsetWidth, 0);
                }
                break;
            default:
                break;
        }
    }

    function addInterval(sliderNode) {
        if (!sliderNode.hasAttribute('data-slider-change-interval')) {
            return;
        }
        const interval = parseFloat(sliderNode.getAttribute('data-slider-change-interval')) * 1000;
        if (interval > 0) {
            setInterval((changeSlide.bind(null, ['next', sliderNode])), interval);
        } else {
            console.log(RangeError('Warning: value of "data-slider-change-interval" must be above 0'));
        }
    }

    function startSlide(sliderNode) {
        if (!sliderNode.getAttribute('data-current-slide')) {
            sliderNode.setAttribute('data-current-slide', '0');
        } else {
            let n = parseInt(sliderNode.getAttribute('data-current-slide'), 10) - 1;
            slideTo(sliderNode, sliderNode.querySelector('.slider__slides'), sliderNode.offsetWidth, n);
        }
    }

    function controlActive(sliderNode, activeDot) {
        const dots = sliderNode.querySelectorAll('.slider__control-dot');
        if (activeDot.classList.contains('slider__control-dot')) {
            for (let node of dots) {
                node.classList.remove('slider__control-dot--active');
            }
            activeDot.classList.add('slider__control-dot--active');
            return;
        }
        const dotsPrev = sliderNode.querySelectorAll('.slider__control-dot-preview');
        for (let node of dotsPrev) {
            node.classList.remove('slider__control-dot-preview--active');
        }
        activeDot.classList.add('slider__control-dot-preview--active');
    }
}

function createSlider(sliderNode) {
    startSlide(sliderNode);
    createControl(sliderNode);
    addInterval(sliderNode);
}
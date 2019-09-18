class Carousel {
  constructor(id) {
    this.carouselNode = $(`#${id}`);
    this.carouselContent = this.carouselNode.find('.carousel-content');
    this.carouselContentItems = this.carouselContent.find(
      '.carousel-content-item',
    );

    this.carouselWidth = this.carouselNode.width();
    this.slidesCount = this.carouselContentItems.length;
    this.currentSlide = 0;

    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.slideTo = this.slideTo.bind(this);
  }

  initCarousel() {
    this.createControls();
    this.setActiveDot();
    this.slide();
  }

  setActiveDot() {
    this.carouselDots
      .children()
      .removeClass('carousel-control-dot__active')
      .filter(`[data-slide-idx='${this.currentSlide}']`)
      .addClass('carousel-control-dot__active');
  }

  createControls() {
    const prevBtn = $('<button/>', {
      text: '<',
      class: 'carousel-control-btn carousel-control-btn__prev',
      type: 'button',
      click: this.prevSlide,
    });

    const nextBtn = $('<button/>', {
      text: '>',
      class: 'carousel-control-btn carousel-control-btn__next',
      type: 'button',
      click: this.nextSlide,
    });

    const dots = $('<div/>', {
      class: 'carousel-control-dots-wrap',
      click: this.slideTo,
    }).append(
      ...this.carouselContentItems.map((idx) =>
        $('<button/>', {
          class: 'carousel-control-dot',
          type: 'button',
          'data-slide-idx': idx,
        }),
      ),
    );

    this.carouselDots = dots;

    this.carouselNode.append(prevBtn, nextBtn, dots);
  }

  slide() {
    this.carouselContent.css({
      transform: `translateX(-${this.carouselWidth * this.currentSlide}px)`,
    });
    this.setActiveDot();
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide + 1 === this.slidesCount ? 0 : this.currentSlide + 1;
    this.slide();
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide - 1 < 0 ? this.slidesCount - 1 : this.currentSlide - 1;
    this.slide();
  }

  slideTo(e) {
    if (e.target.classList.contains('carousel-control-dot')) {
      this.currentSlide = Number($(e.target).attr('data-slide-idx'));
      this.slide();
    }
  }
}

function createCarousels(...args) {
  args.forEach((item) => {
    const carousel = new Carousel(item);
    carousel.initCarousel();
  });
}

createCarousels('carousel01');

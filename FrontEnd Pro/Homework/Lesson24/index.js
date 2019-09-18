/* eslint-disable max-classes-per-file */
class Hero {
  constructor(imageSrc, controlKeys) {
    this.hero = $('<div/>', {
      class: 'hero',
    }).append(`<img class="hero-img" src="${imageSrc}"/>`);

    this.controlKeys = controlKeys;

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  initHero(anotherHero) {
    this.anotherHero = anotherHero;

    $('body').append(this.hero);
    $('body').keydown(this.onKeyDown);
  }

  getHeroSize() {
    return {
      x: this.hero.offset().left,
      y: this.hero.offset().top,
      width: this.hero.width(),
      height: this.hero.height(),
    };
  }

  isCollide() {
    const obj1Size = this.getHeroSize();
    const obj2Size = this.anotherHero.getHeroSize();

    const xCollision =
      obj1Size.x + obj1Size.width >= obj2Size.x &&
      obj1Size.x <= obj2Size.x + obj2Size.width;

    const yCollision =
      obj1Size.y + obj1Size.height >= obj2Size.y &&
      obj1Size.y <= obj2Size.y + obj2Size.height;

    return xCollision && yCollision;
  }

  sayOuch() {
    const position = this.getHeroSize();
    const phrase = $('<img/>', {
      src: './img/ouch.png',
    }).css({
      position: 'absolute',
      left: `${position.width / 2}px`,
      top: `${position.height * 0.1}px`,
      transform: 'translateX(-50%)',
      width: '80px',
    });

    $(this.hero).append(phrase);

    setTimeout(() => {
      $(phrase).remove();
    }, 300);
  }

  onKeyDown(e) {
    if (this.controlKeys.includes(e.which)) {
      const [left, right, top, bottom] = this.controlKeys;

      if (this.isCollide()) this.sayOuch();

      switch (e.which) {
        case left:
          this.hero.css({ left: '-=50px' });
          break;

        case right:
          this.hero.css({ left: '+=50px' });
          break;

        case top:
          this.hero.css({ top: '-=50px' });
          break;

        case bottom:
          this.hero.css({ top: '+=50px' });
          break;

        default:
          break;
      }
    }
  }
}

const sup = new Hero('./img/batman.png', [37, 39, 38, 40]);
const bat = new Hero('./img/superman.png', [65, 68, 87, 83]);

sup.initHero(bat);
bat.initHero(sup);

/* eslint-disable max-classes-per-file */
function getShortTime() {
  const date = new Date();
  return [date.getHours(), date.getMinutes()];
}

function getFullTime() {
  const date = new Date();
  return [date.getHours(), date.getMinutes(), date.getSeconds()];
}

function getFullDate() {
  const date = new Date();
  return [date.getDay(), date.getMonth(), date.getFullYear()];
}

class ShortTimeController {
  constructor() {
    this.interval = null;

    this.onClockLeftClick = () => {
      this.unmountClock();
      this.FullTimeController.mountClock();
    };

    this.onClockRightClick = (e) => {
      e.preventDefault();
      this.unmountClock();
      this.FullDateController.mountClock();
    };
  }

  initController(FullTimeController, FullDateController, View, clockElem) {
    this.FullTimeController = FullTimeController;
    this.FullDateController = FullDateController;
    this.View = View;
    this.clockElem = clockElem;
  }

  mountClock() {
    this.updateTime();
    this.interval = setInterval(() => this.updateTime(), 1000);
    this.clockElem.addEventListener('click', this.onClockLeftClick);
    this.clockElem.addEventListener('contextmenu', this.onClockRightClick);
  }

  unmountClock() {
    clearInterval(this.interval);
    this.clockElem.removeEventListener('click', this.onClockLeftClick);
    this.clockElem.removeEventListener('contextmenu', this.onClockRightClick);
  }

  updateTime() {
    this.View.render(getShortTime());
  }
}

class FullTimeController {
  constructor() {
    this.interval = null;

    this.onClockLeftClick = () => {
      this.unmountClock();
      this.ShortTimeController.mountClock();
    };
  }

  initController(ShortTimeController, View, clockElem) {
    this.ShortTimeController = ShortTimeController;
    this.View = View;
    this.clockElem = clockElem;
  }

  mountClock() {
    this.updateTime();
    this.interval = setInterval(() => this.updateTime(), 1000);
    this.clockElem.addEventListener('click', this.onClockLeftClick);
  }

  unmountClock() {
    clearInterval(this.interval);
    this.clockElem.removeEventListener('click', this.onClockLeftClick);
  }

  updateTime() {
    this.View.render(getFullTime());
  }
}

class FullDateController {
  constructor() {
    this.interval = null;

    this.onClockLeftClick = () => {
      this.unmountClock();
      this.ShortTimeController.mountClock();
    };
  }

  initController(ShortTimeController, View, clockElem) {
    this.ShortTimeController = ShortTimeController;
    this.View = View;
    this.clockElem = clockElem;
  }

  mountClock() {
    this.updateTime();
    this.interval = setInterval(() => this.updateTime(), 1000);
    this.clockElem.addEventListener('click', this.onClockLeftClick);
  }

  unmountClock() {
    clearInterval(this.interval);
    this.clockElem.removeEventListener('click', this.onClockLeftClick);
  }

  updateTime() {
    this.View.render(getFullDate());
  }
}

class View {
  static render(data) {
    clock.innerText = data
      .map((item) => (item < 10 ? `0${item}` : item))
      .join(':');
  }
}

const clock = document.createElement('div');
clock.style.userSelect = 'none';
clock.style.fontSize = '5em';
clock.style.textAlign = 'center';
clock.style.fontFamily = 'sans-serif';
document.body.append(clock);

const shortTimeController = new ShortTimeController();
const fullTimeController = new FullTimeController();
const fullDateController = new FullDateController();

shortTimeController.initController(
  fullTimeController,
  fullDateController,
  View,
  clock,
);

fullTimeController.initController(shortTimeController, View, clock);

fullDateController.initController(shortTimeController, View, clock);

shortTimeController.mountClock();

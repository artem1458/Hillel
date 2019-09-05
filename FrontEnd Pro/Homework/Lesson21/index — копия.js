/* eslint-disable max-classes-per-file */
class ShortTime {
  static getDate() {
    const date = new Date();
    return [date.getHours(), date.getMinutes()];
  }
}

class FullTime {
  static getDate() {
    const date = new Date();

    return [date.getHours(), date.getMinutes(), date.getSeconds()];
  }
}

class FullDate {
  static getDate() {
    const date = new Date();

    return [date.getDay(), date.getMonth(), date.getFullYear()];
  }
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

  initController(
    FullTimeController,
    FullDateController,
    ShortTime,
    View,
    clockElem,
  ) {
    this.FullTimeController = FullTimeController;
    this.FullDateController = FullDateController;
    this.ShortTime = ShortTime;
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
    this.View.render(this.ShortTime.getDate());
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

  initController(ShortTimeController, FullTime, View, clockElem) {
    this.ShortTimeController = ShortTimeController;
    this.FullTime = FullTime;
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
    this.View.render(this.FullTime.getDate());
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

  initController(ShortTimeController, FullDate, View, clockElem) {
    this.ShortTimeController = ShortTimeController;
    this.FullDate = FullDate;
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
    this.View.render(this.FullDate.getDate());
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
clock.style.fontSize = '3em';
clock.style.textAlign = 'center';
document.body.append(clock);

const shortTimeController = new ShortTimeController();
const fullTimeController = new FullTimeController();
const fullDateController = new FullDateController();

shortTimeController.initController(
  fullTimeController,
  fullDateController,
  ShortTime,
  View,
  clock,
);

fullTimeController.initController(shortTimeController, FullTime, View, clock);

fullDateController.initController(shortTimeController, FullDate, View, clock);

shortTimeController.mountClock();

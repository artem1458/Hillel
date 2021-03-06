class Student {
  constructor(name, surname, yearOfBirth, evaluations) {
    this.name = name;
    this.surname = surname;
    this.yearOfBirth = yearOfBirth;
    this.evaluations = evaluations;
    this.attendance = [...Array(25)];
  }

  getAge() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.yearOfBirth;
  }

  getAvarageMark() {
    const sum = this.evaluations.reduce((a, b) => a + b);
    return (sum / this.evaluations.length).toFixed();
  }

  present() {
    this._addAttendance(true);
  }

  absent() {
    this._addAttendance(false);
  }

  summary() {
    const avarageMark = this.getAvarageMark();
    const avarageAttendance = this._getAvarageAttendance();
    if (avarageMark > 90 && avarageAttendance > 0.9) {
      return 'Ути какой молодчинка!';
    }
    if (avarageMark < 90 && avarageAttendance < 0.9) {
      return 'Редиска!';
    }
    if (avarageMark > 90 || avarageAttendance > 0.9) {
      return 'Норм, но можно лучше';
    }
  }

  _addAttendance(isPresent) {
    if (this.attendance[this.attendance.length - 1] !== undefined) {
      console.warn('Список посещаемости полон.');
    } else {
      this.attendance[this.attendance.indexOf(undefined)] = isPresent;
    }
  }

  _getAvarageAttendance() {
    let countOfVisits = 0;
    this.attendance.forEach((element) => {
      if (element) {
        countOfVisits += 1;
      }
    });
    return (countOfVisits / this.attendance.length).toFixed(2);
  }
}

//Средний балл оценок больше 90, 100% посещаемость
const goodStudent = new Student('Ivan', 'Petrov', 1999, [100, 100, 70, 99]);

for (let i = 0; i < 25; i++) {
  goodStudent.present();
}

document.write(
  `<div>goodStudent age: ${goodStudent.getAge()}. goodStudent avarageMark: ${goodStudent.getAvarageMark()}. ${goodStudent.summary()}</div>`,
);

//Средний балл оценок меньше 90, 92% посещаемость
const middleStudent = new Student('Ivan', 'Evgenov', 1998, [100, 50, 50, 99]);

for (let i = 0; i < 23; i++) {
  middleStudent.present();
}

document.write(
  `<div>middleStudent age: ${middleStudent.getAge()}. middleStudent avarageMark: ${middleStudent.getAvarageMark()}. ${middleStudent.summary()}</div>`,
);

//Средний балл оценок меньше 90, ~50% посещаемость
const badStudent = new Student('Ivan', 'Petrov', 1997, [100, 50, 50, 99]);

for (let i = 0; i < 12; i++) {
  badStudent.present();
  badStudent.absent();
}

document.write(
  `<div>badStudent age: ${badStudent.getAge()}. badStudent avarageMark: ${badStudent.getAvarageMark()}. ${badStudent.summary()}</div>`,
);

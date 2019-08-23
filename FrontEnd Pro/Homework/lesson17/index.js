const humanList = [];
const studentList = [];

class Human {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  add(obj) {
    humanList.push(obj);
    View.viewItem(humanList);
  }
}

class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  add(obj) {
    studentList.push(obj);
    View.viewItem(studentList);
  }
}

class Creator {
  static createObj(Constructor, name, age) {
    const obj = new Constructor(name, age);

    obj.add(obj);
  }
}

class View {
  static viewItem(obj) {
    console.log(obj);
  }
}

class Checker {
  static askUser() {
    const [flag, ...props] = prompt('flag name age').split(' ');

    if (flag.toLowerCase() === 'h') {
      Creator.createObj(Human, ...props);
    } else if (flag.toLowerCase() === 's') {
      Creator.createObj(Student, ...props);
    } else {
      console.log('error');
    }
  }
}

Checker.askUser();

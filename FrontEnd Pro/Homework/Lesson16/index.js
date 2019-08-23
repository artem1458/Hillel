class First {
  run() {
    console.log('First run!');
  }

  go() {
    console.log('First go!');
  }

  say() {
    console.log('First say!');
  }
}

class Second {
  run() {
    console.log('Second run!');
  }

  go() {
    console.log('Second go!');
  }
}

class Third {
  static createObject(Con) {
    return new Con();
  }
}

const first = Third.createObject(First);
first.run();
first.go();
first.say();

const second = Third.createObject(Second);
second.run();
second.go();

class Fourth extends Third {}

console.log(Fourth.createObject);

/* eslint-disable max-classes-per-file */
class Model {
  constructor(controller) {
    this.controller = controller;
    this.state = ['James', 'Andrew', 'Alex', 'Gregory'];
  }

  updateState(list) {
    this.state = list;
    this.controller.onStateUpdate();
  }

  getState() {
    return [...this.state];
  }

  changeStudent(studentNames) {
    const oldStudentsList = this.getState();

    const [oldStudent, newStudent] = studentNames;

    const idx = oldStudentsList.indexOf(oldStudent);

    let newStudentsList;

    if (idx === -1) {
      newStudentsList = [...oldStudentsList, newStudent];
    } else {
      newStudentsList = [
        ...oldStudentsList.slice(0, idx),
        newStudent,
        ...oldStudentsList.slice(idx + 1),
      ];
    }

    this.updateState(newStudentsList);
  }
}

class Controller {
  init(model, view) {
    this.model = model;
    this.view = view;

    view.render(model.getState());
  }

  changeData(data) {
    this.model.changeStudent(data);
  }

  onStateUpdate() {
    this.view.render(this.model.getState());
  }
}

class View {
  constructor(controller) {
    this.controller = controller;
  }

  onBtnClick() {
    const oldStudentName = document.getElementById('old_student_name').value;
    const newStudentName = document.getElementById('new_student_name').value;

    this.controller.changeData([oldStudentName, newStudentName]);
  }

  render(data) {
    const list = document.getElementById('students_list');

    list.innerHTML = data.map((el) => `<li>${el}</li>`).join('');
  }
}

const controller = new Controller();
const view = new View(controller);
const model = new Model(controller);

controller.init(model, view);

const btn = document.getElementById('btn');
btn.addEventListener('click', () => view.onBtnClick());

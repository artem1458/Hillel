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

  changeStudent() {
    const oldStudentsList = this.getState();

    const oldStudentName = document.getElementById('old_student_name').value;
    const newStudentName = document.getElementById('new_student_name').value;

    const idx = oldStudentsList.indexOf(oldStudentName);

    let newStudentsList;

    if (idx === -1) {
      newStudentsList = [...oldStudentsList, newStudentName];
    } else {
      newStudentsList = [
        ...oldStudentsList.slice(0, idx),
        newStudentName,
        ...oldStudentsList.slice(idx + 1),
      ];
    }

    this.updateState(newStudentsList);
  }
}

class Controller {
  init(model, View) {
    this.model = model;
    this.View = View;

    this.View.render(model.getState());
  }

  replaceStudents() {
    this.model.changeStudent();
  }

  onStateUpdate() {
    this.View.render(this.model.getState());
  }
}

class View {
  static render(data) {
    const list = document.getElementById('students_list');

    list.innerHTML = data.map((el) => `<li>${el}</li>`).join('');
  }
}

const controller = new Controller();
const model = new Model(controller);

controller.init(model, View);

const btn = document.getElementById('btn');
btn.addEventListener('click', () => controller.replaceStudents());

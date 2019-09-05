/* eslint-disable max-classes-per-file */

class Store {
  constructor(state) {
    this.state = state;
  }

  getState() {
    return { ...this.state };
  }

  updateState(state) {
    this.state = state;
  }

  changeCurentInput({ name, value }) {
    const state = this.getState();

    let newState;

    if (name === 'firstName') {
      newState = { ...state, currentInputFirstName: value };
    } else if (name === 'lastName') {
      newState = { ...state, currentInputLastName: value };
    } else {
      newState = state;
    }

    this.updateState(newState);
  }

  addPerson() {
    const state = this.getState();

    const { currentInputFirstName, currentInputLastName, personList } = state;

    const person = {
      firstName: currentInputFirstName,
      lastName: currentInputLastName,
    };

    const newPersonList = [...personList, person];

    const newState = { ...state, personList: newPersonList };

    this.updateState(newState);
  }

  removePerson() {
    const state = this.getState();

    const { currentInputFirstName, currentInputLastName, personList } = state;

    const idx = personList.findIndex(
      ({ firstName, lastName }) =>
        firstName === currentInputFirstName &&
        lastName === currentInputLastName,
    );

    if (idx === -1) {
      alert('Такой человек не найден');
    } else {
      const newPersonList = [
        ...personList.slice(0, idx),
        ...personList.slice(idx + 1),
      ];

      const newState = { ...state, personList: newPersonList };

      this.updateState(newState);
    }
  }
}

class Controller {
  init(store, view) {
    this.store = store;
    this.view = view;
  }

  onInputChange({ target: { name, value } }) {
    this.store.changeCurentInput({ name, value });
  }

  onAddPerson() {
    this.store.addPerson();
  }

  onRemovePerson() {
    this.store.removePerson();
  }

  onShowPersonList() {
    const { personList } = this.store.getState();

    this.view.showPersonList(personList);
  }
}

class View {
  static showPersonList(personList) {
    list.append = personList
      .map(({ firstName, lastName }) => `<li>${firstName} ${lastName}</li>`)
      .join('');
  }
}

const initialState = {
  personList: [],
  currentInputFirstName: '',
  currentInputLastName: '',
};

const store = new Store(initialState);
const controller = new Controller();
controller.init(store, View);

const form = document.createElement('form');

const firstNameInput = document.createElement('input');
firstNameInput.name = 'firstName';
firstNameInput.type = 'text';
firstNameInput.placeholder = 'Имя';

const lastNameInput = document.createElement('input');
lastNameInput.name = 'lastName';
lastNameInput.type = 'text';
lastNameInput.placeholder = 'Фамилия';

const addBtn = document.createElement('button');
addBtn.type = 'button';
addBtn.innerText = 'Добавить';

const removeBtn = document.createElement('button');
removeBtn.type = 'button';
removeBtn.innerText = 'Удалить';

const viewBtn = document.createElement('button');
viewBtn.type = 'button';
viewBtn.innerText = 'Отобразить';

form.append(firstNameInput, lastNameInput, addBtn, removeBtn, viewBtn);

const list = document.createElement('ol');

firstNameInput.addEventListener('change', (e) => controller.onInputChange(e));
lastNameInput.addEventListener('change', (e) => controller.onInputChange(e));
addBtn.addEventListener('click', () => controller.onAddPerson());
removeBtn.addEventListener('click', () => controller.onRemovePerson());
viewBtn.addEventListener('click', () => controller.onShowPersonList());

document.body.append(form, list);

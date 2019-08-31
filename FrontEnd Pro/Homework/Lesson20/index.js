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

    if (name === 'name') {
      newState = { ...state, currentInputName: value };
    } else if (name === 'surname') {
      newState = { ...state, currentInputSurname: value };
    } else {
      newState = state;
    }

    this.updateState(newState);
  }

  addPerson() {
    const state = this.getState();

    const { currentInputName, currentInputSurname, personList } = state;

    const person = { name: currentInputName, surname: currentInputSurname };

    const newPersonList = [...personList, person];

    const newState = { ...state, personList: newPersonList };

    this.updateState(newState);
  }

  removePerson() {
    const state = this.getState();

    const { currentInputName, currentInputSurname, personList } = state;

    const idx = personList.findIndex(
      ({ name, surname }) =>
        name === currentInputName && surname === currentInputSurname,
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
    list.innerHTML = personList
      .map(({ name, surname }) => `<li>${name} ${surname}</li>`)
      .join('');
  }
}

const initialState = {
  personList: [],
  currentInputName: '',
  currentInputSurname: '',
};

const store = new Store(initialState);
const controller = new Controller();
controller.init(store, View);

const form = document.createElement('form');

const nameInput = document.createElement('input');
nameInput.name = 'name';
nameInput.type = 'text';
nameInput.placeholder = 'Имя';

const surnameInput = document.createElement('input');
surnameInput.name = 'surname';
surnameInput.type = 'text';
surnameInput.placeholder = 'Фамилия';

const addBtn = document.createElement('button');
addBtn.type = 'button';
addBtn.innerText = 'Добавить';

const removeBtn = document.createElement('button');
removeBtn.type = 'button';
removeBtn.innerText = 'Удалить';

const viewBtn = document.createElement('button');
viewBtn.type = 'button';
viewBtn.innerText = 'Отобразить';

form.appendChild(nameInput);
form.appendChild(surnameInput);
form.appendChild(addBtn);
form.appendChild(removeBtn);
form.appendChild(viewBtn);

const list = document.createElement('ol');

nameInput.addEventListener('change', (e) => controller.onInputChange(e));
surnameInput.addEventListener('change', (e) => controller.onInputChange(e));
addBtn.addEventListener('click', () => controller.onAddPerson());
removeBtn.addEventListener('click', () => controller.onRemovePerson());
viewBtn.addEventListener('click', () => controller.onShowPersonList());

document.body.appendChild(form);
document.body.appendChild(list);

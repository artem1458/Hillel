/* eslint-disable max-classes-per-file */

function createProductCard({ name, price, id }) {
  const item = document.createElement('div');
  item.classList.add('card', 'p-3', 'm-2', 'border', 'border-suc');
  item.style.width = '150px';

  const itemHeading = document.createElement('h5');
  itemHeading.classList.add('card-title');
  itemHeading.innerText = name;

  const itemPrice = document.createElement('h6');
  itemPrice.classList.add('card-subtitle', 'mb-2');
  itemPrice.innerText = `Price: ${price}`;

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.classList.add('btn', 'btn-primary', 'add-btn');
  addBtn.setAttribute('data-item-id', `${id}`);
  addBtn.innerText = 'Add to cart';

  item.append(itemHeading, itemPrice, addBtn);

  return item;
}

function createCartItem({ name, price, count, id }) {
  const listItem = document.createElement('li');
  listItem.classList.add('d-flex', 'justify-content-between', 'border', 'p-2');

  const itemName = document.createElement('span');
  itemName.classList.add('mx-2');
  itemName.innerText = name;

  const totalPrice = document.createElement('span');
  totalPrice.classList.add('mx-2');
  totalPrice.innerText = `Total price: ${price * count}`;

  const decBtn = document.createElement('button');
  decBtn.type = 'button';
  decBtn.classList.add('btn', 'btn-outline-info', 'dec-btn', 'mx-2');
  decBtn.setAttribute('data-item-id', `${id}`);
  decBtn.innerText = '-';

  const incBtn = document.createElement('button');
  incBtn.type = 'button';
  incBtn.classList.add('btn', 'btn-outline-info', 'inc-btn', 'mx-2');
  incBtn.setAttribute('data-item-id', `${id}`);
  incBtn.innerText = '+';

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.classList.add('btn', 'btn-outline-danger', 'del-btn', 'mx-2');
  delBtn.setAttribute('data-item-id', `${id}`);
  delBtn.innerText = 'DEL';

  const totalCount = document.createElement('span');
  totalCount.innerText = count;

  const infoWrap = document.createElement('div');
  infoWrap.append(itemName, totalPrice);

  const countWrap = document.createElement('div');
  countWrap.append(decBtn, totalCount, incBtn, delBtn);

  listItem.append(infoWrap, countWrap);

  return listItem;
}

class ShoppingListModel {
  constructor() {
    this.shoppingItemsData = [
      { name: 'Adidas', price: 1000, id: 0 },
      { name: 'Nike', price: 1200, id: 1 },
      { name: 'Puma', price: 1300, id: 2 },
      { name: 'Tommy Hilfiger', price: 1300, id: 3 },
      { name: 'Balenciaga', price: 1300, id: 4 },
      { name: 'New Balance', price: 1300, id: 5 },
      { name: 'Zara', price: 1300, id: 6 },
      { name: 'Prada', price: 1300, id: 7 },
    ];
  }

  getItemsList() {
    return this.shoppingItemsData;
  }
}

class ShoppingListController {
  constructor() {
    this.onAddBtnClick = (e) => {
      if (e.target.classList.contains('add-btn')) {
        const selectedItem = this.shoppingListModel
          .getItemsList()
          .find(
            ({ id }) => id === Number(e.target.getAttribute('data-item-id')),
          );

        this.cartController.addToCart(selectedItem);
      }
    };
  }

  initController(shoppingListModel, cartController, shoppingListView) {
    this.shoppingListModel = shoppingListModel;
    this.cartController = cartController;
    this.shoppingListView = shoppingListView;

    document
      .getElementById('items-list')
      .addEventListener('click', this.onAddBtnClick);
    this.showItems();
  }

  showItems() {
    this.shoppingListView.render(this.shoppingListModel.getItemsList());
  }
}

class ShoppingListView {
  static render(itemsList) {
    document
      .getElementById('items-list')
      .append(...itemsList.map((item) => createProductCard(item)));
  }
}

class CartModel {
  constructor(cartController) {
    this.cartController = cartController;

    this.cartData = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }

  getCartData() {
    return this.cartData;
  }

  updateCartData() {
    this.cartData = JSON.parse(localStorage.getItem('cart'));
    this.cartController.onCartModelUpdate();
  }

  setCartLocalStorage(list) {
    localStorage.setItem('cart', JSON.stringify(list));
    this.updateCartData();
  }

  addItemToCart(item) {
    const oldList = this.getCartData();

    const idx = oldList.findIndex(({ id }) => id === item.id);

    let newList;

    if (idx === -1) {
      newList = [...oldList, { ...item, count: 1 }];
    } else {
      newList = [
        ...oldList.slice(0, idx),
        { ...item, count: oldList[idx].count + 1 },
        ...oldList.slice(idx + 1),
      ];
    }

    this.setCartLocalStorage(newList);
  }

  removeItemFromCart(itemId) {
    const oldList = this.getCartData();

    const idx = oldList.findIndex(({ id }) => id === itemId);

    let newList;

    if (idx > -1) {
      newList = [...oldList.slice(0, idx), ...oldList.slice(idx + 1)];
      this.setCartLocalStorage(newList);
    }
  }

  incItemCount(itemId) {
    const oldList = this.getCartData();

    const idx = oldList.findIndex(({ id }) => id === itemId);

    let newList;

    if (idx > -1) {
      const oldItem = oldList[idx];

      newList = [
        ...oldList.slice(0, idx),
        { ...oldItem, count: oldList[idx].count + 1 },
        ...oldList.slice(idx + 1),
      ];
      this.setCartLocalStorage(newList);
    }
  }

  decItemCount(itemId) {
    const oldList = this.getCartData();

    const idx = oldList.findIndex(({ id }) => id === itemId);

    let newList;

    if (idx > -1 && oldList[idx].count - 1 < 1) {
      this.removeItemFromCart(itemId);
    } else if (idx > -1) {
      const oldItem = oldList[idx];

      newList = [
        ...oldList.slice(0, idx),
        { ...oldItem, count: oldList[idx].count - 1 },
        ...oldList.slice(idx + 1),
      ];
      this.setCartLocalStorage(newList);
    }
  }
}

class CartController {
  constructor() {
    this.onControlBtnClick = (e) => {
      if (e.target.classList.contains('inc-btn')) {
        this.cartModel.incItemCount(
          Number(e.target.getAttribute('data-item-id')),
        );
      } else if (e.target.classList.contains('dec-btn')) {
        this.cartModel.decItemCount(
          Number(e.target.getAttribute('data-item-id')),
        );
      } else if (e.target.classList.contains('del-btn')) {
        this.cartModel.removeItemFromCart(
          Number(e.target.getAttribute('data-item-id')),
        );
      }
    };
  }

  initController(cartModel, cartView) {
    this.cartModel = cartModel;
    this.cartView = cartView;

    document
      .getElementById('cart')
      .addEventListener('click', this.onControlBtnClick);
    this.onCartModelUpdate();
  }

  addToCart(itemId) {
    this.cartModel.addItemToCart(itemId);
  }

  onCartModelUpdate() {
    this.cartView.render(this.cartModel.getCartData());
  }
}

class CartView {
  static render(list) {
    const cartElem = document.getElementById('cart');
    cartElem.innerHTML = null;
    cartElem.append(...list.map((item) => createCartItem(item)));
  }
}

const shoppingListModel = new ShoppingListModel();
const shoppingListController = new ShoppingListController();

const cartController = new CartController();
const cartModel = new CartModel(cartController);

shoppingListController.initController(
  shoppingListModel,
  cartController,
  ShoppingListView,
);
cartController.initController(cartModel, CartView);

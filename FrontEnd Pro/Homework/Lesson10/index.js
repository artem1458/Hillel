const user = {
  name: 'Fedor',
  surname: 'Ivanov',
};

function swapKeys(obj) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    result[obj[key]] = key;
  });

  return result;
}

console.log(swapKeys(user));

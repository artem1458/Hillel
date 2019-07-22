const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function getRandomString() {
  const symbols = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let result = '';

  for (let i = 0; i < getRandomNumber(10, 30); i++) {
    result += symbols.charAt(getRandomNumber(0, symbols.length));
  }

  return result;
}

console.log(getRandomString());

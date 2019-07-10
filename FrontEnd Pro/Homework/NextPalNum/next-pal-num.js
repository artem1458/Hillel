function getNextPalNum(startNum) {
  let result = startNum + 1;
  while (result !== Number(result.toString().split('').reverse().join(''))) {
    result++;
  }
  return result;
}

console.log(getNextPalNum(545666));
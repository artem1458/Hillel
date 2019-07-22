function findUniqueSymbol(str) {
  const list = str.split('');

  let result = '';

  list.forEach((element) => {
    if (!result && list.indexOf(element) === list.lastIndexOf(element)) {
      result = element;
    }
  });

  return result;
}

console.log(findUniqueSymbol('aaggrr55hhjkkdl'));

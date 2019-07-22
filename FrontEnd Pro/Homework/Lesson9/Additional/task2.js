function findMostFrequentEl(list) {
  const filteredList = list.sort().filter((element, idx, arr) => {
    if (element !== arr[idx + 1]) {
      return element;
    }
  });

  let countList = [null, 0];

  filteredList.forEach((element) => {
    const localCountList = [element, 0];

    list.forEach((element2) => {
      if (element === element2) {
        localCountList[0] = element2;
        localCountList[1]++;
      }
    });

    if (localCountList[1] >= countList[1]) {
      countList = localCountList.map((v) => v);
    }
  });

  return `The most frequent item is "${countList[0]}", it met ${
    countList[1]
  } times.`;
}

const arr = ['a', 'a', 'b', 'c', 'd', 'a'];

console.log(findMostFrequentEl(arr));

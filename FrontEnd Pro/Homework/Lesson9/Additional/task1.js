const permutations = (inputArr) => {
  let list = [];
  const list2 = inputArr.split('');

  const permute = (arr, m) => {
    if (arr.length === 0) {
      list.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(list2, []);

  let result = [];

  list.forEach((e) => {
    result.push(e.join(''));
  });
  return result.sort().filter((e, i, a) => {
    if (e !== a[i + 1]) {
      return e;
    }
  });
};
console.log(permutations('aabb'));

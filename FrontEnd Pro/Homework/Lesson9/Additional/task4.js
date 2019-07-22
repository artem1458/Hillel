/* Решение Без рекурсии */

function sumList(list) {
  const result = list
    .join()
    .split(',')
    .reduce((previous, current) => Number(previous) + Number(current));

  return result;
}

console.log(sumList([[[1, 2], [[[[[[[3, 4]]]]]]]], [[5, 6], [7, 8]]]));

/* Решение С рекурсией */

function makeFlatList(list, resultList) {
  list.forEach((element) => {
    if (Array.isArray(element)) {
      makeFlatList(element, resultList);
    } else {
      resultList.push(element);
    }
  });
  return resultList;
}

function sumListRec(list) {
  const result = makeFlatList(list, []).reduce(
    (previous, current) => previous + current,
  );

  return result;
}

console.log(sumListRec([[[1, 2], [[[[[[[3, 4]]]]]]]], [[5, 6], [7, 8]]]));

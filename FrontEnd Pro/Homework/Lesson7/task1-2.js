var arr = [
  100121,
  2,
  undefined,
  false,
  undefined,
  NaN,
  NaN,
  2,
  null,
  'string',
  false,
  NaN,
  'string',
  100121,
  'word',
  NaN,
  'word2',
  NaN,
  'word2',
  null,
];

console.log(arr);

arr.sort(); //Сортируем для корректной проверки на NaN

for (var i = 0; i < arr.length;) {
  if (arr.indexOf(arr[i], i + 1) > -1) {
    console.log(arr.splice(i, 1)[0]);
  } else if (Number.isNaN(arr[i]) && Number.isNaN(arr[i + 1])) {
    console.log(arr.splice(i, 1)[0]);
  } else i++;
}

console.log(arr);

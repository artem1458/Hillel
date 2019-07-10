// var arr = [
//   100121,
//   2,
//   undefined,
//   false,
//   undefined,
//   NaN,
//   NaN,
//   2,
//   null,
//   'string',
//   false,
//   NaN,
//   'string',
//   100121,
//   'word',
//   NaN,
//   'word2',
//   NaN,
//   'word2',
//   null,
// ];

// var arr2 = [
//   100121,
//   2,
//   undefined,
//   false,
//   undefined,
//   NaN,
//   NaN,
//   2,
//   null,
//   'string',
//   false,
//   NaN,
//   'string',
//   100121,
//   'word',
//   NaN,
//   'word2',
//   NaN,
//   'word2',
//   null,
// ];

// arr.sort();
// arr2.sort();
// console.log(arr);

// for (var i = 0; i < arr.length;) {
//   if (Number.isNaN(arr[i]) && Number.isNaN(arr[i + 1])) {
//     console.log(arr.splice(i, 1)[0]);
//   } else if (arr[i] === arr[i + 1] && i !== arr.length - 1) {
//     console.log(arr.splice(i, 1)[0]);
//   } else {
//     i++;
//   }
// }

// console.log(arr);

// console.log('-------------------------------------');

// for (var i = 0; i < arr2.length; ) {
//   if (arr2.indexOf(arr2[i], i + 1) > -1) {
//     console.log(arr2.splice(i, 1)[0]);
//   } else if (Number.isNaN(arr2[i]) && Number.isNaN(arr2[i + 1])) {
//     console.log(arr2.splice(i, 1)[0]);
//   } else i++;
// }

// console.log(arr2);

var str = 'hello MY name is JavaScript and I like your code styLe';
var reg = /[A-Z]/;

var arr = str.split(' ');

var word = [];

var result = [];

for (var i = 0; i < arr.length; i++) {
  if (!reg.test(arr[i])) {
    result.push(arr[i]);
  } else {
    word = arr[i].split('');

    for (var j = 0; j < word.length; j++) {
      if (reg.test(word[j])) {
        word[j] = word[j].toLowerCase();
      } else {
        word[j] = word[j].toUpperCase();
      }
    }

    result.push(word.join(''));
  }
}
result = result.join(' ');

console.log(result);

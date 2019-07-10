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

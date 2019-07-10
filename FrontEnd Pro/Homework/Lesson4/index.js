var firstList = [];
var secondList = [1, 2, 3];
firstList.push(prompt('Введите первую строку'));
firstList.push(prompt('Введите вторую строку'));
firstList.push(prompt('Введите третью строку'));
var result = firstList.concat(secondList).join('').length;
alert(result);
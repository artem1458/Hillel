var firstArr = ['stringsss', 12, 'assksksks', 100, 500, 'str'];
var secondArr = [5, 'stringsss', 12, 'assksksks', 10, 100, 500, 'str', 'sk'];

function compareLists(firstList, secondList) {
  var result = [];

  for (var i = 0; i < firstList.length; i++) {
    if (secondList.indexOf(firstList[i]) > -1) {
      var el = firstList[i];
      switch (typeof el) {
        case 'number':
          el = el % 5 === 0 ? 'FIVE' : el;
          break;
        case 'string':
          el = el.length > 5 ? 'FSTR' : el;
          break;
        default:
          break;
      }
      result.push(el);
    }
  }

  return result;
}

console.log(compareLists(firstArr, secondArr));

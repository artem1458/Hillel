const person1 = {
  firstName: 'Peter',
  lastName: 'Kramer',
  age: 20,
};

const person2 = {
  firstName: 'Peter',
  lastName: 'Kramer',
  age: 30,
  fly: false,
};

function compareObjectsAndSwap(obj1, obj2) {
  const result = {};
  Object.entries(obj1)
    .filter(([firstKey, firstValue]) =>
      Object.entries(obj2).find(
        ([secondKey, secondValue]) =>
          firstKey === secondKey && firstValue === secondValue,
      ),
    )
    .forEach(([key, value]) => Object.assign(result, { [value]: key }));
  return result;
}

console.log(compareObjectsAndSwap(person1, person2));

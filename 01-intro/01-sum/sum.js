const isNumber = (value) => typeof value === 'number';

function sum(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError('Arguments must be numbers');
  }

  return a + b;
}

module.exports = sum;

// calculator.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b !== 0 ? a / b : 'Cannot divide by zero');

// Export an object containing all functions
module.exports = {
  add,
  subtract,
  multiply,
  divide
};
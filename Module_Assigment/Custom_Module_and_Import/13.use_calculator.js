// use_calculator.js

const { add, subtract, multiply, divide } = require('./calculator');

console.log(`Add: 10 + 5 = ${add(10, 5)}`);
console.log(`Subtract: 10 - 5 = ${subtract(10, 5)}`);
console.log(`Multiply: 10 * 5 = ${multiply(10, 5)}`);
console.log(`Divide: 10 / 5 = ${divide(10, 5)}`);
console.log(`Divide by Zero: ${divide(10, 0)}`);
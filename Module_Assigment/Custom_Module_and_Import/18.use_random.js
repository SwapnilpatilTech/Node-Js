// use_random.js
const getRandomNumber = require('./random_generator');

const min = 10;
const max = 50;

const randomNumber = getRandomNumber(min, max);
console.log(`Random number between ${min} and ${max} (inclusive): ${randomNumber}`);
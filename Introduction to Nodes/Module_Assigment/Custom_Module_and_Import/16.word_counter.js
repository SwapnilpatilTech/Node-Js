// use_word_counter.js
const countWords = require('./word_counter');

const text1 = 'Node.js is awesome for backend development.';
const count1 = countWords(text1);
console.log(`Text 1: "${text1}"\nWord Count: ${count1}`);

const text2 = '   Hello   world!    ';
const count2 = countWords(text2);
console.log(`\nText 2: "${text2}"\nWord Count: ${count2}`);
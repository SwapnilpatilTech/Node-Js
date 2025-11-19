// app.js - Combining custom modules for a complete application

// Import Custom Modules
const { add, multiply } = require('./calculator');
const printName = require('./name_printer');
const { getTodayDate } = require('./date_utility');
const getRandomNumber = require('./random_generator');
const countWords = require('./word_counter');
const { checkAndRead, checkAndWrite } = require('./file_checker');
console.log('--- Combined Application Start ---');
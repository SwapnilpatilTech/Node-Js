// use_date.js
const { getTodayDate, getCurrentTime, getDateTime } = require('./date_utility');

console.log(`Today's Date: ${getTodayDate()}`);
console.log(`Current Time: ${getCurrentTime()}`);
console.log(`Full Date and Time: ${getDateTime()}`);
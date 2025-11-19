const fs = require('fs');

const contentToAppend = '\nThis content was appended later.';

try {

  fs.appendFileSync('my_file.txt', contentToAppend);
  console.log('Successfully appended content to my_file.txt');
} catch (err) {
  console.error('Error appending file:', err);
}
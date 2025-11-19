const fs = require('fs');

try {
  fs.writeFileSync('my_file.txt', 'Hello Node.js! This is the initial content.');
  console.log('Successfully wrote to my_file.txt');
} catch (err) {
  console.error('Error writing file:', err);
}
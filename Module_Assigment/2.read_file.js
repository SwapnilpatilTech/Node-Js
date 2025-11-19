const fs = require('fs');

try {

  const data = fs.readFileSync('my_file.txt', 'utf8');
  console.log('--- Content of my_file.txt ---');
  console.log(data);
  console.log('------------------------------');
} catch (err) {
  console.error('Error reading file:', err);
}
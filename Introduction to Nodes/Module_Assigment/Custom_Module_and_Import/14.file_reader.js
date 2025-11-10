// file_reader.js
const fs = require('fs');

const readData = (filename) => {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    console.log(`[Reader] Data read from ${filename}:`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(`[Reader] Error reading file: ${err}`);
    return null;
  }
};

module.exports = readData;
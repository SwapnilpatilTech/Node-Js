// file_writer.js
const fs = require('fs');

const writeData = (filename, data) => {
  try {
    fs.writeFileSync(filename, data);
    console.log(`[Writer] Data successfully written to ${filename}`);
  } catch (err) {
    console.error(`[Writer] Error writing to file: ${err}`);
  }
};

module.exports = writeData;
// file_checker.js
const fs = require('fs');

const checkAndRead = (filename) => {
  
  if (fs.existsSync(filename)) {
    console.log(`File '${filename}' exists. Reading content...`);
    try {
      const data = fs.readFileSync(filename, 'utf8');
      return data;
    } catch (err) {
      console.error(`Error reading file: ${err.message}`);
      return null;
    }
  } else {
    console.log(`File '${filename}' does NOT exist. Aborting read operation.`);
    return null;
  }
};

const checkAndWrite = (filename, content) => {
  
  try {
    fs.writeFileSync(filename, content);
    console.log(`File '${filename}' successfully created/overwritten with data.`);
    return true;
  } catch (err) {
    console.error(`Error writing file: ${err.message}`);
    return false;
  }
};

module.exports = {
  checkAndRead,
  checkAndWrite
};
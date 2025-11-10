// use_checker.js
const { checkAndRead, checkAndWrite } = require('./file_checker');

const existingFile = 'my_file.txt'; 
const newFile = 'temp_checked.txt';


const content = checkAndRead(existingFile);
if (content) {
  console.log(`Content read: ${content.substring(0, 30)}...`);
}


checkAndWrite(newFile, 'This was written after a file existence check.');

// Read the newly written file
checkAndRead(newFile);
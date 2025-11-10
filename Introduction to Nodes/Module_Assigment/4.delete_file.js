const fs = require('fs');
const fileName = 'file_to_delete.txt'; 

try {
  fs.writeFileSync(fileName, 'This file is about to be deleted.');
  console.log(`Created dummy file: ${fileName}`);
} catch (err) {
  console.error('Error creating dummy file:', err);
  return; 
}

// Delete the file
try {
  fs.unlinkSync(fileName); 
  console.log(`Successfully deleted file: ${fileName}`);
} catch (err) {
 
  if (err.code === 'ENOENT') {
    console.log(`File not found: ${fileName}`);
  } else {
    console.error('Error deleting file:', err);
  }
}
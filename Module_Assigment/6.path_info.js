const path = require('path');

const absolutePath = __filename; 


const fileName = path.basename(absolutePath);

console.log(`\nFile Name and Extension: \n${fileName}`);
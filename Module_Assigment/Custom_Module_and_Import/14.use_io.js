// use_io.js
const writeData = require('./file_writer');
const readData = require('./file_reader');

const targetFile = 'shared_data.txt';
const content = 'This data was written by one module and read by another.';

writeData(targetFile, content);
readData(targetFile);
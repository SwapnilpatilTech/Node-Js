const os = require('os');

console.log('--- Operating System Information ---');
console.log(`Platform: ${os.platform()}`);
console.log(`CPU Architecture: ${os.arch()}`);
const totalMemoryBytes = os.totalmem();
const totalMemoryGB = (totalMemoryBytes / 1024 / 1024 / 1024).toFixed(2);
console.log(`Total Memory: ${totalMemoryGB} GB (${totalMemoryBytes} bytes)`);
console.log('------------------------------------');
// logger.js
const fs = require('fs');
const logFile = 'app_log.txt';

const setupLogger = () => {
  const originalLog = console.log;

  // Override
  console.log = function (message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    originalLog.apply(console, arguments);

    // 2. Log to file
    fs.appendFile(logFile, logMessage, (err) => {
      if (err) {
      
        originalLog('ERROR: Failed to write to log file!');
      }
    });
  };

  console.log(`Logger setup complete. Logging to ${logFile}`);
};

module.exports = setupLogger;
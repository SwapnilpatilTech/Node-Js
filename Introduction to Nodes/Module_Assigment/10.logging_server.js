const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3002;
const logFile = 'server_log.txt';

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const dateTime = new Date().toISOString();
    const logEntry = `[${dateTime}] GET request received from ${req.socket.remoteAddress}\n`;

    // Asynchronously append the log entry to the file
    fs.appendFile(logFile, logEntry, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error\n');
        return;
      }

      console.log(`Logged request at: ${dateTime}`);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Request logged successfully.\n');
    });
  } else {
    // Handle other methods
    res.statusCode = 405; // Method Not Allowed
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method Not Allowed.\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Logging Server running at http://${hostname}:${port}/`);
});
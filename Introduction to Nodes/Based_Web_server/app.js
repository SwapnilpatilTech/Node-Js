// Import core modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define server port
const PORT = 5000;

// Define base directories
const pagesDir = path.join(__dirname, 'pages');
const logFile = path.join(__dirname, 'logs', 'server.log');

// Helper function to log requests
function logRequest(url) {
  const logEntry = `[${new Date().toLocaleString()}] Requested: ${url}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Error writing to log:', err);
  });
}

// Helper function to serve HTML pages
function servePage(res, filename, statusCode = 200) {
  const filePath = path.join(pagesDir, filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  logRequest(req.url); // Log each request

  // Routing
  switch (req.url) {
    case '/':
      servePage(res, 'index.html');
      break;
    case '/about':
      servePage(res, 'about.html');
      break;
    case '/contact':
      servePage(res, 'contact.html');
      break;
    case '/data':
      // Bonus route for JSON response
      const jsonData = {
        name: 'File-Based Web Server',
        author: 'Swapnil Patil',
        version: '1.0.0',
        message: 'Hello from /data endpoint!',
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(jsonData, null, 2));
      break;
    default:
      servePage(res, '404.html', 404);
      break;
  }
});

// Ensure logs directory exists
fs.mkdir(path.join(__dirname, 'logs'), { recursive: true }, (err) => {
  if (err) console.error('Error creating logs folder:', err);
});

// Start server
server.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});


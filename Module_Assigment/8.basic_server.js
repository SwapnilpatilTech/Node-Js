const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const server = http.createServer((req, res) => {
  // Set the response header
  res.statusCode = 200; // HTTP Status OK
  res.setHeader('Content-Type', 'text/plain');

  // Write the response body
  res.end('Server is Running Successfully\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//  visit http://127.0.0.1:3000/ in your browser.
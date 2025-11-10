const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  // Data to send as JSON
  const data = {
    message: 'Data retrieved successfully',
    timestamp: new Date().toISOString(),
    api_version: '1.0'
  };

  // Set the response header for JSON
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

 
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`JSON Server running at http://${hostname}:${port}/`);
});
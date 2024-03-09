const http = require('http');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Set the HTTP response header with status code 200 (OK) and content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send the "Hello NIBM" message as the response body
  res.end('Hello NIBM\n');
});

// Listen for incoming requests on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const fs = require('fs');
const http = require('http');

const visitsFile = 'visits.txt';

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Increment visit count and display
  incrementVisits((err, count) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Welcome! You are visitor number ${count}`);
  });
});

// Function to increment visit count
function incrementVisits(callback) {
  fs.readFile(visitsFile, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      callback(err);
      return;
    }
    let count = parseInt(data) || 0;
    count++;
    fs.writeFile(visitsFile, count.toString(), err => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, count);
    });
  });
}

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

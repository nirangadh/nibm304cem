const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else if (req.method === 'PUT') {
        handlePutRequest(req, res);
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const handleGetRequest = (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is the home page.');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About us page.');
    } else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contact us page.');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
};

const handlePostRequest = (req, res) => {
    // Handle POST request logic here
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Handling POST request');
};

const handlePutRequest = (req, res) => {
    // Handle PUT request logic here
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Handling PUT request');
};

const handleDeleteRequest = (req, res) => {
    // Handle DELETE request logic here
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Handling DELETE request');
};

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, this is your basic HTTPS server!');
});

const PORT = 443;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

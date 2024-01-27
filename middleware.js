const http = require('http');

const middleware = (req, res, next) => {
    console.log(`Incoming request at: ${new Date()}`);
    next();
};

const jsonParser = (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            req.body = JSON.parse(data);
            next();
        });
    } else {
        next();
    }
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Something went wrong!');
};

const server = http.createServer((req, res) => {
    // Middleware
    middleware(req, res, () => {
        // JSON parsing middleware
        jsonParser(req, res, () => {
            // Your routes go here

            // Trigger an intentional error for testing
            // Uncomment the line below to see error handling in action
            // throw new Error('Intentional error');

            // 404 handler
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

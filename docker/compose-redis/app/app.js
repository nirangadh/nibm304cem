const express = require('express');
const redis = require('redis');

// Create Express app
const app = express();

// Create Redis client
const client = redis.createClient({
    host: 'redis'
});

// Define route handler
app.get('/', (req, res) => {
    // Increment visit count in Redis
    client.incr('visits', (err, visitCount) => {
        if (err) {
            console.error('Error incrementing visit count:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('Number of visits: ' + visitCount);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

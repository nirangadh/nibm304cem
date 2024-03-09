const express = require('express');
const redis = require('redis');
const MongoClient = require('mongodb').MongoClient;

// Create Express app
const app = express();

// Create Redis client
const redisClient = redis.createClient({
  host: 'redis'
});

// MongoDB connection URI
const mongoURI = 'mongodb://mongo:27017';

// Define route handler
app.get('/', (req, res) => {
  // Increment visit count in Redis
  redisClient.incr('visits', (err, redisVisitCount) => {
    if (err) {
      console.error('Error incrementing Redis visit count:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Connect to MongoDB
    MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error('Error connecting to MongoDB:', err);
        return res.status(500).send('Internal Server Error');
      }
      
      // Select database and collection
      const db = client.db('visitors');
      const visitorsCollection = db.collection('visitors');

      // Insert visitor headers into MongoDB
      visitorsCollection.insertOne(req.headers, (err, result) => {
        if (err) {
          console.error('Error inserting visitor headers into MongoDB:', err);
          client.close();
          return res.status(500).send('Internal Server Error');
        }

        // Find total visit count from Redis
        redisClient.get('visits', (err, redisVisitCount) => {
          if (err) {
            console.error('Error retrieving Redis visit count:', err);
            client.close();
            return res.status(500).send('Internal Server Error');
          }

          // Find total visit count from MongoDB
          visitorsCollection.countDocuments((err, mongoVisitCount) => {
            if (err) {
              console.error('Error retrieving MongoDB visit count:', err);
              client.close();
              return res.status(500).send('Internal Server Error');
            }

            // Close MongoDB client
            client.close();

            // Send response with visit counts
            res.send(`Total Visits (Redis): ${redisVisitCount}, Total Visits (MongoDB): ${mongoVisitCount}`);
          });
        });
      });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
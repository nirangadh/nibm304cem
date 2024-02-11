const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'your_username', // Replace with your MongoDB username
    pass: 'your_password'  // Replace with your MongoDB password
};

// MongoDB connection string with authentication
const connectionString = 'mongodb://your_username:your_password@localhost:27017/items';

// Connect to MongoDB with authentication
mongoose.connect(connectionString, options);
const db = mongoose.connection;

// Define item schema
const itemSchema = new mongoose.Schema({
    name: String
});

// Define Item model
const Item = mongoose.model('Item', itemSchema);

// Middleware to parse JSON in incoming requests
app.use(bodyParser.json());

// Endpoint to add an item
app.post('/items', (req, res) => {
    const newItem = new Item(req.body);

    // Save new item to MongoDB
    newItem.save((err, item) => {
        if (err) {
            console.error('Error adding item:', err);
            res.status(500).json({ error: 'Failed to add item' });
            return;
        }
        res.json(item);
    });
});

// Endpoint to list all items
app.get('/items', (req, res) => {
    // Find all items from MongoDB
    Item.find((err, items) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).json({ error: 'Failed to fetch items' });
            return;
        }
        res.json(items);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

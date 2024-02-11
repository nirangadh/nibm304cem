const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in incoming requests
app.use(bodyParser.json());

// Endpoint to add an item
app.post('/items', (req, res) => {
    const newItem = req.body;

    // Read existing items from file
    let items = [];
    try {
        const data = fs.readFileSync('items.json', 'utf8');
        items = JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
    }

    // Add new item to the list
    items.push(newItem);

    // Write updated items back to file
    fs.writeFile('items.json', JSON.stringify(items), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).json({ error: 'Failed to add item' });
            return;
        }
        res.json(newItem);
    });
});

// Endpoint to list all items
app.get('/items', (req, res) => {
    // Read items from file
    let items = [];
    try {
        const data = fs.readFileSync('items.json', 'utf8');
        items = JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Failed to fetch items' });
        return;
    }
    res.json(items);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

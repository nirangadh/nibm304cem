const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in incoming requests
app.use(bodyParser.json());

// Sample data
let items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

// Routes
app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.json(newItem);
});

app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    items = items.map(item => (item.id === itemId ? updatedItem : item));
    res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    items = items.filter(item => item.id !== itemId);
    res.json({ message: 'Item deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;
const DB_FILE = 'items.db'; // SQLite database file

// Create SQLite database
const db = new sqlite3.Database(DB_FILE);

// Create items table if not exists
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)");
});

// Middleware to parse JSON in incoming requests
app.use(bodyParser.json());

// Endpoint to add an item
app.post('/items', (req, res) => {
    const newItem = req.body;

    // Insert new item into the database
    db.run('INSERT INTO items (name) VALUES (?)', [newItem.name], function(err) {
        if (err) {
            console.error('Error inserting item:', err.message);
            res.status(500).json({ error: 'Failed to add item' });
            return;
        }
        res.json({ id: this.lastID, ...newItem });
    });
});

// Endpoint to list all items
app.get('/items', (req, res) => {
    // Retrieve all items from the database
    db.all('SELECT * FROM items', (err, rows) => {
        if (err) {
            console.error('Error fetching items:', err.message);
            res.status(500).json({ error: 'Failed to fetch items' });
            return;
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const secretKey = 'your_secret_key'; // Change this to your own secret key

// Sample data (in a real-world scenario, user data would be stored securely)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Middleware to parse JSON in incoming requests
app.use(bodyParser.json());

// Endpoint to generate JWT token upon successful login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user by username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    // Return JWT token
    res.json({ token });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing Authorization Header' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }

        req.user = decoded;
        next();
    });
};

// Protected endpoint that requires JWT token for access
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected endpoint', user: req.user });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

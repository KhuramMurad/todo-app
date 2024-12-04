const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'example',
    database: process.env.DATABASE_NAME || 'tododb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
    db.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, task VARCHAR(255))', (err, result) => {
        if (err) throw err;
        console.log('Table created or already exists');
    });
});

app.post('/api/tasks', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
        if (err) {
            return console.log(err.message);
        }
        res.status(201).json({ id: result.insertId, task });
    });
});

app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


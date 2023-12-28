const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Qqwerty1997',
    port: 5432,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'FinalProject')));

// Sign Up endpoint with redirect after success
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';
        const values = [email, hashedPassword];
        const newUser = await pool.query(query, values);
        console.log('User created:', newUser.rows[0]);
        res.send('<script>alert("User created successfully!"); window.location.href="/";</script>');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user: ' + error.message);
    }
});

// Log In endpoint with redirect after success
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).send('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }

        res.redirect('https://moodle.astanait.edu.kz/login/index.php');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

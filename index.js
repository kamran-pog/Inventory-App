const express = require('express');
const db = require('./db');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the API! Use /users to fetch user data.');
});

app.get('/groceries', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM groceries'); // Query to fetch all users
    res.json(result.rows); // Send data as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

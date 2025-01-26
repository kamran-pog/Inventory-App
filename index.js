const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

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

app.get('/groceries/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const query = 'SELECT * FROM groceries WHERE id = $1';
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Grocery not found');
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.delete('/groceries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM groceries WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Grocery not found');
    }

    res.send(`Grocery item with id ${id} deleted successfully.`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/groceries', async (req, res) => {
  const { name, price_per_pound, units_available } = req.body;

  try {
    const query = `
      INSERT INTO groceries (name, price_per_pound, units_available)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [name, price_per_pound, units_available];

    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]); // Return the newly added grocery item
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.patch('/groceries/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price_per_pound, units_available } = req.body;

  try {
    const query = `
      UPDATE groceries 
      SET 
        name = COALESCE($1, name), 
        price_per_pound = COALESCE($2, price_per_pound), 
        units_available = COALESCE($3, units_available) 
      WHERE id = $4 
      RETURNING *`;
    const values = [name, price_per_pound, units_available, id];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send('Grocery not found');
    }

    res.json(result.rows[0]); // Return the updated grocery item
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
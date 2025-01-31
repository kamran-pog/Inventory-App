const express = require('express');
const cors = require("cors");
const {
  getAllGroceries,
  getGroceryById,
  deleteGroceryById,
  addGrocery,
  updateGrocery,
} = require('./config/model');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API! Use /users to fetch user data.');
});

app.get('/groceries', async (req, res) => {
  try {
    const result = await getAllGroceries(); // Query to fetch all users
    res.json(result.rows); // Send data as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/groceries/:id', async (req, res) => {
    try {
        const result = await getGroceryById(req.params.id);

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
    const result = await deleteGroceryById(req.params.id);

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
  try {
    const { name, price_per_pound, units_available } = req.body;

    const result = await addGrocery(name, price_per_pound, units_available);

    res.status(201).json(result.rows[0]); // Return the newly added grocery item
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.patch('/groceries/:id', async (req, res) => {
  const { name, price_per_pound, units_available } = req.body;

  try {
    const result = await updateGrocery(req.params.id, name, price_per_pound, units_available);

    if (result.rows.length === 0) {
      return res.status(404).send('Grocery not found');
    }

    res.json(result.rows[0]); // Return the updated grocery item
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
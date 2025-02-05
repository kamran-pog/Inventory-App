const express = require("express");
const {
  getAllGroceries,
  getGroceryById,
  deleteGroceryById,
  addGrocery,
  updateGrocery,
} = require("../model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getAllGroceries();
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getGroceryById(req.params.id);

    if (result.rows.length === 0) {
      return res.status(404).send("Grocery not found");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteGroceryById(id);

    if (result.rows.length === 0) {
      return res.status(404).send("Grocery not found");
    }

    res.send(`Grocery item with ID ${id} deleted successfully.`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price_per_pound, units_available } = req.body;

    const result = await addGrocery(name, price_per_pound, units_available);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.patch("/:id", async (req, res) => {
  const { name, price_per_pound, units_available } = req.body;

  try {
    const result = await updateGrocery(req.params.id, name, price_per_pound, units_available);

    if (result.rows.length === 0) {
      return res.status(404).send("Grocery not found");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
const express = require("express");
const {
  getUserGroceries,
  addUserGrocery,
  removeUserGrocery,
} = require("../models/UserGroceyModel");

const authenticateToken = require("../middleware/authentication");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await getUserGroceries(req.user.id);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { groceryId, quantity } = req.body;
  try {
    const result = await addUserGrocery(req.user.id, groceryId, quantity || 1);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/:groceryId", authenticateToken, async (req, res) => {
  try {
    const result = await removeUserGrocery(req.user.id, req.params.groceryId);
    if (result.rows.length === 0) {
      return res.status(404).send("Item not found in user's list");
    }
    res.send("Item removed from user's grocery list");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
const express = require("express");
const {
    getAllUsers,
    getUserById,
    addUser,
    deleteUserById,
    updateUserById
} = require("../models/UserModel");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const result = await getAllUsers();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
      const result = await getUserById(req.params.id);
      res.json(result.rows[0] || { error: "User not found" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const result = await addUser(name, email, password);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const result = await deleteUserById(req.params.id);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully", deletedUser: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await updateUserById(req.params.id, name, email, password);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", updatedUser: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
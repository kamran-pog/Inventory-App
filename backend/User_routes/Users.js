const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {
    getAllUsers,
    getUserById,
    addUser,
    deleteUserById,
    updateUserById,
    getUserByEmail
} = require("../models/UserModel");

const authenticateToken = require("../middleware/authentication");

const authorizeRole = require("../middleware/roleAuth");

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

router.post("/signup", async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await addUser(name, email, hashedPassword, role);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User creation failed" });
    }

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await getUserByEmail(email);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.delete("/:id", authenticateToken, authorizeRole("admin"), async (req, res) => {
    try {
      const result = await deleteUserById(req.params.id);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully", deletedUser: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;
  
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const result = await updateUserById(req.params.id, name, email, hashedPassword);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", updatedUser: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
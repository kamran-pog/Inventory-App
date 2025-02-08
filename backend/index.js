const express = require('express');
const cors = require("cors");
const groceryRoutes = require("./Grocery_routes/groceries.js");
const userRoutes = require("./User_routes/Users.js");

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API! Use /users to fetch user data.');
});

app.use("/groceries", groceryRoutes);

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
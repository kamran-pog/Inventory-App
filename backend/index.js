const express = require('express');
const cors = require("cors");
const groceryRoutes = require("./routes/groceries");

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API! Use /users to fetch user data.');
});

app.use("/groceries", groceryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
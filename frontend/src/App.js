import axios from "axios";
import React, { useEffect, useState } from "react";
import AddGrocery from "./components/AddGrocery";
import GroceryList from "./components/GroceryList";

const API_URL = "http://localhost:3001/groceries";

// https://render-wq7v.onrender.com/groceries

function App() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setGroceries(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const removeGrocery = (id) => {
    setGroceries(groceries.filter(item => item.id !== id));
  };

  const addGrocery = (newGrocery) => {
    setGroceries(prevGroceries => [...prevGroceries, newGrocery])
  };

return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Grocery List</h1>

      <AddGrocery addGrocery={addGrocery} />

      <GroceryList groceries={groceries} onDelete={removeGrocery} />
    </div>
  );
}

export default App;
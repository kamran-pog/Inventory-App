import { useState } from "react";
import { API_URL } from "../config/config.js"; 
import axios from "axios";

function AddGrocery({ addGrocery }) {
  const [newGrocery, setNewGrocery] = useState({ name: "", price_per_pound: "", units_available: "" });

  const handleAdd = () => {
    if (!newGrocery.name || !newGrocery.price_per_pound || !newGrocery.units_available) {
      alert("Please fill in all fields");
      return;
    }

    axios.post(API_URL, {
      name: newGrocery.name,
      price_per_pound: parseFloat(newGrocery.price_per_pound),
      units_available: parseInt(newGrocery.units_available)
    })
    .then(response => {
      addGrocery(response.data);  // Call the parent function to update the list
      setNewGrocery({ name: "", price_per_pound: "", units_available: "" }); // Reset input fields
    })
    .catch(error => console.error("Error adding item:", error));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Name"
        value={newGrocery.name}
        onChange={(e) => setNewGrocery({ ...newGrocery, name: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Price per lb"
        value={newGrocery.price_per_pound}
        onChange={(e) => setNewGrocery({ ...newGrocery, price_per_pound: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Units Available"
        value={newGrocery.units_available}
        onChange={(e) => setNewGrocery({ ...newGrocery, units_available: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button
        onClick={handleAdd}
        style={{
          padding: "5px 10px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Grocery
      </button>
    </div>
  );
}

export default AddGrocery;
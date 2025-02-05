import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/config.js";

function UpdateGrocery({ id, currentName, currentPrice, currentUnits, onUpdate }) {
  const [updatedGrocery, setUpdatedGrocery] = useState({
    name: currentName,
    price_per_pound: currentPrice,
    units_available: currentUnits,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    axios.patch(`${API_URL}/${id}`, {
      name: updatedGrocery.name,
      price_per_pound: parseFloat(updatedGrocery.price_per_pound),
      units_available: parseInt(updatedGrocery.units_available),
    })
    .then(response => {
      onUpdate(response.data); // Update the grocery list in the parent component
      setIsEditing(false);
    })
    .catch(error => console.error("Error updating item:", error));
  };

return(
    <div style={{ marginTop: "10px" }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedGrocery.name}
            onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, name: e.target.value })}
            placeholder="Name"
            style={{ marginRight: "5px", padding: "5px" }}
          />
          <input
            type="number"
            value={updatedGrocery.price_per_pound}
            onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, price_per_pound: e.target.value })}
            placeholder="Price per lb"
            style={{ marginRight: "5px", padding: "5px" }}
          />
          <input
            type="number"
            value={updatedGrocery.units_available}
            onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, units_available: e.target.value })}
            placeholder="Units Available"
            style={{ marginRight: "5px", padding: "5px" }}
          />
          <button
            onClick={handleUpdate}
            style={{
              padding: "5px 10px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginRight: "5px"
            }}
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: "5px 10px",
              background: "gray",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          style={{
            padding: "5px 10px",
            background: "orange",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Update
        </button>
      )}
    </div>
  );
}

export default UpdateGrocery;
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "https://render-wq7v.onrender.com/groceries";

function App() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setGroceries(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Grocery List</h1>
      {groceries.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {groceries.map((item) => (
            <li key={item.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <strong>{item.name}</strong> - ${item.price_per_pound} per lb
              <br />
              Available: {item.units_available} units
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
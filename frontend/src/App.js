import React from "react";
import AddGrocery from "./components/AddGrocery";
import GroceryList from "./components/GroceryList";
import useGroceries from "./components/UseGroceries";

function App() {
  const {groceries, addGrocery, removeGrocery} = useGroceries([]);

return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Grocery List</h1>

      <AddGrocery addGrocery={addGrocery} />

      <GroceryList groceries={groceries} onDelete={removeGrocery} />
    </div>
  );
}

export default App;
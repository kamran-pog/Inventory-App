import React from "react";
import AddGrocery from "./components/AddGrocery";
import GroceryList from "./components/GroceryList";
import useGroceries from "./components/UseGroceries";
import updateGrocery from "./components/UpdateGrocery";

function App() {
  const {groceries, addGrocery, removeGrocery, updateGrocery} = useGroceries([]);

return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Grocery List</h1>

      <AddGrocery addGrocery={addGrocery} />

      <GroceryList groceries={groceries} onDelete={removeGrocery} onUpdate={updateGrocery} />
    </div>
  );
}

export default App;
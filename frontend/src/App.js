import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddGrocery from "./components/AddGrocery";
import GroceryList from "./components/GroceryList";
import useGroceries from "./components/UseGroceries";
import Signup from "./components/SignUp.js";
import Login from "./components/LogIn.js";

function App() {
  const {groceries, addGrocery, removeGrocery, updateGrocery} = useGroceries([]);

return (
  <Router>
  <div style={{ textAlign: "center", padding: "20px" }}>
    <nav>
      <Link to="/signup" style={{ margin: "10px" }}>Signup</Link>
      <Link to="/login" style={{ margin: "10px" }}>Login</Link>
      <Link to="/" style={{ margin: "10px" }}>Home</Link>
    </nav>

    <h1>Grocery List</h1>

    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <>
          <AddGrocery addGrocery={addGrocery} />
          <GroceryList groceries={groceries} onDelete={removeGrocery} onUpdate={updateGrocery} />
        </>
      } />
    </Routes>
  </div>
</Router>
  );
}

export default App;
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config.js";

function useGroceries() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setGroceries(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const removeGrocery = (id) => {
    setGroceries(prevGroceries => prevGroceries.filter(item => item.id !== id));
  };

  const addGrocery = (newGrocery) => {
    setGroceries(prevGroceries => [...prevGroceries, newGrocery]);
  };

  const updateGrocery = (updatedItem) => {
    setGroceries(prevGroceries => 
      prevGroceries.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return { groceries, addGrocery, removeGrocery, updateGrocery };
}

export default useGroceries;

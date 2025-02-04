import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

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

  return { groceries, addGrocery, removeGrocery };
}

export default useGroceries;

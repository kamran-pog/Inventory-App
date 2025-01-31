import axios from "axios";

const API_URL = "http://localhost:3001/groceries";

function DeleteGrocery({ id, onDelete }) {
  const handleDelete = () => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        onDelete(id); // Call parent function to update the list
      })
      .catch(error => console.error("Error deleting item:", error));
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        marginTop: "10px",
        padding: "5px 10px",
        background: "red",
        color: "white",
        border: "none",
        cursor: "pointer"
      }}
    >
      Delete
    </button>
  );
}

export default DeleteGrocery;

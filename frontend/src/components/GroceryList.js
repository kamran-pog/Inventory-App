import DeleteGrocery from "./DeleteGrocery";

function GroceryList({ groceries, onDelete }) {
  return (
    groceries.length === 0 ? (
      <p>Loading...</p>
    ) : (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {groceries.map((item) => (
          <li key={item.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <strong>{item.name}</strong> - ${item.price_per_pound} per lb
            <br />
            Available: {item.units_available} units
            <br />
            <DeleteGrocery id={item.id} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    )
  );
}

export default GroceryList;
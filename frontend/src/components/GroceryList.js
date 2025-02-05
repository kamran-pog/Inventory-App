import DeleteGrocery from "./DeleteGrocery";
import UpdateGrocery from "./UpdateGrocery";

function GroceryList({ groceries, onDelete, onUpdate }) {
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
            <UpdateGrocery
              id={item.id}
              currentName={item.name}
              currentPrice={item.price_per_pound}
              currentUnits={item.units_available}
              onUpdate={onUpdate}
            />
          </li>
        ))}
      </ul>
    )
  );
}

export default GroceryList;
const db = require('./config/db');

const getAllGroceries = async () => {
  return db.query('SELECT * FROM groceries');
};

const getGroceryById = async (id) => {
  return db.query('SELECT * FROM groceries WHERE id = $1', [id]);
};

const deleteGroceryById = async (id) => {
  return db.query('DELETE FROM groceries WHERE id = $1 RETURNING *', [id]);
};

const addGrocery = async (name, price_per_pound, units_available) => {
  return db.query(
    `INSERT INTO groceries (name, price_per_pound, units_available) 
     VALUES ($1, $2, $3) RETURNING *`,
    [name, price_per_pound, units_available]
  );
};

const updateGrocery = async (id, name, price_per_pound, units_available) => {
  return db.query(
    `UPDATE groceries 
     SET 
       name = COALESCE($1, name), 
       price_per_pound = COALESCE($2, price_per_pound), 
       units_available = COALESCE($3, units_available) 
     WHERE id = $4 RETURNING *`,
    [name, price_per_pound, units_available, id]
  );
};

module.exports = {
  getAllGroceries,
  getGroceryById,
  deleteGroceryById,
  addGrocery,
  updateGrocery,
};
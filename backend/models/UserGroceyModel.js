const db = require('../config/db');

const getUserGroceries = async (userId) => {
  return db.query(
    `SELECT g.* 
     FROM groceries g 
     JOIN user_groceries ug ON g.id = ug.grocery_id 
     WHERE ug.user_id = $1`,
    [userId]
  );
};

const addUserGrocery = async (userId, groceryId, quantity) => {
  return db.query(
    `INSERT INTO user_groceries (user_id, grocery_id, quantity) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (user_id, grocery_id) 
     DO UPDATE SET quantity = user_groceries.quantity + EXCLUDED.quantity 
     RETURNING *`,
    [userId, groceryId, quantity]
  );
};

const removeUserGrocery = async (userId, groceryId) => {
  return db.query(
    `DELETE FROM user_groceries 
     WHERE user_id = $1 AND grocery_id = $2 
     RETURNING *`,
    [userId, groceryId]
  );
};

module.exports = {
  getUserGroceries,
  addUserGrocery,
  removeUserGrocery,
};
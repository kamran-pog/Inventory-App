const db = require('../config/db');

const getAllUsers = async () => {
    return db.query("SELECT * FROM users");
  };
  
const getUserById = async (id) => {
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
};
  
const addUser = async (name, email, password) => {
    return db.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
};

const deleteUserById = async (id) => {
    return db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
};

const updateUserById = async (id, name, email, password) => {
  return db.query(
    `UPDATE users SET name = $1, email = $2, password = $3 
     WHERE id = $4 RETURNING *`,
    [name, email, password, id]
  );
};

const getUserByEmail = async (email) => {
  return db.query("SELECT * FROM users WHERE email = $1", [email]);
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUserById,
    updateUserById,
    getUserByEmail
};
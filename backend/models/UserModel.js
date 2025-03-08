const db = require('../config/db');

const getAllUsers = async () => {
  return db.query(
    `SELECT users.*, roles.role_name 
     FROM users 
     JOIN roles ON users.role_id = roles.id`
  );
};
  
const getUserById = async (id) => {
  return db.query(
    `SELECT users.*, roles.role_name 
     FROM users 
     JOIN roles ON users.role_id = roles.id 
     WHERE users.id = $1`,
    [id]
  );
};
  
const addUser = async (name, email, password, role = "user") => {
  
  const roleResult = await db.query(
    "SELECT id FROM roles WHERE role_name = $1",
    [role]
  );

  if (roleResult.rows.length === 0) {
    throw new Error(`Role "${role}" does not exist.`);
  }

  const roleId = roleResult.rows[0].id;

  
  return db.query(
    `INSERT INTO users (name, email, password, role_id) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, password, roleId]
  );
};

const deleteUserById = async (id) => {
    return db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
};

const updateUserById = async (id, name, email, password, role) => {
  
  const roleResult = await db.query(
    "SELECT id FROM roles WHERE role_name = $1",
    [role]
  );

  if (roleResult.rows.length === 0) {
    throw new Error(`Role "${role}" does not exist.`);
  }

  const roleId = roleResult.rows[0].id;

  
  return db.query(
    `UPDATE users SET name = $1, email = $2, password = $3, role_id = $4
     WHERE id = $5 RETURNING *`,
    [name, email, password, roleId, id]
)};

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
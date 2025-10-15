import pool from "../config/db.js";

export const createUser = async (name,email)=>{
    const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING *;
    `;
    try{
        const {rows} = await pool.query(query, [name,email]);
        return rows[0];
    } catch(err){
        console.log('Error inserting user: ', err.message);
        throw err;
    }
};

export const getAllUsers = async () =>{
    const query = `SELECT * FROM users;`;
    try{
        const {rows} = await pool.query(query);
        return rows;
    } catch(err){
        console.log('Error fetching users: ', err.message);
        throw err;
    }
};


export const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1;';
  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (err) {
    console.error('Error fetching user by ID:', err.message);
    throw err;
  }
};

export const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1;';
  try {
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  } catch (err) {
    console.error('Error fetching user by ID:', err.message);
    throw err;
  }
};


export const deleteUserById = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
  try {
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (err) {
    console.error('Error deleting user:', err.message);
    throw err;
  }
};

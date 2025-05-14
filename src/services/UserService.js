import pool from '../db.js';

// Simple password hashing for demo purposes (not secure for production)
const hashPassword = (password) => {
  // In production, use bcrypt or another secure hashing library
  return `hashed_${password}`;
};

export const getUserId = async (username, email = `${username}@example.com`, password = 'defaultpassword') => {
  try {
    // Check if user exists
    const result = await pool.query('SELECT id FROM people WHERE username = $1 OR email = $2', [username, email]);
    if (result.rows.length > 0) {
      return result.rows[0].id;
    }

    // Create a new user if none exists
    const insertResult = await pool.query(
      'INSERT INTO people (username, email, password, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id',
      [username, email, hashPassword(password)]
    );
    return insertResult.rows[0].id;
  } catch (err) {
    console.error('Error in getUserId:', err);
    throw new Error('Failed to get or create user');
  }

};

export const getStaticUserDetails = () => {
  return {
    email: 'nijusajeevnj@gmail.com',
    phone: '+1234567890',
  };
};

//8-5-25
// export const getUserDetails = async (userId) => {
//   try {
//     const result = await pool.query('SELECT email, phone FROM people WHERE id = $1', [userId]);
//     if (result.rows.length === 0) {
//       throw new Error('User not found');
//     }
//     return {
//       email: result.rows[0].email,
//       phone: result.rows[0].phone || null, // Assuming 'phone' is a column in the 'people' table; it might be null
//     };
//   } catch (err) {
//     console.error('Error in getUserDetails:', err);
//     throw new Error('Failed to fetch user details');
//   }
// };










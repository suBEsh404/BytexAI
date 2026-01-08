import pool from '../config/database.js';

export const UserModel = {
  // Create a new user
  create: async (email, passwordHash, fullName, role = 'user') => {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, role, created_at',
      [email, passwordHash, fullName, role]
    );
    return result.rows[0];
  },

  // Find user by email
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  // Find user by username
  findByUsername: async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  // Find user by ID
  findById: async (id) => {
    const result = await pool.query('SELECT id, email, full_name, role, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Update user profile
  updateProfile: async (id, { firstName, lastName, bio, location, profileImageUrl }) => {
    const result = await pool.query(
      'UPDATE users SET full_name = COALESCE($1, full_name), bio = COALESCE($2, bio), location = COALESCE($3, location), profile_image_url = COALESCE($4, profile_image_url) WHERE id = $5 RETURNING id, email, full_name, profile_image_url, bio, location, role, is_active, created_at',
      [firstName, bio, location, profileImageUrl, id]
    );
    return result.rows[0];
  },

  // Get all users (admin)
  getAll: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT id, email, full_name, role, is_active, created_at FROM users LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }
};

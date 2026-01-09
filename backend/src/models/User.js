import pool from '../config/database.js';

export const UserModel = {
  // Create a new user (for users table only)
  create: async (email, passwordHash, fullName) => {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, created_at',
      [email, passwordHash, fullName]
    );
    return result.rows[0];
  },

  // Find user by email
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  // Find user by ID
  findById: async (id) => {
    const result = await pool.query('SELECT id, email, full_name, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Update user profile
  updateProfile: async (id, { fullName, bio, location, profileImageUrl }) => {
    const result = await pool.query(
      'UPDATE users SET full_name = COALESCE($1, full_name), bio = COALESCE($2, bio), location = COALESCE($3, location), profile_image_url = COALESCE($4, profile_image_url) WHERE id = $5 RETURNING id, email, full_name, profile_image_url, bio, location, is_active, created_at',
      [fullName, bio, location, profileImageUrl, id]
    );
    return result.rows[0];
  },

  // Get all users (admin)
  getAll: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT id, email, full_name, is_active, created_at FROM users LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }
};

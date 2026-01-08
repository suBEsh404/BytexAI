import pool from '../config/database.js';

export const DeveloperModel = {
  // Create developer profile
  create: async (userId, { expertise, yearsOfExperience, githubUrl, portfolioUrl, linkedinUrl, hourlyRate, bio }) => {
    const result = await pool.query(
      'INSERT INTO developers (user_id, expertise, years_of_experience, github_url, portfolio_url, linkedin_url, hourly_rate, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [userId, expertise, yearsOfExperience, githubUrl, portfolioUrl, linkedinUrl, hourlyRate, bio]
    );
    return result.rows[0];
  },

  // Get developer by ID
  getById: async (id) => {
    const result = await pool.query(
      'SELECT d.*, u.username, u.email, u.profile_image_url FROM developers d JOIN users u ON d.user_id = u.id WHERE d.id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Get developer by user ID
  getByUserId: async (userId) => {
    const result = await pool.query('SELECT * FROM developers WHERE user_id = $1', [userId]);
    return result.rows[0];
  },

  // Get all developers with pagination
  getAll: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT d.*, u.username, u.email FROM developers d JOIN users u ON d.user_id = u.id WHERE d.is_available = TRUE ORDER BY d.rating DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  },

  // Update developer profile
  update: async (id, { expertise, yearsOfExperience, githubUrl, portfolioUrl, linkedinUrl, hourlyRate, bio, isAvailable }) => {
    const result = await pool.query(
      'UPDATE developers SET expertise = COALESCE($1, expertise), years_of_experience = COALESCE($2, years_of_experience), github_url = COALESCE($3, github_url), portfolio_url = COALESCE($4, portfolio_url), linkedin_url = COALESCE($5, linkedin_url), hourly_rate = COALESCE($6, hourly_rate), bio = COALESCE($7, bio), is_available = COALESCE($8, is_available) WHERE id = $9 RETURNING *',
      [expertise, yearsOfExperience, githubUrl, portfolioUrl, linkedinUrl, hourlyRate, bio, isAvailable, id]
    );
    return result.rows[0];
  },

  // Get top-rated developers
  getTopRated: async (limit = 10) => {
    const result = await pool.query(
      'SELECT d.*, u.username, u.email FROM developers d JOIN users u ON d.user_id = u.id WHERE d.is_available = TRUE ORDER BY d.rating DESC, d.total_reviews DESC LIMIT $1',
      [limit]
    );
    return result.rows;
  }
};

import pool from '../config/database.js';

export const DeveloperModel = {
  // Create developer account (signup)
  create: async (email, passwordHash, fullName) => {
    const result = await pool.query(
      'INSERT INTO developers (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, created_at',
      [email, passwordHash, fullName]
    );
    return result.rows[0];
  },

  // Find developer by email
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM developers WHERE email = $1', [email]);
    return result.rows[0];
  },

  // Find developer by ID
  findById: async (id) => {
    const result = await pool.query('SELECT id, email, full_name, created_at FROM developers WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Update developer profile
  updateProfile: async (id, { fullName, bio, expertise, yearsOfExperience, githubUrl, portfolioUrl, linkedinUrl, hourlyRate, profileImageUrl }) => {
    const result = await pool.query(
      `UPDATE developers SET 
        full_name = COALESCE($1, full_name),
        bio = COALESCE($2, bio),
        expertise = COALESCE($3, expertise),
        years_of_experience = COALESCE($4, years_of_experience),
        github_url = COALESCE($5, github_url),
        portfolio_url = COALESCE($6, portfolio_url),
        linkedin_url = COALESCE($7, linkedin_url),
        hourly_rate = COALESCE($8, hourly_rate),
        profile_image_url = COALESCE($9, profile_image_url)
       WHERE id = $10 
       RETURNING id, email, full_name, bio, expertise, years_of_experience, github_url, portfolio_url, linkedin_url, hourly_rate, profile_image_url, created_at`,
      [fullName, bio, expertise, yearsOfExperience, githubUrl, portfolioUrl, linkedinUrl, hourlyRate, profileImageUrl, id]
    );
    return result.rows[0];
  },

  // Get all developers with pagination
  getAll: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT id, email, full_name, profile_image_url, bio, expertise, years_of_experience, rating, total_projects, is_available, created_at FROM developers WHERE is_available = TRUE ORDER BY rating DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  },

  // Get top-rated developers
  getTopRated: async (limit = 10) => {
    const result = await pool.query(
      'SELECT id, email, full_name, profile_image_url, bio, expertise, years_of_experience, rating, total_projects FROM developers WHERE is_available = TRUE ORDER BY rating DESC, total_reviews DESC LIMIT $1',
      [limit]
    );
    return result.rows;
  },

  // Update availability
  setAvailability: async (id, isAvailable) => {
    const result = await pool.query(
      'UPDATE developers SET is_available = $1 WHERE id = $2 RETURNING id, is_available',
      [isAvailable, id]
    );
    return result.rows[0];
  }
};

import pool from '../config/database.js';

export const ProjectModel = {
  // Create new project
  create: async (userId, { title, description, shortDescription, technologies, imageUrl, repositoryUrl, liveUrl, difficultyLevel, budget }) => {
    const result = await pool.query(
      'INSERT INTO projects (user_id, title, description, short_description, technologies, image_url, repository_url, live_url, difficulty_level, budget, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [userId, title, description, shortDescription, technologies, imageUrl, repositoryUrl, liveUrl, difficultyLevel, budget, 'draft']
    );
    return result.rows[0];
  },

  // Get all projects with pagination
  getAll: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT p.*, u.username, COUNT(r.id) as review_count FROM projects p JOIN users u ON p.user_id = u.id LEFT JOIN reviews r ON p.id = r.project_id WHERE p.status = $1 GROUP BY p.id, u.username LIMIT $2 OFFSET $3',
      ['active', limit, offset]
    );
    return result.rows;
  },

  // Get project by ID
  getById: async (id) => {
    const result = await pool.query(
      'SELECT p.*, u.username, u.email FROM projects p JOIN users u ON p.user_id = u.id WHERE p.id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Get projects by user
  getByUserId: async (userId) => {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },

  // Update project
  update: async (id, { title, description, status, featured }) => {
    const result = await pool.query(
      'UPDATE projects SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), featured = COALESCE($4, featured) WHERE id = $5 RETURNING *',
      [title, description, status, featured, id]
    );
    return result.rows[0];
  },

  // Delete project
  delete: async (id) => {
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
  }
};

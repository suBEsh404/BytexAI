import pool from '../config/database.js';

export const ReviewModel = {
  // Create review
  create: async (projectId, reviewerId, { rating, title, comment, developerId }) => {
    const result = await pool.query(
      'INSERT INTO reviews (project_id, reviewer_id, developer_id, rating, title, comment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [projectId, reviewerId, developerId, rating, title, comment]
    );
    return result.rows[0];
  },

  // Get reviews by project
  getByProjectId: async (projectId) => {
    const result = await pool.query(
      'SELECT r.*, u.username, u.profile_image_url FROM reviews r JOIN users u ON r.reviewer_id = u.id WHERE r.project_id = $1 AND r.status = $2 ORDER BY r.created_at DESC',
      [projectId, 'approved']
    );
    return result.rows;
  },

  // Get reviews by developer
  getByDeveloperId: async (developerId) => {
    const result = await pool.query(
      'SELECT r.*, u.username FROM reviews r JOIN users u ON r.reviewer_id = u.id WHERE r.developer_id = $1 AND r.status = $2 ORDER BY r.created_at DESC',
      [developerId, 'approved']
    );
    return result.rows;
  },

  // Get review by ID
  getById: async (id) => {
    const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Update review
  update: async (id, { status, rating, comment }) => {
    const result = await pool.query(
      'UPDATE reviews SET status = COALESCE($1, status), rating = COALESCE($2, rating), comment = COALESCE($3, comment) WHERE id = $4 RETURNING *',
      [status, rating, comment, id]
    );
    return result.rows[0];
  },

  // Get pending reviews (admin)
  getPending: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT r.*, u.username, p.title as project_title FROM reviews r JOIN users u ON r.reviewer_id = u.id JOIN projects p ON r.project_id = p.id WHERE r.status = $1 LIMIT $2 OFFSET $3',
      ['pending', limit, offset]
    );
    return result.rows;
  },

  // Delete review
  delete: async (id) => {
    await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
  }
};

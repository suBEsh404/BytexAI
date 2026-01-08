import pool from '../config/database.js';

export const BookmarkModel = {
  // Create bookmark
  create: async (userId, { projectId, developerId, bookmarkType }) => {
    const result = await pool.query(
      'INSERT INTO bookmarks (user_id, project_id, developer_id, bookmark_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, projectId, developerId, bookmarkType]
    );
    return result.rows[0];
  },

  // Get user bookmarks
  getByUserId: async (userId) => {
    const result = await pool.query(
      `SELECT b.*, 
        CASE WHEN b.bookmark_type = 'project' THEN p.title ELSE d.user_id END as title,
        CASE WHEN b.bookmark_type = 'project' THEN p.image_url ELSE NULL END as image_url
       FROM bookmarks b
       LEFT JOIN projects p ON b.project_id = p.id
       LEFT JOIN developers d ON b.developer_id = d.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  // Get project bookmarks
  getByProjectId: async (projectId) => {
    const result = await pool.query(
      'SELECT b.*, u.username FROM bookmarks b JOIN users u ON b.user_id = u.id WHERE b.project_id = $1',
      [projectId]
    );
    return result.rows;
  },

  // Check if bookmarked
  exists: async (userId, projectId, developerId) => {
    const result = await pool.query(
      'SELECT id FROM bookmarks WHERE user_id = $1 AND (project_id = $2 OR developer_id = $3)',
      [userId, projectId, developerId]
    );
    return result.rows.length > 0;
  },

  // Delete bookmark
  delete: async (id) => {
    await pool.query('DELETE FROM bookmarks WHERE id = $1', [id]);
  }
};

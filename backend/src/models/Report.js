import pool from '../config/database.js';

export const ReportModel = {
  // Create report
  create: async (reporterId, { projectId, reviewId, reportType, reason, description }) => {
    const result = await pool.query(
      'INSERT INTO reports (reporter_id, project_id, review_id, report_type, reason, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [reporterId, projectId, reviewId, reportType, reason, description]
    );
    return result.rows[0];
  },

  // Get all reports (admin)
  getAll: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT r.*, u.username FROM reports r JOIN users u ON r.reporter_id = u.id ORDER BY r.created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  },

  // Get report by ID
  getById: async (id) => {
    const result = await pool.query('SELECT * FROM reports WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Get pending reports
  getPending: async () => {
    const result = await pool.query(
      'SELECT r.*, u.username FROM reports r JOIN users u ON r.reporter_id = u.id WHERE r.status = $1 ORDER BY r.created_at DESC',
      ['pending']
    );
    return result.rows;
  },

  // Update report
  update: async (id, { status, adminNotes }) => {
    const result = await pool.query(
      'UPDATE reports SET status = COALESCE($1, status), admin_notes = COALESCE($2, admin_notes) WHERE id = $3 RETURNING *',
      [status, adminNotes, id]
    );
    return result.rows[0];
  }
};

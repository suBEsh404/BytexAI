import pool from '../config/database.js';

export const NotificationModel = {
  // Create notification
  create: async (userId, { notificationType, title, message, relatedId }) => {
    const result = await pool.query(
      'INSERT INTO notifications (user_id, notification_type, title, message, related_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, notificationType, title, message, relatedId]
    );
    return result.rows[0];
  },

  // Get user notifications
  getByUserId: async (userId, limit = 20, offset = 0) => {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
    );
    return result.rows;
  },

  // Get unread notifications
  getUnread: async (userId) => {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 AND is_read = FALSE ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },

  // Mark as read
  markAsRead: async (id) => {
    const result = await pool.query(
      'UPDATE notifications SET is_read = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },

  // Mark all as read
  markAllAsRead: async (userId) => {
    await pool.query('UPDATE notifications SET is_read = TRUE WHERE user_id = $1 AND is_read = FALSE', [userId]);
  },

  // Delete notification
  delete: async (id) => {
    await pool.query('DELETE FROM notifications WHERE id = $1', [id]);
  }
};

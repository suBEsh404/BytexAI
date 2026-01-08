import { UserModel } from '../models/User.js';
import pool from '../config/database.js';

export const adminController = {
  // Get dashboard stats
  getDashboardStats: async (req, res) => {
    try {
      const usersResult = await pool.query('SELECT COUNT(*) FROM users');
      const projectsResult = await pool.query('SELECT COUNT(*) FROM projects WHERE status = $1', ['active']);
      const developersResult = await pool.query('SELECT COUNT(*) FROM developers');
      const reviewsResult = await pool.query('SELECT COUNT(*) FROM reviews WHERE status = $1', ['pending']);

      res.status(200).json({
        totalUsers: parseInt(usersResult.rows[0].count),
        activeProjects: parseInt(projectsResult.rows[0].count),
        totalDevelopers: parseInt(developersResult.rows[0].count),
        pendingReviews: parseInt(reviewsResult.rows[0].count)
      });
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      res.status(500).json({ error: 'Failed to get dashboard stats' });
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const users = await UserModel.getAll(limit, offset);
      res.status(200).json(users);
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ error: 'Failed to get users' });
    }
  },

  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT p.*, u.username FROM projects p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC'
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Get all projects error:', error);
      res.status(500).json({ error: 'Failed to get projects' });
    }
  },

  // Deactivate user
  deactivateUser: async (req, res) => {
    try {
      const result = await pool.query(
        'UPDATE users SET is_active = FALSE WHERE id = $1 RETURNING id, email, username',
        [req.params.userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        message: 'User deactivated',
        user: result.rows[0]
      });
    } catch (error) {
      console.error('Deactivate user error:', error);
      res.status(500).json({ error: 'Failed to deactivate user' });
    }
  },

  // Activate user
  activateUser: async (req, res) => {
    try {
      const result = await pool.query(
        'UPDATE users SET is_active = TRUE WHERE id = $1 RETURNING id, email, username',
        [req.params.userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        message: 'User activated',
        user: result.rows[0]
      });
    } catch (error) {
      console.error('Activate user error:', error);
      res.status(500).json({ error: 'Failed to activate user' });
    }
  },

  // Get activity logs
  getActivityLogs: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;
      const result = await pool.query(
        'SELECT a.*, u.username FROM admin_logs a JOIN users u ON a.admin_id = u.id ORDER BY a.created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Get activity logs error:', error);
      res.status(500).json({ error: 'Failed to get activity logs' });
    }
  }
};

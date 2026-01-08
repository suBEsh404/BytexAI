import { NotificationModel } from '../models/Notification.js';

export const notificationController = {
  // Get user notifications
  getNotifications: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;
      const notifications = await NotificationModel.getByUserId(req.user.userId, limit, offset);
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Get notifications error:', error);
      res.status(500).json({ error: 'Failed to get notifications' });
    }
  },

  // Get unread notifications
  getUnread: async (req, res) => {
    try {
      const unread = await NotificationModel.getUnread(req.user.userId);
      res.status(200).json({
        count: unread.length,
        notifications: unread
      });
    } catch (error) {
      console.error('Get unread notifications error:', error);
      res.status(500).json({ error: 'Failed to get unread notifications' });
    }
  },

  // Mark as read
  markAsRead: async (req, res) => {
    try {
      const notification = await NotificationModel.markAsRead(req.params.id);
      res.status(200).json({
        message: 'Notification marked as read',
        notification
      });
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({ error: 'Failed to mark as read' });
    }
  },

  // Mark all as read
  markAllAsRead: async (req, res) => {
    try {
      await NotificationModel.markAllAsRead(req.user.userId);
      res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
      console.error('Mark all as read error:', error);
      res.status(500).json({ error: 'Failed to mark all as read' });
    }
  },

  // Delete notification
  delete: async (req, res) => {
    try {
      await NotificationModel.delete(req.params.id);
      res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
      console.error('Delete notification error:', error);
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  }
};

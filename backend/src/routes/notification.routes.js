import express from 'express';
import { notificationController } from '../controllers/notification.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All notification routes are protected
router.get('/', authMiddleware, notificationController.getNotifications);
router.get('/unread', authMiddleware, notificationController.getUnread);
router.put('/:id/read', authMiddleware, notificationController.markAsRead);
router.put('/read-all', authMiddleware, notificationController.markAllAsRead);
router.delete('/:id', authMiddleware, notificationController.delete);

export default router;

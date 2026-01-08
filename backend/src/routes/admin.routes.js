import express from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/deactivate', adminController.deactivateUser);
router.put('/users/:userId/activate', adminController.activateUser);

// Project management
router.get('/projects', adminController.getAllProjects);

// Activity logs
router.get('/logs', adminController.getActivityLogs);

export default router;

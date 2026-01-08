import express from 'express';
import { reportController } from '../controllers/report.controller.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create report (protected)
router.post('/', authMiddleware, reportController.create);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, reportController.getAll);
router.get('/pending', authMiddleware, adminMiddleware, reportController.getPending);
router.put('/:id', authMiddleware, adminMiddleware, reportController.update);

export default router;

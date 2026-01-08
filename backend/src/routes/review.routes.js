import express from 'express';
import { reviewController } from '../controllers/review.controller.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get reviews by project
router.get('/project/:projectId', reviewController.getByProject);

// Get reviews by developer
router.get('/developer/:developerId', reviewController.getByDeveloper);

// Create review (protected)
router.post('/project/:projectId', authMiddleware, reviewController.create);

// Admin routes
router.get('/pending/all', authMiddleware, adminMiddleware, reviewController.getPending);
router.put('/:id/status', authMiddleware, adminMiddleware, reviewController.updateStatus);
router.delete('/:id', authMiddleware, adminMiddleware, reviewController.delete);

export default router;

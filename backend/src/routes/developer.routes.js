import express from 'express';
import { developerController } from '../controllers/developer.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', developerController.getAll);
router.get('/top-rated', developerController.getTopRated);
router.get('/:id', developerController.getById);

// Protected routes
router.post('/', authMiddleware, developerController.create);
router.get('/profile/me', authMiddleware, developerController.getProfile);
router.put('/profile/update', authMiddleware, developerController.update);

export default router;

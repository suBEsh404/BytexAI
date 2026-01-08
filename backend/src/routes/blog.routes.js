import express from 'express';
import { blogController } from '../controllers/blog.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', blogController.getAllPublished);
router.get('/post/:slug', blogController.getBySlug);

// Protected routes
router.post('/', authMiddleware, blogController.create);
router.get('/my-posts', authMiddleware, blogController.getMyPosts);
router.put('/:id', authMiddleware, blogController.update);
router.delete('/:id', authMiddleware, blogController.delete);

export default router;

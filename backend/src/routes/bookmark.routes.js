import express from 'express';
import { bookmarkController } from '../controllers/bookmark.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All bookmark routes are protected
router.get('/', authMiddleware, bookmarkController.getBookmarks);
router.post('/', authMiddleware, bookmarkController.create);
router.delete('/:id', authMiddleware, bookmarkController.delete);

export default router;

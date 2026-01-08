import { BookmarkModel } from '../models/Bookmark.js';

export const bookmarkController = {
  // Create bookmark
  create: async (req, res) => {
    try {
      const { projectId, developerId, bookmarkType } = req.body;

      // Check if already bookmarked
      const exists = await BookmarkModel.exists(req.user.userId, projectId, developerId);
      if (exists) {
        return res.status(409).json({ error: 'Already bookmarked' });
      }

      const bookmark = await BookmarkModel.create(req.user.userId, req.body);
      res.status(201).json({
        message: 'Bookmarked successfully',
        bookmark
      });
    } catch (error) {
      console.error('Create bookmark error:', error);
      res.status(500).json({ error: 'Failed to create bookmark' });
    }
  },

  // Get user bookmarks
  getBookmarks: async (req, res) => {
    try {
      const bookmarks = await BookmarkModel.getByUserId(req.user.userId);
      res.status(200).json(bookmarks);
    } catch (error) {
      console.error('Get bookmarks error:', error);
      res.status(500).json({ error: 'Failed to get bookmarks' });
    }
  },

  // Delete bookmark
  delete: async (req, res) => {
    try {
      await BookmarkModel.delete(req.params.id);
      res.status(200).json({ message: 'Bookmark removed successfully' });
    } catch (error) {
      console.error('Delete bookmark error:', error);
      res.status(500).json({ error: 'Failed to delete bookmark' });
    }
  }
};

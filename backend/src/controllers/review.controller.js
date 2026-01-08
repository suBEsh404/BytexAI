import { ReviewModel } from '../models/Review.js';

export const reviewController = {
  // Create review
  create: async (req, res) => {
    try {
      const review = await ReviewModel.create(req.params.projectId, req.user.userId, req.body);
      res.status(201).json({
        message: 'Review created successfully',
        review
      });
    } catch (error) {
      console.error('Create review error:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  },

  // Get reviews by project
  getByProject: async (req, res) => {
    try {
      const reviews = await ReviewModel.getByProjectId(req.params.projectId);
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Get reviews error:', error);
      res.status(500).json({ error: 'Failed to get reviews' });
    }
  },

  // Get reviews by developer
  getByDeveloper: async (req, res) => {
    try {
      const reviews = await ReviewModel.getByDeveloperId(req.params.developerId);
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Get developer reviews error:', error);
      res.status(500).json({ error: 'Failed to get reviews' });
    }
  },

  // Get pending reviews (admin)
  getPending: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const reviews = await ReviewModel.getPending(limit, offset);
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Get pending reviews error:', error);
      res.status(500).json({ error: 'Failed to get pending reviews' });
    }
  },

  // Approve/Reject review (admin)
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const review = await ReviewModel.update(req.params.id, { status });
      res.status(200).json({
        message: `Review ${status}`,
        review
      });
    } catch (error) {
      console.error('Update review error:', error);
      res.status(500).json({ error: 'Failed to update review' });
    }
  },

  // Delete review
  delete: async (req, res) => {
    try {
      await ReviewModel.delete(req.params.id);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Delete review error:', error);
      res.status(500).json({ error: 'Failed to delete review' });
    }
  }
};

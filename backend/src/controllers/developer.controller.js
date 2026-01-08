import { DeveloperModel } from '../models/Developer.js';

export const developerController = {
  // Create developer profile
  create: async (req, res) => {
    try {
      const developer = await DeveloperModel.create(req.user.userId, req.body);
      res.status(201).json({
        message: 'Developer profile created',
        developer
      });
    } catch (error) {
      console.error('Create developer error:', error);
      res.status(500).json({ error: 'Failed to create developer profile' });
    }
  },

  // Get developer profile
  getProfile: async (req, res) => {
    try {
      const developer = await DeveloperModel.getByUserId(req.user.userId);
      if (!developer) {
        return res.status(404).json({ error: 'Developer profile not found' });
      }
      res.status(200).json(developer);
    } catch (error) {
      console.error('Get developer error:', error);
      res.status(500).json({ error: 'Failed to get developer profile' });
    }
  },

  // Get developer by ID
  getById: async (req, res) => {
    try {
      const developer = await DeveloperModel.getById(req.params.id);
      if (!developer) {
        return res.status(404).json({ error: 'Developer not found' });
      }
      res.status(200).json(developer);
    } catch (error) {
      console.error('Get developer error:', error);
      res.status(500).json({ error: 'Failed to get developer' });
    }
  },

  // Get all developers
  getAll: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const developers = await DeveloperModel.getAll(limit, offset);
      res.status(200).json(developers);
    } catch (error) {
      console.error('Get developers error:', error);
      res.status(500).json({ error: 'Failed to get developers' });
    }
  },

  // Get top-rated developers
  getTopRated: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const developers = await DeveloperModel.getTopRated(limit);
      res.status(200).json(developers);
    } catch (error) {
      console.error('Get top developers error:', error);
      res.status(500).json({ error: 'Failed to get developers' });
    }
  },

  // Update developer profile
  update: async (req, res) => {
    try {
      const developer = await DeveloperModel.getByUserId(req.user.userId);
      if (!developer) {
        return res.status(404).json({ error: 'Developer profile not found' });
      }

      const updated = await DeveloperModel.update(developer.id, req.body);
      res.status(200).json({
        message: 'Developer profile updated',
        developer: updated
      });
    } catch (error) {
      console.error('Update developer error:', error);
      res.status(500).json({ error: 'Failed to update developer profile' });
    }
  }
};

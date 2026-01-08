import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { ProjectModel } from '../models/Project.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const projects = await ProjectModel.getAll(limit, offset);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await ProjectModel.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
});

// Get user's projects
router.get('/user/my-projects', authMiddleware, async (req, res) => {
  try {
    const projects = await ProjectModel.getByUserId(req.user.userId);
    res.status(200).json(projects);
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

// Create project
router.post('/', authMiddleware, async (req, res) => {
  try {
    const project = await ProjectModel.create(req.user.userId, req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await ProjectModel.update(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await ProjectModel.delete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;

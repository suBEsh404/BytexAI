import { BlogPostModel } from '../models/BlogPost.js';

export const blogController = {
  // Create blog post
  create: async (req, res) => {
    try {
      const post = await BlogPostModel.create(req.user.userId, req.body);
      res.status(201).json({
        message: 'Blog post created',
        post
      });
    } catch (error) {
      console.error('Create blog post error:', error);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  },

  // Get all published posts
  getAllPublished: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const posts = await BlogPostModel.getAllPublished(limit, offset);
      res.status(200).json(posts);
    } catch (error) {
      console.error('Get blog posts error:', error);
      res.status(500).json({ error: 'Failed to get blog posts' });
    }
  },

  // Get post by slug
  getBySlug: async (req, res) => {
    try {
      const post = await BlogPostModel.getBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error('Get blog post error:', error);
      res.status(500).json({ error: 'Failed to get blog post' });
    }
  },

  // Get author posts
  getMyPosts: async (req, res) => {
    try {
      const posts = await BlogPostModel.getByAuthorId(req.user.userId);
      res.status(200).json(posts);
    } catch (error) {
      console.error('Get my posts error:', error);
      res.status(500).json({ error: 'Failed to get posts' });
    }
  },

  // Update post
  update: async (req, res) => {
    try {
      const post = await BlogPostModel.update(req.params.id, req.body);
      res.status(200).json({
        message: 'Blog post updated',
        post
      });
    } catch (error) {
      console.error('Update blog post error:', error);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  },

  // Delete post
  delete: async (req, res) => {
    try {
      await BlogPostModel.delete(req.params.id);
      res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
      console.error('Delete blog post error:', error);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  }
};

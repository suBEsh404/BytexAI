import pool from '../config/database.js';

export const BlogPostModel = {
  // Create blog post
  create: async (authorId, { title, slug, content, excerpt, featuredImageUrl, category, tags, isPublished }) => {
    const result = await pool.query(
      'INSERT INTO blog_posts (author_id, title, slug, content, excerpt, featured_image_url, category, tags, is_published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [authorId, title, slug, content, excerpt, featuredImageUrl, category, tags, isPublished]
    );
    return result.rows[0];
  },

  // Get all published posts
  getAllPublished: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT b.*, u.username FROM blog_posts b JOIN users u ON b.author_id = u.id WHERE b.is_published = TRUE ORDER BY b.created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  },

  // Get post by slug
  getBySlug: async (slug) => {
    const result = await pool.query(
      'SELECT b.*, u.username, u.profile_image_url FROM blog_posts b JOIN users u ON b.author_id = u.id WHERE b.slug = $1',
      [slug]
    );
    return result.rows[0];
  },

  // Get post by ID
  getById: async (id) => {
    const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Get author posts
  getByAuthorId: async (authorId) => {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE author_id = $1 ORDER BY created_at DESC',
      [authorId]
    );
    return result.rows;
  },

  // Update post
  update: async (id, { title, content, excerpt, category, tags, isPublished }) => {
    const result = await pool.query(
      'UPDATE blog_posts SET title = COALESCE($1, title), content = COALESCE($2, content), excerpt = COALESCE($3, excerpt), category = COALESCE($4, category), tags = COALESCE($5, tags), is_published = COALESCE($6, is_published) WHERE id = $7 RETURNING *',
      [title, content, excerpt, category, tags, isPublished, id]
    );
    return result.rows[0];
  },

  // Delete post
  delete: async (id) => {
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
  }
};

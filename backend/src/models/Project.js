import pool from '../config/database.js';

export const ProjectModel = {
  // Create new project
  create: async (developerId, { title, description, shortDescription, technologies, imageUrl, repositoryUrl, liveUrl, difficultyLevel, budget, category, tags }) => {
    // Convert tags array to PostgreSQL array format if needed
    const tagsArray = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []);
    const techArray = Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()) : []);
    
    const result = await pool.query(
      'INSERT INTO projects (developer_id, title, description, tags, image_url, repository_url, live_url, category, budget, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [developerId, title, description, tagsArray, imageUrl, repositoryUrl, liveUrl, category || difficultyLevel, budget, 'draft']
    );
    return result.rows[0];
  },

  // Get all projects with pagination
  getAll: async (limit = 10, offset = 0) => {
    const result = await pool.query(
      'SELECT p.*, d.full_name as developer_name, d.email FROM projects p JOIN developers d ON p.developer_id = d.id WHERE p.status = $1 ORDER BY p.created_at DESC LIMIT $2 OFFSET $3',
      ['published', limit, offset]
    );
    return result.rows;
  },

  // Get project by ID
  getById: async (id) => {
    const result = await pool.query(
      'SELECT p.*, d.full_name as developer_name, d.email FROM projects p JOIN developers d ON p.developer_id = d.id WHERE p.id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Get projects by developer
  getByDeveloperId: async (developerId) => {
    const result = await pool.query(
      'SELECT * FROM projects WHERE developer_id = $1 ORDER BY created_at DESC',
      [developerId]
    );
    return result.rows;
  },

  // Update project
  update: async (id, { title, description, status, featured }) => {
    const result = await pool.query(
      'UPDATE projects SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), featured = COALESCE($4, featured) WHERE id = $5 RETURNING *',
      [title, description, status, featured, id]
    );
    return result.rows[0];
  },

  // Delete project
  delete: async (id) => {
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
  }
};

import api from '../api/api';

// Get all projects
export const getAllProjects = async (limit = 10, offset = 0) => {
  try {
    const response = await api.get(`/projects?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get developer's own projects
export const getDeveloperProjects = async () => {
  try {
    const response = await api.get('/projects/developer/my-projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching developer projects:', error);
    throw error;
  }
};

// Get project by ID
export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Create new project
export const createProject = async (projectData) => {
  try {
    const formData = new FormData();
    
    // Append text fields
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('category', projectData.category);
    formData.append('tags', projectData.tags);
    formData.append('projectUrl', projectData.projectUrl || '');
    formData.append('status', projectData.status || 'draft');
    
    // Append file if exists
    if (projectData.thumbnail) {
      formData.append('thumbnail', projectData.thumbnail);
    }
    
    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Get project reviews
export const getProjectReviews = async (projectId) => {
  try {
    const response = await api.get(`/reviews/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project reviews:', error);
    throw error;
  }
};

// Add project review
export const addProjectReview = async (projectId, reviewData) => {
  try {
    const response = await api.post(`/reviews/project/${projectId}`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Backward compatibility aliases
export const getProject = getProjectById;

// Toggle bookmark (placeholder - implement based on your bookmark API)
export const toggleBookmark = async (projectId) => {
  try {
    const response = await api.post(`/bookmarks/toggle`, { projectId });
    return response.data;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};

// Export all functions as a namespace for backward compatibility
export const projectService = {
  getAllProjects,
  getProjectById,
  getProject: getProjectById,
  getDeveloperProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectReviews,
  addProjectReview,
  toggleBookmark
};


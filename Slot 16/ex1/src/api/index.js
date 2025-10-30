import apiClient from './apiClient';

// Movie API functions
export const movieApi = {
  // Get all movies
  getAll: async () => {
    const response = await apiClient.get('/movies');
    return response.data;
  },

  // Get movie by id
  getById: async (id) => {
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  },

  // Create new movie
  create: async (movieData) => {
    const response = await apiClient.post('/movies', movieData);
    return response.data;
  },

  // Update movie
  update: async (id, movieData) => {
    const response = await apiClient.put(`/movies/${id}`, movieData);
    return response.data;
  },

  // Delete movie
  delete: async (id) => {
    const response = await apiClient.delete(`/movies/${id}`);
    return response.data;
  },

  // Get genres
  getGenres: async () => {
    const response = await apiClient.get('/genres');
    return response.data;
  }
};

// Auth API functions
export const authApi = {
  // Login
  login: async (username, password) => {
    // Get all accounts and find matching credentials
    const response = await apiClient.get('/accounts');
    const accounts = response.data;
    
    const user = accounts.find(
      account => account.username === username && account.password === password
    );
    
    if (user) {
      // Remove password from returned data for security
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      throw new Error('Invalid username or password');
    }
  },

  // Get user by id (for session verification)
  getUser: async (id) => {
    const response = await apiClient.get(`/accounts/${id}`);
    const { password: _, ...userWithoutPassword } = response.data;
    return userWithoutPassword;
  }
};
import apiClient from './apiClient';

export const expenseApi = {
  getAll: async () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) throw new Error('User not authenticated');
    
    // Get payments filtered by user ID
    const response = await apiClient.get(`/expenses?userId=${currentUser.id}`);
    return response.data;
  },

  
  getById: async (id) => {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  },

  create: async (expenseData) => {
    const response = await apiClient.post('/expenses', expenseData);
    return response.data;
  },

  // Update expense
  update: async (id, expenseData) => {
    const response = await apiClient.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  delete: async (id) => {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  },
};

export const authApi = {
  // Login
  login: async (username, password) => {
    // Get all users and find matching credentials
    const response = await apiClient.get('/users');
    const users = response.data;
    
    const user = users.find(
      user => user.username === username && user.password === password
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
    const response = await apiClient.get(`/users/${id}`);
    const { password: _, ...userWithoutPassword } = response.data;
    return userWithoutPassword;
  }
}; 
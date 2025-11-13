import apiClient from './apiClient';

// Payment API functions
export const tuitionApi = {
  // Get all payments for current user
  getAll: async () => {
    // Get current user from local storage
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) throw new Error('User not authenticated');
    
    // Get payments filtered by user ID
    const response = await apiClient.get(`/payments?userId=${currentUser.id}`);
    return response.data;
  },

  // Get payment by id
  getById: async (id) => {
    const response = await apiClient.get(`/payments/${id}`);
    return response.data;
  }
};

// Auth API functions
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
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
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
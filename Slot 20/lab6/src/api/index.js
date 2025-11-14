import apiClient from './apiClient';

// Users API functions
export const usersApi = {
  // Get all users
  getAll: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // Get user by id
  getById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  create: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  // Update user
  update: async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  }
};

// Payments API functions
export const paymentsApi = {
  // Get all payments
  getAll: async () => {
    const response = await apiClient.get('/payments');
    return response.data;
  },

  // Get payments for specific user
  getByUserId: async (userId) => {
    const response = await apiClient.get(`/payments?userId=${userId}`);
    return response.data;
  },

  // Get payment by id
  getById: async (id) => {
    const response = await apiClient.get(`/payments/${id}`);
    return response.data;
  },

  // Create new payment
  create: async (paymentData) => {
    const response = await apiClient.post('/payments', paymentData);
    return response.data;
  },

  // Update payment
  update: async (id, paymentData) => {
    const response = await apiClient.put(`/payments/${id}`, paymentData);
    return response.data;
  },

  // Delete payment
  delete: async (id) => {
    const response = await apiClient.delete(`/payments/${id}`);
    return response.data;
  }
};

// Payment API functions (legacy - keeping for compatibility)
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
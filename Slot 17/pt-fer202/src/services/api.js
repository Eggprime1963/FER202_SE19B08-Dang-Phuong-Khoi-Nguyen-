import axios from 'axios';

// Configure Base URL for JSON Server
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User related API calls
export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// Payment related API calls
export const getPayments = async () => {
    try {
        const response = await API.get('/payments');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payments');
    }
};

export const addPayment = async (paymentData) => {
    try {
        const response = await API.post('/payments', paymentData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add payment');
    }
};

export const updatePayment = async (id, paymentData) => {
    try {
        const response = await API.put(`/payments/${id}`, paymentData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update payment');
    }
};

export const deletePayment = async (id) => {
    try {
        await API.delete(`/payments/${id}`);
        return true;
    } catch (error) {
        throw new Error('Failed to delete payment');
    }
};
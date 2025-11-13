// PaymentContext.jsx manages global state for payments, including CRUD operations and filtering
import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';

// 1. Create Context
const PaymentContext = createContext();

// 2. Initial State
const initialPaymentState = {
    payments: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        semester: '',
        course: '',
        sortBy: 'date_desc', // Default sort
    },
    totalAmount: 0,
};

// 3. Create Payment Reducer
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PAYMENTS_START':
            return { ...state, loading: true, error: null };
        
        case 'FETCH_PAYMENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                payments: action.payload,
                totalAmount: action.payload.reduce((sum, p) => sum + p.amount, 0),
                error: null,
            };
        
        case 'FETCH_PAYMENTS_ERROR':
            return { ...state, loading: false, error: action.payload };
        
        case 'ADD_PAYMENT_SUCCESS':
            const newPayments = [...state.payments, action.payload];
            return {
                ...state,
                payments: newPayments,
                totalAmount: newPayments.reduce((sum, p) => sum + p.amount, 0),
                error: null,
            };
        
        case 'UPDATE_PAYMENT_SUCCESS':
            const updatedPayments = state.payments.map(p => 
                p.id === action.payload.id ? action.payload : p
            );
            return {
                ...state,
                payments: updatedPayments,
                totalAmount: updatedPayments.reduce((sum, p) => sum + p.amount, 0),
                error: null,
            };
        
        case 'DELETE_PAYMENT_SUCCESS':
            const filteredPayments = state.payments.filter(p => p.id !== action.payload);
            return {
                ...state,
                payments: filteredPayments,
                totalAmount: filteredPayments.reduce((sum, p) => sum + p.amount, 0),
                error: null,
            };
        
        case 'SET_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
            };
        
        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: { ...initialPaymentState.filters },
            };

        case 'CLEAR_ERROR':
            return { ...state, error: null };

        default:
            return state;
    }
};

// 4. Create Provider Component
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

    // Clear error helper
    const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

    // Fetch all payments
    const fetchPayments = async () => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        try {
            const payments = await api.getPayments();
            dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: payments });
        } catch (error) {
            dispatch({ type: 'FETCH_PAYMENTS_ERROR', payload: error.message });
        }
    };

    // Add new payment
    const addPayment = async (paymentData) => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        try {
            const newPayment = await api.addPayment(paymentData);
            dispatch({ type: 'ADD_PAYMENT_SUCCESS', payload: newPayment });
            return { success: true, payment: newPayment };
        } catch (error) {
            dispatch({ type: 'FETCH_PAYMENTS_ERROR', payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Update payment
    const updatePayment = async (id, paymentData) => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        try {
            const updatedPayment = await api.updatePayment(id, paymentData);
            dispatch({ type: 'UPDATE_PAYMENT_SUCCESS', payload: updatedPayment });
            return { success: true, payment: updatedPayment };
        } catch (error) {
            dispatch({ type: 'FETCH_PAYMENTS_ERROR', payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        dispatch({ type: 'FETCH_PAYMENTS_START' });
        try {
            await api.deletePayment(id);
            dispatch({ type: 'DELETE_PAYMENT_SUCCESS', payload: id });
            return { success: true };
        } catch (error) {
            dispatch({ type: 'FETCH_PAYMENTS_ERROR', payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Set filters
    const setFilters = (filters) => {
        dispatch({ type: 'SET_FILTERS', payload: filters });
    };

    // Clear filters
    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' });
    };

    // Get filtered and sorted payments
    const getFilteredPayments = () => {
        const { search, semester, course, sortBy } = state.filters;
        
        let filtered = [...state.payments];

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(p => 
                p.semester.toLowerCase().includes(searchLower) ||
                p.courseName.toLowerCase().includes(searchLower)
            );
        }

        // Apply semester filter
        if (semester) {
            filtered = filtered.filter(p => p.semester === semester);
        }

        // Apply course filter
        if (course) {
            filtered = filtered.filter(p => p.courseName === course);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'course_asc':
                    return a.courseName.localeCompare(b.courseName);
                case 'course_desc':
                    return b.courseName.localeCompare(a.courseName);
                case 'date_asc':
                    return new Date(a.date) - new Date(b.date);
                case 'date_desc':
                    return new Date(b.date) - new Date(a.date);
                case 'amount_asc':
                    return a.amount - b.amount;
                case 'amount_desc':
                    return b.amount - a.amount;
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        return filtered;
    };

    // Get unique semester and course lists for filters
    const getFilterOptions = () => {
        const semesters = [...new Set(state.payments.map(p => p.semester))];
        const courses = [...new Set(state.payments.map(p => p.courseName))];
        return { semesters, courses };
    };

    // Context value
    const value = {
        // State
        payments: state.payments,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        totalAmount: state.totalAmount,
        
        // Filter helpers
        filteredPayments: getFilteredPayments(),
        filterOptions: getFilterOptions(),
        
        // Actions
        fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
        setFilters,
        clearFilters,
        clearError,
    };

    return (
        <PaymentContext.Provider value={value}>
            {children}
        </PaymentContext.Provider>
    );
};

// 5. Create custom hook
export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
};
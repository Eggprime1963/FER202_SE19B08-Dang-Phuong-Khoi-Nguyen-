// src/contexts/AuthContext.js
import React, { createContext, useReducer, useContext, useCallback } from 'react';
import { authApi } from '../api';

// Initial State
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Contexts
export const AuthStateContext = createContext(initialAuthState);
export const AuthDispatchContext = createContext(null);

// Custom Hooks
export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // LOGIN FUNCTION - Replace with API call
  const login = async (username, password) => {
    dispatch({ type: 'START_LOADING' });
    
    try {
      const user = await authApi.login(username, password);
      localStorage.setItem('user', JSON.stringify(user)); 
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return { success: true, user };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed. Please try again.' });
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // LOGOUT FUNCTION
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    // REMOVE FROM LOCALSTORAGE - Replace with token invalidation
    localStorage.removeItem('user');
  };

  // CHECK STORED AUTH - Replace with token validation
  const checkStoredAuth = useCallback(() => {
    // Prevent infinite loop - only check if not already authenticated
    if (state.isAuthenticated) return;
    
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      }
    } catch (error) {
      console.error('Error checking stored auth:', error);
      localStorage.removeItem('user');
    }
  }, [state.isAuthenticated]);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Initialize auth on mount
  React.useEffect(() => {
    checkStoredAuth();
  }, [checkStoredAuth]);

  const dispatchValue = {
    login,
    logout,
    clearError
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
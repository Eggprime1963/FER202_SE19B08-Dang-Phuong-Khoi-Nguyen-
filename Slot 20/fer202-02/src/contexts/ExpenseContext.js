import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { expenseReducer, initialExpenseState } from '../reducers/expenseReducers';
import { expenseApi } from '../api';

// Contexts
export const ExpenseStateContext = createContext(initialExpenseState); 
export const ExpenseDispatchContext = createContext(null);          

// Custom Hooks
export const useExpenseState = () => useContext(ExpenseStateContext);
export const useExpenseDispatch = () => useContext(ExpenseDispatchContext);

// ExpenseProvider Component
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialExpenseState);

  // Fetch expenses from API
  const fetchExpenses = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const expenses = await expenseApi.getAll();
      dispatch({ type: 'SET_EXPENSE', payload: expenses });
      dispatch({ type: 'APPLY_FILTERS' });
    } catch (error) {
      console.error("Error fetching expenses:", error);
      dispatch({ type: 'SET_EXPENSE', payload: [] });
    }
  }, []);

  // Delete expense
  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });

    try {
      await expenseApi.delete(id);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      fetchExpenses();
    }
  }, [fetchExpenses]);

  // Create or update expense
  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    
    try {
      if (isEditing) {
        await expenseApi.update(isEditingId, dataToSend);
      } else {
        await expenseApi.create(dataToSend);
      }
      
      dispatch({ type: 'RESET_FORM' }); 
      fetchExpenses();
      return true;
    } catch (error) {
      console.error("Error in CREATE/UPDATE operation:", error);
      fetchExpenses();
      return false;
    }
  }, [fetchExpenses]);

  const setCategoryFilter = useCallback((category) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: category });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);


  const clearFilters = useCallback(() => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: '' });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Re-apply filters when expenses or filter settings change
  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, [state.expenses, state.searchTerm, state.selectedGenre, state.categoryFilter, state.sortBy, state.sortOrder]);

  // Dispatch object with all expense functions
  const dispatchValue = {
    dispatch, 
    fetchExpenses,
    confirmDelete,
    handleCreateOrUpdate,
    setCategoryFilter,
    clearFilters
  };

  return (
    <ExpenseStateContext.Provider value={state}>
      <ExpenseDispatchContext.Provider value={dispatchValue}>
        {children}
      </ExpenseDispatchContext.Provider>
    </ExpenseStateContext.Provider>
  );
};
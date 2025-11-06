import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { tuitionReducer, initialTuitionState } from '../reducers/tuitionReducers';
import { tuitionApi } from '../api';

// Contexts
export const TuitionStateContext = createContext(initialTuitionState); 
export const TuitionDispatchContext = createContext(null);          

// Custom Hooks
export const useTuitionState = () => useContext(TuitionStateContext);
export const useTuitionDispatch = () => useContext(TuitionDispatchContext);

// TuitionProvider Component
export const TuitionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tuitionReducer, initialTuitionState);

  // Fetch payments from API
  const fetchPayments = useCallback(async () => {
    dispatch({ type: 'FETCH_PAYMENTS_START' });
    try {
      const payments = await tuitionApi.getAll();
      dispatch({ type: 'FETCH_PAYMENTS_SUCCESS', payload: payments });
      dispatch({ type: 'APPLY_FILTERS' });
    } catch (error) {
      console.error("Error fetching payments:", error);
      dispatch({ type: 'FETCH_PAYMENTS_ERROR', payload: error.message });
    }
  }, []);

  // Filter functions
  const setSearchTerm = useCallback((term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const setSemesterFilter = useCallback((semester) => {
    dispatch({ type: 'SET_SEMESTER_FILTER', payload: semester });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const setCourseFilter = useCallback((course) => {
    dispatch({ type: 'SET_COURSE_FILTER', payload: course });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const setSortBy = useCallback((sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Re-apply filters when payments or filter settings change
  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, [
    state.payments,
    state.searchTerm,
    state.selectedSemester,
    state.selectedCourse,
    state.sortBy,
    state.sortOrder
  ]);

  // Dispatch object with all payment functions
  const dispatchValue = {
    fetchPayments,
    setSearchTerm,
    setSemesterFilter,
    setCourseFilter,
    setSortBy,
    clearFilters
  };

  return (
    <TuitionStateContext.Provider value={state}>
      <TuitionDispatchContext.Provider value={dispatchValue}>
        {children}
      </TuitionDispatchContext.Provider>
    </TuitionStateContext.Provider>
  );
};
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import { movieApi } from '../api';

// Contexts
export const MovieStateContext = createContext(initialMovieState); 
export const MovieDispatchContext = createContext(null);          

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// MovieProvider Component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // Fetch movies from API
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const movies = await movieApi.getAll();
      dispatch({ type: 'SET_MOVIES', payload: movies });
      dispatch({ type: 'APPLY_FILTERS' });
    } catch (error) {
      console.error("Error fetching movies:", error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  // Fetch genres from API
  const fetchGenres = useCallback(async () => {
    try {
      const genres = await movieApi.getGenres();
      dispatch({ type: 'SET_GENRES', payload: genres });
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }, []);

  // Delete movie
  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });

    try {
      await movieApi.delete(id);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
      fetchMovies();
    }
  }, [fetchMovies]);

  // Create or update movie
  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    
    try {
      if (isEditing) {
        await movieApi.update(isEditingId, dataToSend);
      } else {
        await movieApi.create(dataToSend);
      }
      
      dispatch({ type: 'RESET_FORM' }); 
      fetchMovies();
      return true;
    } catch (error) {
      console.error("Error in CREATE/UPDATE operation:", error);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  // Filter functions
  const setSearchTerm = useCallback((term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const setGenreFilter = useCallback((genreId) => {
    dispatch({ type: 'SET_GENRE_FILTER', payload: genreId });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const setDurationFilter = useCallback((duration) => {
    dispatch({ type: 'SET_DURATION_FILTER', payload: duration });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const setSortBy = useCallback((sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
    dispatch({ type: 'SET_GENRE_FILTER', payload: '' });
    dispatch({ type: 'SET_DURATION_FILTER', payload: '' });
    dispatch({ type: 'SET_SORT', payload: { sortBy: 'title', sortOrder: 'asc' } });
    dispatch({ type: 'APPLY_FILTERS' });
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  // Re-apply filters when movies or filter settings change
  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, [state.movies, state.searchTerm, state.selectedGenre, state.durationFilter, state.sortBy, state.sortOrder]);

  // Dispatch object with all movie functions
  const dispatchValue = {
    dispatch, 
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
    setSearchTerm,
    setGenreFilter,
    setDurationFilter,
    setSortBy,
    clearFilters
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
// src/reducers/movieReducers.js
export const initialMovieState = {
  movies: [],
  filteredMovies: [],
  genres: [],
  loading: false,
  isEditing: null,
  currentMovie: { 
    title: '', 
    description: '', 
    poster: '', 
    genreId: '', 
    year: '', 
    country: '', 
    duration: '' 
  },
  showEditModal: false,
  showDeleteModal: false,
  movieToDelete: null,
  // Filter states
  searchTerm: '',
  selectedGenre: '',
  durationFilter: '',
  sortBy: 'title',
  sortOrder: 'asc'
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { 
        ...state, 
        movies: action.payload,
        filteredMovies: action.payload,
        loading: false 
      };

    case 'SET_GENRES':
      return {
        ...state,
        genres: action.payload
      };
      
    case 'START_LOADING':
      return { ...state, loading: true };
      
    case 'UPDATE_FIELD':
      return { 
        ...state, 
        currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value }
      };

    case 'OPEN_EDIT_MODAL':
      return { 
        ...state, 
        currentMovie: action.payload, 
        isEditing: action.payload.id,
        showEditModal: true 
      };
      
    case 'CLOSE_EDIT_MODAL':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false 
      };

    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: action.payload,
        showDeleteModal: true 
      };

    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        movieToDelete: null,
        showDeleteModal: false 
      };
      
    case 'RESET_FORM':
      return { 
        ...state, 
        currentMovie: initialMovieState.currentMovie, 
        isEditing: null,
        showEditModal: false,
      };

    // Filter actions
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };

    case 'SET_GENRE_FILTER':
      return {
        ...state,
        selectedGenre: action.payload
      };

    case 'SET_DURATION_FILTER':
      return {
        ...state,
        durationFilter: action.payload
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder
      };

    case 'APPLY_FILTERS':
      let filtered = [...state.movies];

      // Search by title
      if (state.searchTerm) {
        filtered = filtered.filter(movie =>
          movie.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }

      // Filter by genre
      if (state.selectedGenre) {
        filtered = filtered.filter(movie => {
          const movieGenreId = movie.genre_id || movie.genreId;
          return movieGenreId === parseInt(state.selectedGenre);
        });
      }

      // Filter by duration
      if (state.durationFilter) {
        switch (state.durationFilter) {
          case 'short': // < 90 minutes
            filtered = filtered.filter(movie => movie.duration < 90);
            break;
          case 'medium': // 90-120 minutes
            filtered = filtered.filter(movie => movie.duration >= 90 && movie.duration <= 120);
            break;
          case 'long': // > 120 minutes
            filtered = filtered.filter(movie => movie.duration > 120);
            break;
          default:
            break;
        }
      }

      // Sort movies
      filtered.sort((a, b) => {
        let comparison = 0;
        if (state.sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (state.sortBy === 'year') {
          comparison = a.year - b.year;
        } else if (state.sortBy === 'duration') {
          comparison = a.duration - b.duration;
        }
        
        return state.sortOrder === 'desc' ? -comparison : comparison;
      });

      return {
        ...state,
        filteredMovies: filtered
      };

    default:
      return state;
  }
};
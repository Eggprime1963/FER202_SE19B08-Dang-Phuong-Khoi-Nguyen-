// src/reducers/tuitionReducers.js
export const initialTuitionState = {
  payments: [],
  filteredPayments: [],
  loading: false,
  error: null,
  // Filter states
  searchTerm: '',
  selectedSemester: '',
  selectedCourse: '',
  sortBy: 'course',
  sortOrder: 'asc'
};

export const tuitionReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PAYMENTS_START':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_PAYMENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        payments: action.payload,
        filteredPayments: action.payload
      };

    case 'FETCH_PAYMENTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Filter actions
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };

    case 'SET_SEMESTER_FILTER':
      return {
        ...state,
        selectedSemester: action.payload
      };

    case 'SET_COURSE_FILTER':
      return {
        ...state,
        selectedCourse: action.payload
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        searchTerm: '',
        selectedSemester: '',
        selectedCourse: '',
        sortBy: 'course',
        sortOrder: 'asc'
      };

    case 'APPLY_FILTERS':
      let filtered = [...state.payments];

      // Search by semester or course name
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter(payment =>
          payment.semester.toLowerCase().includes(searchLower) ||
          payment.courseName.toLowerCase().includes(searchLower)
        );
      }

      // Filter by semester
      if (state.selectedSemester) {
        filtered = filtered.filter(payment => 
          payment.semester === state.selectedSemester
        );
      }

      // Filter by course name
      if (state.selectedCourse) {
        filtered = filtered.filter(payment => 
          payment.courseName === state.selectedCourse
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (state.sortBy) {
          case 'course':
            comparison = a.courseName.localeCompare(b.courseName);
            break;
          case 'date':
            comparison = new Date(a.date) - new Date(b.date);
            break;
          case 'amount':
            comparison = a.amount - b.amount;
            break;
          default:
            comparison = a.courseName.localeCompare(b.courseName);
        }
        return state.sortOrder === 'asc' ? comparison : -comparison;

      });

      return {
        ...state,
        filteredPayments: filtered
      };

    default:
      return state;
  }
};
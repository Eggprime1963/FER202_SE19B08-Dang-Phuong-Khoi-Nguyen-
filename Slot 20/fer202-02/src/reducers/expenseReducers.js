// src/reducers/expenseReducers.js
export const initialExpenseState = {
  expenses: [],
  filteredExpenses: [],
  loading: false,
  isEditing: null,
  currentExpense: { 
    id: '',
    userId: '',
    name: '',
    amount: '',
    category: '',
    date: ''
  },
  expenseToDelete: null,
  // Filter states
  categoryFilter: '',
};

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSE':
      return { 
        ...state, 
        expenses: action.payload,
        filteredExpenses: action.payload,
        loading: false 
      }
      
    case 'START_LOADING':
      return { ...state, loading: true };
      
    case 'UPDATE_FIELD':
      return { 
        ...state, 
        currentExpense: { ...state.currentExpense, [action.payload.name]: action.payload.value }
      };


    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        expenseToDelete: action.payload,
        showDeleteModal: true 
      };

    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        expenseToDelete: null,
        showDeleteModal: false 
      };
      
    case 'RESET_FORM':
      return { 
        ...state, 
        currentExpense: initialExpenseState.currentExpense, 
        isEditing: null,
        showEditModal: false,
      };

    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        categoryFilter: action.payload
      };

    case 'APPLY_FILTERS':
      let filtered = [...state.expenses];

      // Filter by category
      if (state.categoryFilter) {
        filtered = filtered.filter(expense => 
          expense.category && expense.category === state.categoryFilter
        );
      }

      return {
        ...state,
        filteredExpenses: filtered
      };

    default:
      return state;
  }
};
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { usersApi } from '../../api'

// Initial state for users management
const initialState = {
  users: [],
  loading: false,
  error: null
}

// Async thunk for fetching users from API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await usersApi.getAll()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Users slice using createSlice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Synchronous reducer to toggle admin status
    toggleAdminStatus: (state, action) => {
      const { userId } = action.payload
      const user = state.users.find(user => user.id === userId)
      if (user) {
        user.role = user.role === 'admin' ? 'user' : 'admin'
      }
    },
    // Clear error state
    clearError: (state) => {
      state.error = null
    },
    // Add user locally (for demo purposes)
    addUserLocal: (state, action) => {
      state.users.push(action.payload)
    }
  },
  // Handle async actions with extraReducers
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers pending state
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Handle fetchUsers fulfilled state
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.users = action.payload
      })
      // Handle fetchUsers rejected state
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch users'
        state.users = []
      })
  }
})

// Export actions
export const { toggleAdminStatus, clearError, addUserLocal } = usersSlice.actions

// Selectors
export const selectUsers = (state) => state.users.users
export const selectUsersLoading = (state) => state.users.loading
export const selectUsersError = (state) => state.users.error

// Derived selectors
export const selectAdminUsers = (state) => 
  state.users.users.filter(user => user.role === 'admin')

export const selectActiveUsers = (state) => 
  state.users.users.filter(user => user.status === 'active')

// Export reducer
export default usersSlice.reducer
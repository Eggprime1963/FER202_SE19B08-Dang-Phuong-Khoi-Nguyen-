import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice'
import paymentsReducer from './slices/paymentsSlice'

// Configure Redux store using Redux Toolkit
export const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer
  },
  // Redux Toolkit includes Redux DevTools and Thunk middleware by default
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
  // Enable Redux DevTools Extension
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
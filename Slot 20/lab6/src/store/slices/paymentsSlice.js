import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Initial state for payments management
const initialState = {
  payments: [],
  loading: false,
  error: null,
  createLoading: false
}

// Async thunk for creating new payment (POST /api/payments)
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      })
      
      // Custom error handling for 402 Payment Required
      if (response.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền')
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching payments
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/payments')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Payments slice
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    // Clear error state
    clearError: (state) => {
      state.error = null
    },
    // Update payment status locally
    updatePaymentStatus: (state, action) => {
      const { paymentId, status } = action.payload
      const payment = state.payments.find(p => p.id === paymentId)
      if (payment) {
        payment.status = status
      }
    },
    // Clear all payments
    clearPayments: (state) => {
      state.payments = []
      state.error = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Payment cases
      .addCase(createPayment.pending, (state) => {
        state.createLoading = true
        state.error = null
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.createLoading = false
        state.error = null
        // Add new payment to the beginning of the array
        state.payments.unshift(action.payload)
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.createLoading = false
        state.error = action.payload || 'Failed to create payment'
      })
      
      // Fetch Payments cases
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.payments = action.payload
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch payments'
      })
  }
})

// Export actions
export const { clearError, updatePaymentStatus, clearPayments } = paymentsSlice.actions

// Basic selectors
export const selectPayments = (state) => state.payments.payments
export const selectPaymentsLoading = (state) => state.payments.loading
export const selectPaymentsError = (state) => state.payments.error
export const selectCreateLoading = (state) => state.payments.createLoading

// Reselect selector for successful payments
export const selectSuccessfulPayments = (state) => {
  return state.payments.payments.filter(payment => payment.status === 'SUCCESS')
}

// Additional selectors
export const selectPendingPayments = (state) => {
  return state.payments.payments.filter(payment => 
    payment.status === 'PENDING' || payment.status === 'PROCESSING'
  )
}

export const selectTotalSuccessfulAmount = (state) => {
  return selectSuccessfulPayments(state)
    .reduce((total, payment) => total + (payment.amount || 0), 0)
}

// Export reducer
export default paymentsSlice.reducer
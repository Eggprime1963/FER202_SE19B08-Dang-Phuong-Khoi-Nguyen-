# Lab 6: Redux, Redux Thunk và Redux Toolkit

## Tổng Quan
Lab này thực hiện các bài tập về Redux Toolkit, demonstrating việc quản lý state với createSlice, createAsyncThunk, và các pattern nâng cao.

## Cài Đặt và Chạy

### 1. Cài đặt dependencies
```bash
cd "Slot 20/lab6"
npm install
```

### 2. Chạy ứng dụng
```bash
npm start
```

### 3. Mở Redux DevTools
- Cài đặt Redux DevTools Extension từ Chrome Web Store
- Mở Developer Tools (F12) → Redux tab
- Quan sát state changes và actions được dispatch

## Bài Tập Đã Hoàn Thành

### Bài tập 1: Quản Lý Người Dùng (Users)

#### 📁 File: `src/store/slices/usersSlice.js`

**1. Thiết lập Slice**
```javascript
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    // Sync reducers
    toggleAdminStatus: (state, action) => {
      const { userId } = action.payload
      const user = state.users.find(user => user.id === userId)
      if (user) {
        user.isAdmin = !user.isAdmin // Immer cho phép "mutation" này
      }
    }
  }
})
```

**2. Xử lý Thao tác Đọc với createAsyncThunk**
```javascript
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
```

**3. Xử lý 3 trạng thái trong extraReducers**
```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
}
```

**4. Tổng hợp: Kết hợp reducers đồng bộ và bất đồng bộ**
- `toggleAdminStatus`: Reducer đồng bộ (sync)
- `fetchUsers`: Async thunk với 3 states
- Demonstration việc sử dụng cả hai trong cùng một slice

### Bài tập 2: Quản Lý Thanh Toán (Payments)

#### 📁 File: `src/store/slices/paymentsSlice.js`

**1. Thao tác Ghi (POST /api/payments)**
```javascript
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })
      
      // Custom error handling cho 402
      if (response.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền')
      }
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
```

**2. Xử lý Lỗi Tùy chỉnh**
- Status code 402 → "Tài khoản không đủ tiền"
- Sử dụng `rejectWithValue` để dispatch custom error message
- Demonstration trong component với amount > 2,000,000 VNĐ

**3. Bộ chọn (Selectors)**
```javascript
// Basic selector
export const selectPayments = (state) => state.payments.payments

// Reselect selector cho successful payments
export const selectSuccessfulPayments = (state) => {
  return state.payments.payments.filter(payment => payment.status === 'SUCCESS')
}

// Computed selector
export const selectTotalSuccessfulAmount = (state) => {
  return selectSuccessfulPayments(state)
    .reduce((total, payment) => total + (payment.amount || 0), 0)
}
```

## Các Tính Năng Nổi Bật

### 1. Redux Toolkit Benefits
- **Giảm Boilerplate**: Ít code hơn 60% so với vanilla Redux
- **Immer Integration**: Direct mutation syntax với immutable updates
- **DevTools Built-in**: Tự động configure Redux DevTools
- **TypeScript Ready**: Type-safe (nếu migrate sang TS)

### 2. Mock API Implementation
- Simulate real API calls với loading states
- Custom error scenarios (402 Payment Required)
- Realistic response delays
- No backend required

### 3. Advanced Selectors
```javascript
// Derived state với computed values
export const selectAdminUsers = (state) => 
  state.users.users.filter(user => user.isAdmin === true)

export const selectActiveUsers = (state) => 
  state.users.users.filter(user => user.status === 'active')
```

### 4. Error Handling Patterns
```javascript
// Custom error messages
if (response.status === 402) {
  return rejectWithValue('Tài khoản không đủ tiền')
}

// Generic error fallback
return rejectWithValue(error.message || 'Unknown error occurred')
```

## Component Architecture

### UsersManagement Component
- **Features**: CRUD operations, admin toggle, filtering
- **Redux Integration**: useSelector, useDispatch
- **State Management**: Loading, error, success states
- **UI Patterns**: Form handling, table display, statistics

### PaymentsManagement Component  
- **Features**: Create payments, status updates, filtering
- **Error Demo**: 402 custom error simulation
- **Selectors Demo**: Multiple selector usage
- **Business Logic**: Payment validation, status workflow

## Testing Scenarios

### 1. Users Management Test
1. Click "Fetch Users" → Watch `users/fetchUsers` actions
2. Toggle admin status → See `users/toggleAdminStatus` 
3. Add new user → Observe state updates
4. Check Redux DevTools → Verify state structure

### 2. Payments Management Test
1. Create normal payment → Success flow
2. Create payment > 2,000,000 → Custom 402 error
3. Update payment status → Local state changes
4. Observe selectors → Computed values update

### 3. Redux DevTools Features
- **Action History**: See all dispatched actions
- **State Inspection**: Current Redux state
- **Time Travel**: Jump to any previous state
- **Action Replay**: Replay actions step by step

## Key Learning Points

### createSlice vs createReducer vs Vanilla Redux

| Feature | Vanilla Redux | createReducer | createSlice |
|---------|---------------|---------------|-------------|
| Code Lines | 100+ | 60-80 | 30-50 |
| Action Types | Manual | Manual | Auto-generated |
| Action Creators | Manual | Manual | Auto-generated |
| Immutability | Manual | Immer | Immer |
| DevTools | Manual setup | Manual setup | Auto-configured |

### Async Thunk States
```javascript
// Every createAsyncThunk generates 3 action types:
'users/fetchUsers/pending'    // When async starts
'users/fetchUsers/fulfilled'  // When successful  
'users/fetchUsers/rejected'   // When error occurs
```

### Selector Patterns
```javascript
// Basic selector
const selectUsers = (state) => state.users.users

// Computed selector (recomputes only when dependencies change)  
const selectAdminUsers = (state) => 
  state.users.users.filter(user => user.isAdmin)

// Parameterized selector
const selectUsersByStatus = (state, status) =>
  state.users.users.filter(user => user.status === status)
```

## Kết Luận

Lab này demonstratesđầy đủ các concept quan trọng của Redux Toolkit:

✅ **createSlice** - Modern Redux với ít boilerplate  
✅ **createAsyncThunk** - Async operations với 3 states  
✅ **extraReducers** - Xử lý async actions  
✅ **Custom Error Handling** - rejectWithValue cho 402 errors  
✅ **Selectors** - Derived state và computed values  
✅ **Redux DevTools** - Debugging và monitoring  
✅ **Real-world Patterns** - CRUD operations, form handling  

Code base này có thể serve như foundation cho các ứng dụng React production sử dụng Redux Toolkit.
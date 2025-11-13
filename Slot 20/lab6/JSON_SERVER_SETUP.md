# JSON Server Setup for Lab 6 Redux Application

## Overview
This application now uses a real JSON Server to provide API endpoints instead of mock data. This provides a more realistic demonstration of Redux with async API calls.

## Setup Instructions

### 1. Start JSON Server (Terminal 1)
```bash
cd "Slot 20\Lab6"
npm run json-server
```

This will start the JSON server on `http://localhost:3001` using the `db-pt2.json` file.

### 2. Start React Application (Terminal 2)
```bash
cd "Slot 20\Lab6"
npm start
```

This will start the React app on `http://localhost:3000`.

## API Endpoints

The JSON server provides the following endpoints:

- **GET** `/users` - Fetch all users
- **POST** `/users` - Create a new user
- **GET** `/users/:id` - Fetch a specific user
- **PUT** `/users/:id` - Update a user
- **DELETE** `/users/:id` - Delete a user

- **GET** `/payments` - Fetch all payments
- **POST** `/payments` - Create a new payment
- **GET** `/payments/:id` - Fetch a specific payment
- **PUT** `/payments/:id` - Update a payment
- **DELETE** `/payments/:id` - Delete a payment

## Data Structure

### Users
```json
{
  "id": 1,
  "username": "john_doe",
  "fullName": "John Doe",
  "role": "student", 
  "status": "active"
}
```

### Payments
```json
{
  "id": 1,
  "userId": 1,
  "semester": "Fall 2024",
  "courseName": "FER202",
  "amount": 1500000,
  "date": "2024-01-15"
}
```

## Redux Integration

- **usersSlice.js**: Configured to fetch from `http://localhost:3001/users`
- **paymentsSlice.js**: Configured to post to `http://localhost:3001/payments`

## Features Demonstrated

1. **Async Redux Actions**: Using createAsyncThunk for API calls
2. **Error Handling**: Proper error states and custom error handling
3. **Loading States**: Loading indicators during API operations
4. **Real Data Persistence**: Changes are saved to db-pt2.json file
5. **CRUD Operations**: Full Create, Read, Update, Delete functionality

## Troubleshooting

### CORS Issues
JSON Server automatically handles CORS for localhost development.

### Port Conflicts
- JSON Server: Port 3001 (configurable in package.json)
- React App: Port 3000 (default)

### Data Reset
To reset data to original state, restore `db-pt2.json` from git or manually edit the file.

## Development Workflow

1. Make changes in the React app
2. Data persists in `db-pt2.json` 
3. Restart JSON server to reset data if needed
4. Use Redux DevTools to monitor state changes
5. Check Network tab in browser to see actual API calls
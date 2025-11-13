import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import UsersManagement from './components/UsersManagement';
import PaymentsManagement from './components/PaymentsManagement';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Lab 6: Redux, Redux Thunk và Redux Toolkit
            </h1>
            <p className="mt-2 text-gray-600">
              Demonstration of Redux Toolkit with Users and Payments Management
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          {/* Redux DevTools Notice */}
          <div className="px-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                🔧 Redux DevTools
              </h3>
              <p className="text-blue-700 text-sm">
                Open your browser's Developer Tools (F12) and look for the "Redux" tab to monitor state changes and actions.
                <br />
                <span className="font-medium">
                  Install Redux DevTools Extension: Chrome Web Store → "Redux DevTools"
                </span>
              </p>
            </div>
          </div>

          {/* Users Management Section */}
          <div className="border-b border-gray-200">
            <UsersManagement />
          </div>

          {/* Payments Management Section */}
          <div>
            <PaymentsManagement />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center">
            <p className="text-gray-600 text-sm">
              Redux Toolkit Demo - FER202 Lab 6 | 
              <span className="font-medium ml-1">
                Features: createSlice, createAsyncThunk, Custom Error Handling, Selectors
              </span>
            </p>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsers,
  toggleAdminStatus,
  clearError,
  addUserLocal,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectAdminUsers,
  selectActiveUsers
} from '../store/slices/usersSlice'

const UsersManagement = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const loading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)
  const adminUsers = useSelector(selectAdminUsers)
  const activeUsers = useSelector(selectActiveUsers)
  
  const [newUser, setNewUser] = useState({ 
    fullName: '', 
    username: '', 
    password: '',
    role: 'user' 
  })



  const handleFetchUsers = () => {
    dispatch(fetchUsers())
  }

  const handleToggleAdmin = (userId) => {
    dispatch(toggleAdminStatus({ userId }))
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    if (newUser.fullName && newUser.username) {
      const user = {
        id: Date.now().toString(),
        ...newUser,
        status: 'active'
      }
      dispatch(addUserLocal(user))
      setNewUser({ 
        fullName: '', 
        username: '', 
        password: '',
        role: 'user' 
      })
    }
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bài tập 1: Quản Lý Người Dùng (Users)</h2>
      
      {/* Control Panel */}
      <div className="mb-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex gap-2 mb-3">
          <button 
            onClick={handleFetchUsers}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Users from JSON Server'}
          </button>
          {error && (
            <button 
              onClick={handleClearError}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Error
            </button>
          )}
        </div>

        {/* Add User Form */}
        <form onSubmit={handleAddUser} className="flex gap-2 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              className="px-3 py-2 border rounded"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="px-3 py-2 border rounded"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="px-3 py-2 border rounded"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="px-3 py-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-blue-800">Total Users</h3>
          <p className="text-2xl font-bold text-blue-900">{users.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="font-semibold text-green-800">Admin Users</h3>
          <p className="text-2xl font-bold text-green-900">{adminUsers.length}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          <h3 className="font-semibold text-purple-800">Active Users</h3>
          <p className="text-2xl font-bold text-purple-900">{activeUsers.length}</p>
        </div>
      </div>

      {/* Users Table */}
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleToggleAdmin(user.id)}
                      className={`px-3 py-1 text-xs rounded ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <div className="text-center py-8 text-gray-500">
            No users found. Click "Fetch Users" to load sample data.
          </div>
        )
      )}

      {/* Redux State Debug */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-semibold mb-2">Redux State Debug:</h4>
        <div className="text-sm text-gray-600">
          <p>Loading: {loading ? 'true' : 'false'}</p>
          <p>Error: {error || 'null'}</p>
          <p>Total Users: {users.length}</p>
          <p>Admin Users: {adminUsers.length}</p>
          <p>Active Users: {activeUsers.length}</p>
        </div>
      </div>
    </div>
  )
}

export default UsersManagement
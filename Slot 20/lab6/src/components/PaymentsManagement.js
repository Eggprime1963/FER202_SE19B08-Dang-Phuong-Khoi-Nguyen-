import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPayment,
  fetchPayments,
  clearError,
  clearPayments,
  selectPayments,
  selectPaymentsLoading,
  selectPaymentsError,
  selectCreateLoading,
  selectSuccessfulPayments,
  selectPendingPayments,
  selectTotalSuccessfulAmount
} from '../store/slices/paymentsSlice'

const PaymentsManagement = () => {
  const dispatch = useDispatch()
  const payments = useSelector(selectPayments)
  const loading = useSelector(selectPaymentsLoading)
  const createLoading = useSelector(selectCreateLoading)
  const error = useSelector(selectPaymentsError)
  const successfulPayments = useSelector(selectSuccessfulPayments)
  const pendingPayments = useSelector(selectPendingPayments)
  const totalSuccessfulAmount = useSelector(selectTotalSuccessfulAmount)
  
  const [newPayment, setNewPayment] = useState({
    amount: '',
    courseName: '',
    semester: '',
    userId: '1',
    date: new Date().toISOString().split('T')[0]
  })

  const handleFetchPayments = () => {
    dispatch(fetchPayments())
  }

  const handleCreatePayment = async (e) => {
    e.preventDefault()
    if (!newPayment.amount || !newPayment.courseName) return
    
    const paymentData = {
      amount: parseFloat(newPayment.amount),
      courseName: newPayment.courseName,
      semester: newPayment.semester,
      userId: newPayment.userId,
      date: newPayment.date
    }
    
    await dispatch(createPayment(paymentData))
    
    // Reset form if successful
    if (!error) {
      setNewPayment({ 
        amount: '', 
        courseName: '', 
        semester: '', 
        userId: '1',
        date: new Date().toISOString().split('T')[0]
      })
    }
  }



  const handleClearError = () => {
    dispatch(clearError())
  }

  const handleClearPayments = () => {
    dispatch(clearPayments())
  }



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bài tập 2: Quản Lý Thanh Toán (Payments)</h2>
      
      {/* Control Panel */}
      <div className="mb-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex gap-2 mb-4">
          <button 
            onClick={handleFetchPayments}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Payments (Mock API)'}
          </button>
          <button 
            onClick={handleClearPayments}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Payments
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

        {/* Create Payment Form */}
        <form onSubmit={handleCreatePayment} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Amount (VNĐ)</label>
            <input
              type="number"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter amount"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input
              type="text"
              value={newPayment.courseName}
              onChange={(e) => setNewPayment({ ...newPayment, courseName: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter course name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select
              value={newPayment.semester}
              onChange={(e) => setNewPayment({ ...newPayment, semester: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select semester</option>
              <option value="Fall 2025">Fall 2025</option>
              <option value="Spring 2026">Spring 2026</option>
              <option value="Summer 2026">Summer 2026</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <select
              value={newPayment.userId}
              onChange={(e) => setNewPayment({ ...newPayment, userId: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="1">User 1 (Nam)</option>
              <option value="2">User 2 (Hai)</option>
              <option value="3">User 3 (Thanh)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={newPayment.date}
              onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button 
            type="submit" 
            disabled={createLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {createLoading ? 'Creating...' : 'Create Payment'}
          </button>
        </form>
        
        <div className="mt-2 text-sm text-gray-600">
          💡 Tip: Try amount &gt; 2,000,000 to test custom error "Tài khoản không đủ tiền"
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Statistics using selectors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-blue-800">Total Payments</h3>
          <p className="text-2xl font-bold text-blue-900">{payments.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="font-semibold text-green-800">Successful</h3>
          <p className="text-2xl font-bold text-green-900">{successfulPayments.length}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h3 className="font-semibold text-yellow-800">Pending</h3>
          <p className="text-2xl font-bold text-yellow-900">{pendingPayments.length}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          <h3 className="font-semibold text-purple-800">Total Success Amount</h3>
          <p className="text-xl font-bold text-purple-900">{totalSuccessfulAmount.toLocaleString()} ₫</p>
        </div>
      </div>

      {/* Payments Table */}
      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.amount?.toLocaleString()} ₫
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <div className="text-center py-8 text-gray-500">
            No payments found. Click "Fetch Payments" to load sample data.
          </div>
        )
      )}

      {/* Redux State Debug */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-semibold mb-2">Redux State & Selectors Debug:</h4>
        <div className="text-sm text-gray-600 grid grid-cols-2 gap-4">
          <div>
            <p><strong>Basic State:</strong></p>
            <p>Loading: {loading ? 'true' : 'false'}</p>
            <p>Create Loading: {createLoading ? 'true' : 'false'}</p>
            <p>Error: {error || 'null'}</p>
            <p>Total Payments: {payments.length}</p>
          </div>
          <div>
            <p><strong>Selector Results:</strong></p>
            <p>Successful Payments: {successfulPayments.length}</p>
            <p>Pending Payments: {pendingPayments.length}</p>
            <p>Total Success Amount: {totalSuccessfulAmount.toLocaleString()} ₫</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsManagement
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPayment,
  fetchPayments,
  clearError,
  updatePaymentStatus,
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
    description: '',
    userId: '',
    type: 'TUITION'
  })

  // Override fetch for demo
  useEffect(() => {
    const originalFetch = window.fetch
    
    // Mock data for demonstration
    const mockPayments = [
      { id: 1, amount: 1500000, description: 'Học phí kỳ 1', status: 'SUCCESS', userId: 1, type: 'TUITION', createdAt: '2024-01-15' },
      { id: 2, amount: 500000, description: 'Phí thi lại', status: 'PENDING', userId: 2, type: 'EXAM', createdAt: '2024-01-16' },
      { id: 3, amount: 200000, description: 'Phí học phần', status: 'SUCCESS', userId: 3, type: 'COURSE', createdAt: '2024-01-17' },
      { id: 4, amount: 2500000, description: 'Học phí kỳ 2', status: 'FAILED', userId: 1, type: 'TUITION', createdAt: '2024-01-18' }
    ]

    let nextId = 5
    
    // Mock fetch function
    const mockFetch = async (url, options = {}) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (url === '/api/payments' && options.method === 'POST') {
        const paymentData = JSON.parse(options.body)
        
        // Simulate 402 error for large amounts (demonstrate custom error handling)
        if (paymentData.amount > 2000000) {
          return {
            ok: false,
            status: 402,
            json: async () => ({ message: 'Payment Required' })
          }
        }
        
        const newPayment = {
          id: nextId++,
          ...paymentData,
          status: Math.random() > 0.3 ? 'SUCCESS' : 'PENDING',
          createdAt: new Date().toISOString().split('T')[0]
        }
        
        return {
          ok: true,
          status: 201,
          json: async () => newPayment
        }
      }
      
      if (url === '/api/payments') {
        return {
          ok: true,
          status: 200,
          json: async () => mockPayments
        }
      }
      
      throw new Error('Not found')
    }
    
    window.fetch = mockFetch
    
    return () => {
      window.fetch = originalFetch
    }
  }, [])

  const handleFetchPayments = () => {
    dispatch(fetchPayments())
  }

  const handleCreatePayment = async (e) => {
    e.preventDefault()
    if (!newPayment.amount || !newPayment.description) return
    
    const paymentData = {
      amount: parseFloat(newPayment.amount),
      description: newPayment.description,
      userId: parseInt(newPayment.userId) || 1,
      type: newPayment.type
    }
    
    await dispatch(createPayment(paymentData))
    
    // Reset form if successful
    if (!error) {
      setNewPayment({ amount: '', description: '', userId: '', type: 'TUITION' })
    }
  }

  const handleUpdateStatus = (paymentId, newStatus) => {
    dispatch(updatePaymentStatus({ paymentId, status: newStatus }))
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  const handleClearPayments = () => {
    dispatch(clearPayments())
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
        <form onSubmit={handleCreatePayment} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
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
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              value={newPayment.description}
              onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Payment description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="number"
              value={newPayment.userId}
              onChange={(e) => setNewPayment({ ...newPayment, userId: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="User ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={newPayment.type}
              onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="TUITION">Tuition</option>
              <option value="EXAM">Exam</option>
              <option value="COURSE">Course</option>
              <option value="OTHER">Other</option>
            </select>
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
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
                    {payment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {payment.status === 'PENDING' && (
                      <button
                        onClick={() => handleUpdateStatus(payment.id, 'SUCCESS')}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                      >
                        Approve
                      </button>
                    )}
                    {payment.status === 'SUCCESS' && (
                      <button
                        onClick={() => handleUpdateStatus(payment.id, 'FAILED')}
                        className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Refund
                      </button>
                    )}
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
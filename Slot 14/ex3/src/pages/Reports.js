import React, { useState } from 'react';

function Reports() {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('7days');

  const reportData = {
    sales: {
      title: '💰 Sales Report',
      data: [
        { label: 'Today', value: '$2,450', change: '+12%', color: '#27ae60' },
        { label: 'This Week', value: '$18,670', change: '+8%', color: '#27ae60' },
        { label: 'This Month', value: '$67,890', change: '+15%', color: '#27ae60' },
        { label: 'This Year', value: '$789,450', change: '+22%', color: '#27ae60' }
      ]
    },
    users: {
      title: '👥 User Activity Report',
      data: [
        { label: 'Active Users', value: '1,234', change: '+5%', color: '#3498db' },
        { label: 'New Signups', value: '89', change: '+25%', color: '#27ae60' },
        { label: 'Churn Rate', value: '2.3%', change: '-0.5%', color: '#27ae60' },
        { label: 'Avg Session', value: '12m 34s', change: '+3%', color: '#3498db' }
      ]
    },
    products: {
      title: '📦 Product Performance',
      data: [
        { label: 'Best Seller', value: 'iPhone 15', change: '456 sold', color: '#f39c12' },
        { label: 'Top Category', value: 'Electronics', change: '67% of sales', color: '#9b59b6' },
        { label: 'Low Stock', value: '12 items', change: 'Need restock', color: '#e74c3c' },
        { label: 'New Products', value: '5 items', change: 'This month', color: '#1abc9c' }
      ]
    }
  };

  const currentData = reportData[selectedReport];

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>📈 Analytics & Reports</h2>
      
      {/* Report Controls */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '25px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'center'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#2c3e50' }}>
            📊 Report Type
          </label>
          <select 
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            style={{ 
              padding: '10px 15px', 
              borderRadius: '6px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              minWidth: '150px'
            }}
          >
            <option value="sales">Sales Performance</option>
            <option value="users">User Analytics</option>
            <option value="products">Product Insights</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#2c3e50' }}>
            📅 Date Range
          </label>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ 
              padding: '10px 15px', 
              borderRadius: '6px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              minWidth: '120px'
            }}
          >
            <option value="1day">Last 24 hours</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
        
        <button 
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => alert(`Generating ${selectedReport} report for ${dateRange}...`)}
        >
          📥 Export Report
        </button>
      </div>

      {/* Report Content */}
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginBottom: '25px', color: '#2c3e50' }}>{currentData.title}</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {currentData.data.map((item, index) => (
            <div 
              key={index}
              style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '8px',
                borderLeft: `4px solid ${item.color}`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <h4 style={{ color: '#34495e', fontSize: '14px', marginBottom: '10px' }}>
                {item.label}
              </h4>
              <p style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#2c3e50',
                margin: '10px 0'
              }}>
                {item.value}
              </p>
              <p style={{ 
                fontSize: '13px', 
                color: item.color,
                fontWeight: '500',
                margin: 0
              }}>
                {item.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>📊 Trend Analysis</h3>
        <div style={{ 
          height: '200px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ddd'
        }}>
          <div style={{ textAlign: 'center', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📈</div>
            <p>Interactive Chart Would Be Here</p>
            <p style={{ fontSize: '14px' }}>
              (In real app: Chart.js, Recharts, or D3.js)
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#fff3e0', 
        borderRadius: '8px',
        border: '1px solid #ff9800'
      }}>
        <h4 style={{ color: '#f57c00', marginBottom: '10px' }}>
          🎯 Nested Route: /dashboard/reports
        </h4>
        <p style={{ color: '#2c3e50', lineHeight: '1.6', margin: 0 }}>
          Trang Reports này cũng được render trong <code>&lt;Outlet /&gt;</code> của DashboardLayout.
          Bạn có thể thấy sidebar navigation vẫn giữ nguyên, chỉ có content area này thay đổi.
          State của report filters được quản lý riêng biệt cho trang này.
        </p>
      </div>
    </div>
  );
}

export default Reports;
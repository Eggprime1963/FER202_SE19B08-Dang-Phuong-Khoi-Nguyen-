import React from 'react';

function DashboardHome() {
  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>🏠 Dashboard Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#3498db', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>👥 Total Users</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>1,234</p>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>↑ 12% from last month</p>
        </div>
        
        <div style={{ backgroundColor: '#27ae60', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>💰 Revenue</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>$45,678</p>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>↑ 8% from last month</p>
        </div>
        
        <div style={{ backgroundColor: '#e74c3c', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>📦 Orders</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>892</p>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>↓ 3% from last month</p>
        </div>
        
        <div style={{ backgroundColor: '#f39c12', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>⚠️ Pending</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>23</p>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>Need attention</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>📊 Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #3498db' }}>
            <strong>New user registered:</strong> john.doe@email.com
            <span style={{ float: 'right', color: '#666', fontSize: '14px' }}>2 minutes ago</span>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #27ae60' }}>
            <strong>Order completed:</strong> #ORD-2024-001234
            <span style={{ float: 'right', color: '#666', fontSize: '14px' }}>15 minutes ago</span>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #f39c12' }}>
            <strong>Payment pending:</strong> Invoice #INV-445566
            <span style={{ float: 'right', color: '#666', fontSize: '14px' }}>1 hour ago</span>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #e74c3c' }}>
            <strong>System maintenance:</strong> Scheduled for tonight
            <span style={{ float: 'right', color: '#666', fontSize: '14px' }}>3 hours ago</span>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#e8f6f3', padding: '20px', borderRadius: '8px', border: '1px solid #1abc9c' }}>
        <h4 style={{ color: '#16a085', marginBottom: '10px' }}>
          ✨ Đây là Index Route của /dashboard
        </h4>
        <p style={{ color: '#2c3e50', lineHeight: '1.6', margin: 0 }}>
          Khi URL chính xác là <code>/dashboard</code> (không có path con), 
          component <strong>DashboardHome</strong> này sẽ được render thông qua <code>index route</code>.
          Sidebar navigation và layout được chia sẻ với tất cả các trang con khác.
        </p>
      </div>
    </div>
  );
}

export default DashboardHome;
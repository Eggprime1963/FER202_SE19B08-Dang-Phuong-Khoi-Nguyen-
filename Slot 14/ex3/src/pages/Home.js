import React from 'react';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🏠 Trang Chủ</h1>
      <p>Chào mừng đến với Exercise 3: Nested Routes & Layout!</p>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', maxWidth: '800px', margin: '30px auto' }}>
        <h3>📚 Bài Tập 3: Nested Routes và Dashboard Layout</h3>
        <p><strong>Mục tiêu:</strong> Áp dụng Nested Routes để xây dựng một layout quản trị (Dashboard).</p>
        
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <h4>🎯 Tính năng đã implement:</h4>
          <ul>
            <li>✅ <strong>DashboardLayout:</strong> Layout chung cho các trang Dashboard</li>
            <li>✅ <strong>Index Route:</strong> /dashboard hiển thị DashboardHome</li>
            <li>✅ <strong>Nested Routes:</strong> /dashboard/settings và /dashboard/reports</li>
            <li>✅ <strong>Outlet Component:</strong> Render các route con bên trong layout</li>
            <li>✅ <strong>Shared Navigation:</strong> Sidebar điều hướng cố định</li>
          </ul>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '6px' }}>
          <h4>🚀 Hướng dẫn sử dụng:</h4>
          <ol style={{ textAlign: 'left' }}>
            <li>Click vào "📊 Dashboard" trong menu trên</li>
            <li>Khám phá các tab: Home, Settings, Reports trong Dashboard</li>
            <li>Quan sát cách URL thay đổi với nested routes</li>
            <li>Lưu ý layout được chia sẻ giữa các trang con</li>
          </ol>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <p style={{ color: '#666' }}>
          Nested Routes giúp tổ chức code tốt hơn và chia sẻ layout giữa các trang liên quan.
        </p>
      </div>
    </div>
  );
}

export default Home;
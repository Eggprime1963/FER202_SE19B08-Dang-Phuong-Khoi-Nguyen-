import React from 'react';

function About() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ℹ️ Giới Thiệu Về Nested Routes</h1>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '25px' }}>
        <h2>🎯 Tại Sao Sử Dụng Nested Routes?</h2>
        <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
          Nested Routes cho phép chúng ta xây dựng các ứng dụng có cấu trúc phân cấp, 
          nơi các route con chia sẻ layout và logic chung với route cha.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: '#e8f5e8', padding: '20px', borderRadius: '8px' }}>
          <h3>✅ Ưu Điểm của Nested Routes:</h3>
          <ul style={{ textAlign: 'left', lineHeight: '1.6' }}>
            <li><strong>Chia sẻ Layout:</strong> Sidebar, header chung</li>
            <li><strong>Tổ chức Code:</strong> Nhóm các trang liên quan</li>
            <li><strong>URL Structure:</strong> Cấu trúc URL có ý nghĩa</li>
            <li><strong>Performance:</strong> Không re-render layout</li>
            <li><strong>Maintainability:</strong> Dễ bảo trì và mở rộng</li>
          </ul>
        </div>
        
        <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px' }}>
          <h3>🏗️ Cấu Trúc Route Phẳng vs Nested:</h3>
          <div style={{ textAlign: 'left' }}>
            <p><strong>❌ Route Phẳng:</strong></p>
            <code style={{ display: 'block', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '12px' }}>
              /dashboard-home<br/>
              /dashboard-settings<br/>
              /dashboard-reports
            </code>
            
            <p style={{ marginTop: '15px' }}><strong>✅ Nested Routes:</strong></p>
            <code style={{ display: 'block', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '12px' }}>
              /dashboard<br/>
              /dashboard/settings<br/>
              /dashboard/reports
            </code>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
        <h3>🔧 Các Thành Phần Chính:</h3>
        <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <p><strong>1. Outlet Component:</strong> Là nơi các route con được render</p>
          <p><strong>2. Index Route:</strong> Route mặc định khi chỉ có path cha</p>
          <p><strong>3. Layout Component:</strong> Chứa UI chung và Outlet</p>
          <p><strong>4. Relative Navigation:</strong> Điều hướng tương đối trong layout</p>
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
        <p>
          Hãy truy cập <strong>Dashboard</strong> để xem thực tế cách Nested Routes hoạt động!
        </p>
      </div>
    </div>
  );
}

export default About;
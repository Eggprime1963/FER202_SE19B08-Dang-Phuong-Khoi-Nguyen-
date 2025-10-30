import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function DashboardLayout() {
  const layoutStyle = {
    display: 'flex',
    minHeight: '500px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#34495e',
    padding: '20px',
    color: 'white'
  };

  const contentStyle = {
    flex: 1,
    padding: '30px',
    backgroundColor: '#f8f9fa'
  };

  const navLinkStyle = {
    display: 'block',
    padding: '12px 15px',
    margin: '5px 0',
    textDecoration: 'none',
    color: '#ecf0f1',
    borderRadius: '6px',
    transition: 'all 0.3s ease'
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    backgroundColor: '#3498db',
    color: 'white'
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px', color: '#2c3e50' }}>📊 Dashboard Management System</h1>
      
      <div style={layoutStyle}>
        {/* Sidebar Navigation - Fixed for all dashboard pages */}
        <nav style={sidebarStyle}>
          <h3 style={{ marginBottom: '20px', color: '#3498db' }}>📋 Navigation</h3>
          
          <NavLink 
            to="/dashboard" 
            end
            style={({ isActive }) => isActive ? activeNavLinkStyle : navLinkStyle}
          >
            🏠 Dashboard Home
          </NavLink>
          
          <NavLink 
            to="/dashboard/settings"
            style={({ isActive }) => isActive ? activeNavLinkStyle : navLinkStyle}
          >
            ⚙️ Settings
          </NavLink>
          
          <NavLink 
            to="/dashboard/reports"
            style={({ isActive }) => isActive ? activeNavLinkStyle : navLinkStyle}
          >
            📈 Reports
          </NavLink>

          <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#2c3e50', borderRadius: '6px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>🔍 Current Route:</h4>
            <code style={{ fontSize: '12px', color: '#3498db' }}>
              {window.location.pathname}
            </code>
          </div>
        </nav>

        {/* Main Content Area - This is where child routes are rendered */}
        <main style={contentStyle}>
          {/* Outlet component renders the matched child route */}
          <Outlet />
        </main>
      </div>
      
      {/* Analysis Section */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '8px',
        border: '1px solid #ffeaa7'
      }}>
        <h3>📝 Phân Tích: Tại Sao Nested Routes Tốt Hơn Routes Phẳng?</h3>
        <div style={{ textAlign: 'left', marginTop: '15px' }}>
          <h4>✅ Ưu điểm của Nested Routes:</h4>
          <ul style={{ lineHeight: '1.6' }}>
            <li><strong>Chia sẻ Layout:</strong> Sidebar và header chỉ render 1 lần, không bị re-render khi chuyển tab</li>
            <li><strong>Quản lý State:</strong> State của layout (như user info, menu state) được bảo toàn</li>
            <li><strong>Performance:</strong> Chỉ content area thay đổi, giảm thiểu DOM operations</li>
            <li><strong>Code Organization:</strong> Nhóm các trang liên quan vào cùng một module</li>
            <li><strong>URL Structure:</strong> /dashboard/settings rõ ràng hơn /dash-settings</li>
            <li><strong>Scalability:</strong> Dễ thêm các trang dashboard mới mà không thay đổi cấu trúc</li>
          </ul>
          
          <h4 style={{ marginTop: '15px' }}>❌ Hạn chế của Routes Phẳng:</h4>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Phải duplicate layout code cho mỗi route</li>
            <li>Khó maintain khi có nhiều trang cùng layout</li>
            <li>State bị reset khi chuyển trang</li>
            <li>Performance kém do re-render toàn bộ layout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
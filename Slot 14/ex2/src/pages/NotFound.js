import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 20px',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '100px', marginBottom: '20px' }}>
        🤔
      </div>
      
      <h1 style={{ 
        fontSize: '48px', 
        color: '#dc3545',
        marginBottom: '15px'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        color: '#333',
        marginBottom: '20px'
      }}>
        Trang Không Tìm Thấy
      </h2>
      
      <p style={{ 
        fontSize: '18px',
        color: '#666',
        marginBottom: '30px',
        maxWidth: '500px'
      }}>
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại. 
        Có thể URL bị sai hoặc trang đã được di chuyển.
      </p>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link 
          to="/"
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease'
          }}
        >
          🏠 Về Trang Chủ
        </Link>
        
        <Link 
          to="/san-pham"
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease'
          }}
        >
          📦 Xem Sản Phẩm
        </Link>
      </div>

      <div style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        maxWidth: '600px'
      }}>
        <h4>💡 Gợi ý:</h4>
        <ul style={{ 
          textAlign: 'left',
          color: '#666',
          lineHeight: '1.6'
        }}>
          <li>Kiểm tra lại URL trong thanh địa chỉ</li>
          <li>Sử dụng menu điều hướng ở trên</li>
          <li>Quay về trang chủ và tìm nội dung bạn cần</li>
        </ul>
      </div>
    </div>
  );
}

export default NotFound;
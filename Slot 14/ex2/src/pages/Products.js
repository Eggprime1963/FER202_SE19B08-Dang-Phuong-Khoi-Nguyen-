import React from 'react';
import { Link } from 'react-router-dom';

function Products() {
  // Danh sách sản phẩm mẫu với ID: 101, 102, 103
  const products = [
    {
      id: 101,
      name: 'Laptop Gaming ROG',
      price: '25,000,000 VNĐ',
      description: 'Laptop gaming cao cấp với card đồ họa mạnh mẽ'
    },
    {
      id: 102,
      name: 'iPhone 15 Pro Max',
      price: '32,000,000 VNĐ',
      description: 'Điện thoại thông minh flagship từ Apple'
    },
    {
      id: 103,
      name: 'Samsung Galaxy S24 Ultra',
      price: '28,000,000 VNĐ',
      description: 'Smartphone Android cao cấp với bút S-Pen'
    }
  ];

  const productCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease'
  };

  const linkButtonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📦 Danh Sách Sản Phẩm</h1>
      <p>Chọn một sản phẩm để xem chi tiết:</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={productCardStyle}>
            <h3>{product.name}</h3>
            <p style={{ color: '#666' }}>{product.description}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#e91e63' }}>
              {product.price}
            </p>
            
            {/* Link điều hướng đến trang chi tiết với productId */}
            <Link 
              to={`/san-pham/${product.id}`}
              style={linkButtonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              👁️ Xem Chi Tiết
            </Link>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>🎯 Mục Tiêu Bài Tập</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Dynamic Routing:</strong> Mỗi sản phẩm có route riêng /san-pham/:productId</li>
          <li><strong>Link Navigation:</strong> Sử dụng Link component để điều hướng</li>
          <li><strong>useParams Hook:</strong> Trang chi tiết sẽ sử dụng useParams để lấy productId</li>
          <li><strong>useNavigate Hook:</strong> Nút "Quay lại" sử dụng programmatic navigation</li>
        </ul>
      </div>
    </div>
  );
}

export default Products;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  // Sử dụng useParams để lấy productId từ URL
  const { productId } = useParams();
  
  // Sử dụng useNavigate cho programmatic navigation
  const navigate = useNavigate();

  // Dữ liệu sản phẩm mẫu (trong thực tế sẽ fetch từ API)
  const productData = {
    101: {
      name: 'Laptop Gaming ROG',
      price: '25,000,000 VNĐ',
      description: 'Laptop gaming cao cấp với card đồ họa mạnh mẽ',
      specs: [
        'CPU: Intel Core i7-12700H',
        'RAM: 16GB DDR4',
        'GPU: NVIDIA RTX 3070',
        'Storage: 1TB NVMe SSD',
        'Display: 15.6" FHD 144Hz'
      ],
      image: '💻'
    },
    102: {
      name: 'iPhone 15 Pro Max',
      price: '32,000,000 VNĐ',
      description: 'Điện thoại thông minh flagship từ Apple',
      specs: [
        'Chip: A17 Pro',
        'RAM: 8GB',
        'Storage: 256GB',
        'Camera: 48MP Pro camera system',
        'Display: 6.7" Super Retina XDR'
      ],
      image: '📱'
    },
    103: {
      name: 'Samsung Galaxy S24 Ultra',
      price: '28,000,000 VNĐ',
      description: 'Smartphone Android cao cấp với bút S-Pen',
      specs: [
        'Chip: Snapdragon 8 Gen 3',
        'RAM: 12GB',
        'Storage: 512GB',
        'Camera: 200MP main camera',
        'Display: 6.8" Dynamic AMOLED 2X'
      ],
      image: '📞'
    }
  };

  const product = productData[productId];

  // Hàm xử lý nút "Quay lại" bằng useNavigate
  const handleGoBack = () => {
    navigate('/san-pham');
  };

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>❌ Sản phẩm không tồn tại</h2>
        <p>Không tìm thấy sản phẩm với ID: <strong>{productId}</strong></p>
        <button 
          onClick={handleGoBack}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Quay lại danh sách sản phẩm
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleGoBack}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ← Quay lại trang sản phẩm
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        {/* Hình ảnh sản phẩm */}
        <div style={{ 
          fontSize: '120px', 
          textAlign: 'center',
          minWidth: '200px'
        }}>
          {product.image}
        </div>

        {/* Thông tin sản phẩm */}
        <div style={{ flex: 1 }}>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>
            {product.name}
          </h1>
          
          <p style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#e91e63',
            marginBottom: '15px'
          }}>
            {product.price}
          </p>
          
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            lineHeight: '1.6',
            marginBottom: '25px'
          }}>
            {product.description}
          </p>

          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            📋 Thông Số Kỹ Thuật:
          </h3>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            {product.specs.map((spec, index) => (
              <li key={index} style={{ 
                padding: '8px 0', 
                borderBottom: index < product.specs.length - 1 ? '1px solid #eee' : 'none',
                fontSize: '14px'
              }}>
                ✓ {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Phần thông tin về useParams và useNavigate */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px' 
      }}>
        <h3>🎯 Demo React Router Hooks:</h3>
        <ul style={{ textAlign: 'left', color: '#1976d2' }}>
          <li><strong>useParams():</strong> Đã lấy productId = <code>{productId}</code> từ URL</li>
          <li><strong>useNavigate():</strong> Nút "Quay lại" sử dụng navigate('/san-pham')</li>
          <li><strong>Dynamic Route:</strong> URL hiện tại: <code>/san-pham/{productId}</code></li>
        </ul>
      </div>
    </div>
  );
}

export default ProductDetail;
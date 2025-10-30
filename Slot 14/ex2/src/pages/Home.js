import React from 'react';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🏠 Trang Chủ</h1>
      <p>Chào mừng đến với ứng dụng React Router!</p>
      <p>Đây là trang chủ của website. Bạn có thể điều hướng đến các trang khác bằng menu ở trên.</p>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>Về Bài Tập Này</h3>
        <p><strong>Bài tập 2:</strong> Dynamic Routing và Programmatic Navigation</p>
        <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>✅ Sử dụng useParams để lấy tham số từ URL</li>
          <li>✅ Tạo danh sách sản phẩm với Link điều hướng</li>
          <li>✅ Sử dụng useNavigate cho programmatic navigation</li>
          <li>✅ Trang chi tiết sản phẩm động với tham số productId</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
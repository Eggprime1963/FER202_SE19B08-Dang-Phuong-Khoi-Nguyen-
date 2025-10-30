import React from 'react';

function Contact() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📞 Liên Hệ Với Chúng Tôi</h1>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🏢 Thông Tin Liên Hệ</h3>
        <p><strong>📧 Email:</strong> contact@example.com</p>
        <p><strong>☎️ Điện thoại:</strong> (+84) 123-456-789</p>
        <p><strong>📍 Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.HCM</p>
        <p><strong>🕒 Giờ làm việc:</strong> 8:00 - 17:00 (Thứ 2 - Thứ 6)</p>
      </div>

      <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
        <h3>📝 Gửi Tin Nhắn</h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Họ và tên" 
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input 
            type="email" 
            placeholder="Email" 
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input 
            type="tel" 
            placeholder="Số điện thoại" 
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <textarea 
            placeholder="Nội dung tin nhắn..." 
            rows="5"
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
          ></textarea>
          <button 
            type="submit"
            style={{ 
              padding: '12px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✉️ Gửi Tin Nhắn
          </button>
        </form>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
        <p>Chúng tôi sẽ phản hồi trong vòng 24 giờ!</p>
      </div>
    </div>
  );
}

export default Contact;
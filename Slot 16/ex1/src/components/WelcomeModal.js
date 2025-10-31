import React, { useEffect, useState } from 'react';
import { Modal, Button, ProgressBar } from 'react-bootstrap';

const WelcomeModal = ({ show, onHide, autoClose = true, autoCloseDelay = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(autoCloseDelay / 1000);

  useEffect(() => {
    if (!show || !autoClose) return;

    let progressInterval;
    let countdownInterval;
    let autoCloseTimer;

    // Progress bar animation
    progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (autoCloseDelay / 100);
        return prev >= 100 ? 100 : prev + increment;
      });
    }, 100);

    // Countdown timer
    countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 0.1;
        return newTime <= 0 ? 0 : newTime;
      });
    }, 100);

    // Auto close timer
    autoCloseTimer = setTimeout(() => {
      onHide();
    }, autoCloseDelay);

    return () => {
      clearInterval(progressInterval);
      clearInterval(countdownInterval);
      clearTimeout(autoCloseTimer);
    };
  }, [show, autoClose, autoCloseDelay, onHide]);

  useEffect(() => {
    if (show) {
      setProgress(0);
      setTimeLeft(autoCloseDelay / 1000);
    }
  }, [show, autoCloseDelay]);

  const handleClose = () => {
    setProgress(0);
    setTimeLeft(autoCloseDelay / 1000);
    onHide();
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-primary text-white">
        <Modal.Title className="w-100 text-center">
          🎬 Chào mừng đến với Movie Manager!
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="text-center py-4">
        <div className="mb-4">
          <h5 className="text-primary mb-3">
            Hệ thống quản lý phim chuyên nghiệp
          </h5>
          <p className="text-muted mb-0">
            Quản lý bộ sưu tập phim của bạn một cách dễ dàng và hiệu quả
          </p>
        </div>
        
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="me-3">
            <span className="badge bg-success">✨ Thêm phim mới</span>
          </div>
          <div className="me-3">
            <span className="badge bg-info">🔍 Tìm kiếm & Lọc</span>
          </div>
          <div>
            <span className="badge bg-warning">✏️ Chỉnh sửa</span>
          </div>
        </div>

        {autoClose && (
          <div className="mt-4">
            <small className="text-muted d-block mb-2">
              Tự động đóng sau: {Math.ceil(timeLeft)} giây
            </small>
            <ProgressBar 
              variant="primary" 
              now={progress} 
              style={{ height: '4px' }}
            />
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleClose}>
          🚀 Bắt đầu sử dụng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
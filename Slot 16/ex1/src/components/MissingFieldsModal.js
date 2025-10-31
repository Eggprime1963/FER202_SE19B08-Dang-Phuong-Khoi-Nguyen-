import React from 'react';
import { Modal, Button, Alert, ListGroup } from 'react-bootstrap';

const MissingFieldsModal = ({ show, onHide, missingFields = [] }) => {
  const fieldLabels = {
    title: 'Tên phim',
    genre_id: 'Thể loại',
    year: 'Năm sản xuất',
    duration: 'Thời lượng',
    director: 'Đạo diễn',
    description: 'Mô tả'
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      backdrop="static"
      backdropClassName="modal-backdrop-blur"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">
          ⚠️ Thiếu thông tin bắt buộc
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Alert variant="warning" className="mb-3">
          <Alert.Heading className="h6">
            Vui lòng điền đầy đủ các trường bắt buộc:
          </Alert.Heading>
        </Alert>
        
        <ListGroup variant="flush">
          {missingFields.map((field, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center">
              <span className="text-danger me-2">•</span>
              <strong>{fieldLabels[field] || field}</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Đã hiểu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MissingFieldsModal;
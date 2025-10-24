/**
 * ConfirmModal.jsx - Component modal tái sử dụng cho tất cả confirmation trong app
 * 
 * Props:
 * - show: Boolean để hiển thị/ẩn modal
 * - title: Tiêu đề của modal
 * - message: Nội dung thông báo
 * - onConfirm: Callback khi click button Close/Confirm
 * - onHide: Callback khi đóng modal (click X hoặc outside)
 */

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({ show, title, message, onConfirm, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;

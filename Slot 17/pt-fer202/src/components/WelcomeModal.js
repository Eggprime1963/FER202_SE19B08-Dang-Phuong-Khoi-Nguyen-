import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuthState } from '../contexts/AuthContext';

const WelcomeModal = ({ show, onHide }) => {
  const { user } = useAuthState();

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <h4>Welcome, {user?.username}!</h4>
        <p>Login successful.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default WelcomeModal;
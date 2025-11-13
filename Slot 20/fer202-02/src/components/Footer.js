import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        
        {/* Contact Information */}
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 PersonalBudget Demo.</p>
          </Col>
        </Row>
        
        <hr />
        <Row>
          <Col className="text-center">
            <p className="mb-0">Built with React.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
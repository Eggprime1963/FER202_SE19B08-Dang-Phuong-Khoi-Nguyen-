import React from 'react';
import { Button, Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const authState = useAuthState();
  const { logout } = useAuthDispatch();
  const { user, isAuthenticated } = authState;

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <img src='/images/logo.png' alt='logo' />
        <Navbar.Brand href="/home" className="fw-bold">
          PersonalBudget
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <span className="text-light me-3">Signed in as <strong>{user?.fullName}</strong></span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
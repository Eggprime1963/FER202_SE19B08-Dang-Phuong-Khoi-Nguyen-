import React from 'react';
import { Navbar, Nav, Container, Dropdown, Badge, Button} from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const authState = useAuthState();
  const { logout } = useAuthDispatch();
  const { user } = authState;

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/home" className="fw-bold">
          TuitionTracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <span className="text-light me-3">Signed in as {user?.fullName}</span>
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
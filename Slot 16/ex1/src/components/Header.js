import React from 'react';
import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
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

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin': return 'danger';
      case 'manager': return 'warning';
      case 'user': return 'info';
      default: return 'secondary';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'manager': return '📊';
      case 'user': return '👤';
      default: return '❓';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          🎬 Movie Management System
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link active>
              🏠 Dashboard
            </Nav.Link>
            <Nav.Link>
              🎭 Movies
            </Nav.Link>
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <Nav.Link>
                📊 Reports
              </Nav.Link>
            )}
          </Nav>
          
          {/* User Info & Logout */}
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                <span className="me-2">
                  {getRoleIcon(user?.role)} {user?.fullName || user?.username}
                </span>
                <Badge bg={getRoleBadgeVariant(user?.role)} className="ms-1">
                  {user?.role?.toUpperCase()}
                </Badge>
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Header>
                  <div className="fw-bold">{user?.fullName}</div>
                  <small className="text-muted">{user?.email}</small>
                </Dropdown.Header>
                
                <Dropdown.Divider />
                
                <Dropdown.Item>
                  ⚙️ Cài đặt tài khoản
                </Dropdown.Item>
                
                <Dropdown.Item>
                  📝 Thay đổi mật khẩu
                </Dropdown.Item>
                
                <Dropdown.Divider />
                
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  🚪 Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
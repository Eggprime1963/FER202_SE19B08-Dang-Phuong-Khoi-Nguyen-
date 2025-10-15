import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
// LoginForm2 import removed - not currently used
import RegisterForm from './components/RegisterForm';
// ProfileForm import removed - using SearchItem instead
import SearchItem from './components/SearchItem';
import AccountSearch from './components/AccountSearch';
import RegisterForm2 from './components/RegisterForm2';

function App() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">React Hooks Exercises</h1>

      {/* Exercise 1: Counter */}
      <Card className="mb-5">
        <Card.Header as="h2">Exercise 1: Bộ đếm đa năng</Card.Header>
        <Card.Body>
          <CounterComponent />
        </Card.Body>
      </Card>

      {/* Exercise 2: Light Switch */}
      <Card className="mb-5">
        <Card.Header as="h2">Exercise 2: Bật/tắt trạng thái</Card.Header>
        <Card.Body>
          <LightSwitch />
        </Card.Body>
      </Card>

      {/* Exercise 3: Login Form */}
      <Card className="mb-5">
        <Card.Header as="h2">Exercise 3: Form đăng nhập</Card.Header>
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={8}>
              <LoginForm />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Exercise 4: Register Form */}
      <Card className="mb-5">
        <Card.Header as="h2">Exercise 4: Form đăng ký tài khoản</Card.Header>
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={8}>
              <RegisterForm />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Exercise 5: Search Item */}
      <Card className="mb-5">
        <Card.Header as="h2">Exercise 5: Search Item</Card.Header>
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={8}>
              <SearchItem />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Exercise 6: Account Search */}
      <Card className="mb-5">
        <Card.Header as="h2">Exercise 6: Account Search</Card.Header>
        <Card.Body>
          <AccountSearch />
        </Card.Body>
      </Card>
      
      {/* Exercise 7: Registration Form with Validation */}
      <Card className="mb-5">
        <Card.Header as="h2">Exercise 7: Advanced Registration Form</Card.Header>
        <Card.Body>
          <RegisterForm2 />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;

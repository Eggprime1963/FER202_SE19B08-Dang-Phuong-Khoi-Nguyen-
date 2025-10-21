import React from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div className="App">
      <Container className="mt-4">
        <h1 className="text-center mb-4">FER202 - Slot 12 Exercises</h1>
        
        <Tab.Container id="exercises-tabs" defaultActiveKey="counter">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="counter">Exercise 1: Counter</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="toggle">Exercise 2: Toggle</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="login">Exercise 3: Login Form</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Exercise 4: Sign Up Form</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="quiz">Exercise 5-6: Quiz</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="counter">
                  <h2>Exercise 1: Counter Component with useReducer</h2>
                  <CounterComponent />
                </Tab.Pane>
                <Tab.Pane eventKey="toggle">
                  <h2>Exercise 2: Toggle Component with useReducer</h2>
                  <ToggleComponent />
                </Tab.Pane>
                <Tab.Pane eventKey="login">
                  <h2>Exercise 3: Login Form with useReducer</h2>
                  <LoginForm />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <h2>Exercise 4: Sign Up Form with useReducer</h2>
                  <SignUpForm />
                </Tab.Pane>
                <Tab.Pane eventKey="quiz">
                  <h2>Exercise 5-6: Question Bank with Advanced Features</h2>
                  <QuestionBank />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default App;

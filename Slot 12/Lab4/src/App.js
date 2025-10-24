import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';

function App() {
  const [activeTab, setActiveTab] = useState('first');

  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  return (
    <Container className='mt-5'>
      <Tab.Container 
        id='left-tabs' 
        defaultActiveKey='first'
        onSelect={handleTabSelect}
      >
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='first'>Counter</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='second'>Toggle</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='third'>Login Form</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='fourth'>Sign Up Form</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='fifth'>Question Bank</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <CounterComponent />
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <ToggleComponent />
              </Tab.Pane>
              <Tab.Pane eventKey='third'>
                <LoginForm />
              </Tab.Pane>
              <Tab.Pane eventKey='fourth'>
                <SignUpForm />
              </Tab.Pane>
              <Tab.Pane eventKey='fifth'>
                <QuestionBank isActive={activeTab === 'fifth'} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default App;

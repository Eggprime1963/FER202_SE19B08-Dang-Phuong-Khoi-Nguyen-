import React, { useState } from 'react';
import { Card, Row, Col, Container, Form } from 'react-bootstrap';

// Sample account data
const accounts = [
  { id: 1, username: 'john_doe', password: 'Password123!', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, username: 'jane_smith', password: 'Jane@1234', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, username: 'robert_johnson', password: 'Robert#5678', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 4, username: 'lisa_brown', password: 'LisaBrown$90', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 5, username: 'michael_wilson', password: 'Wilson@Mike123', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
];

function AccountSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter accounts based on username search term
  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h3 className="mb-4 text-center">Account Search</h3>
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {filteredAccounts.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredAccounts.map(account => (
            <Col key={account.id}>
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={account.avatar} 
                  style={{ height: '180px', objectFit: 'cover' }} 
                />
                <Card.Body>
                  <Card.Title className="text-center">{account.username}</Card.Title>
                  <Card.Text className="text-center text-muted">
                    Account ID: {account.id}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center p-4 border rounded">
          <p className="text-muted mb-0">No accounts found matching "{searchTerm}"</p>
        </div>
      )}
    </Container>
  );
}

export default AccountSearch;
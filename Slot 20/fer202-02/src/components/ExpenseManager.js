import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Badge, Modal, Card } from 'react-bootstrap';
import ExpenseFormInline from './ExpenseFormInline';
import ExpenseTable from './ExpenseTable';
import FilterBar from './FilterBar';
import { useExpenseState, useExpenseDispatch } from '../contexts/ExpenseContext';
import { useAuthState } from '../contexts/AuthContext';

const ExpenseManager = () => {
  const expenseState = useExpenseState();
  const authState = useAuthState();
  const { fetchExpenses } = useExpenseDispatch();
  
  const { expenses, filteredExpenses, loading, error } = expenseState;
  const { user } = authState;

  const [editingExpense, setEditingExpense] = useState(null);
  const [initialized, setInitialized] = useState(false);


  useEffect(() => {
    const initializeData = async () => {
      if (!initialized) {
        try {
          await Promise.all([
            fetchExpenses(),
          ]);
          setInitialized(true);
        } catch (error) {
          console.error('Error initializing data:', error);
        }
      }
    };

    initializeData();
  }, [fetchExpenses, initialized]);

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleCloseForm = () => {
    setEditingExpense(null);
  };

  //const expenseTotal = filteredExpenses.map(expense, index) => {

  if (!initialized && loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Starting...</span>
          </Spinner>
          <h4 className="mt-3">Loading...</h4>
          <p className="text-muted">Plaese wait.</p>
        </div>
      </Container>
    );
  }

  // Calculate total expenses with VND formatting
  const calculateTotal = () => {
    const total = filteredExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(total);
  };

  return (
    <Container className="py-4">
      {/* Error Display */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible>
              <Alert.Heading>Có lỗi xảy ra!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Top Row - Total Expenses and Filter */}
      <Row className="mb-4">
        {/* Total of Expenses Card */}
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Total of Expenses</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <h2 className="text-primary mb-0">{calculateTotal()}</h2>
              <small className="text-muted">{filteredExpenses.length} expenses</small>
            </Card.Body>
          </Card>
        </Col>

        {/* Filter Card */}
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Filter</h5>
            </Card.Header>
            <Card.Body>
              <FilterBar />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom Row - Add Expense Form and Expense Management Table */}
      <Row>
        {/* Add Expense Form Card */}
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">
                {editingExpense ? 'Edit Expense' : 'Add Expense'}
              </h5>
            </Card.Header>
            <Card.Body>
              <ExpenseFormInline 
                editingExpense={editingExpense}
                onSuccess={handleCloseForm}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Expense Management Table Card */}
        <Col lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0">Expense Management</h5>
            </Card.Header>
            <Card.Body>
              <ExpenseTable onEdit={handleEditExpense} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
};

export default ExpenseManager;
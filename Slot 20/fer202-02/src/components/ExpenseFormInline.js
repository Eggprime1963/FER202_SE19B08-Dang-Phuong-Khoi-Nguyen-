import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useExpenseState, useExpenseDispatch } from '../contexts/ExpenseContext';
import { useAuthState } from '../contexts/AuthContext';

const ExpenseFormInline = ({ editingExpense = null, onSuccess }) => {
  const expenseState = useExpenseState();
  const authState = useAuthState();
  const { handleCreateOrUpdate } = useExpenseDispatch();
  const { loading } = expenseState;
  const { user } = authState;

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        name: editingExpense.name || '',
        amount: editingExpense.amount || '',
        category: editingExpense.category || '',
        date: editingExpense.date || ''
      });
    } else {
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
      });
    }
    setErrors({});
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name cannot be blank.';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount cannot be blank.';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0.';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category cannot be blank.';
    }

    if (!formData.date) {
      newErrors.date = 'Date cannot be blank.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const dataToSend = {
        ...formData,
        amount: parseFloat(formData.amount),
        userId: user?.id || '1'
      };

      const success = await handleCreateOrUpdate(
        dataToSend, 
        !!editingExpense, 
        editingExpense?.id
      );

      if (success) {
        // Reset form
        setFormData({
          name: '',
          amount: '',
          category: '',
          date: new Date().toISOString().split('T')[0]
        });
        setErrors({});
        
        // Callback to parent component
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mb-3">
          <ul className="mb-0">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter expense name"
          required
          disabled={submitting || loading}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
          disabled={submitting || loading}
          isInvalid={!!errors.amount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.amount}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category (e.g., Food, Utilities)"
          required
          disabled={submitting || loading}
          isInvalid={!!errors.category}
        />
        <Form.Control.Feedback type="invalid">
          {errors.category}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          disabled={submitting || loading}
          isInvalid={!!errors.date}
        />
        <Form.Control.Feedback type="invalid">
          {errors.date}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid gap-2">
        <Button
          type="submit"
          variant={editingExpense ? "warning" : "success"}
          disabled={submitting || loading}
        >
          {submitting ? 'Processing...' : editingExpense ? 'Update Expense' : 'Add Expense'}
        </Button>
        
        {editingExpense && (
          <Button
            type="button"
            variant="secondary"
            onClick={onSuccess}
            disabled={submitting || loading}
          >
            Cancel Edit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ExpenseFormInline;
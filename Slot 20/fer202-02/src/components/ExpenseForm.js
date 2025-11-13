import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useExpenseState, useExpenseDispatch } from '../contexts/ExpenseContext';

const ExpenseForm = ({ show, onHide, editingExpense = null }) => {
  const state = useExpenseState();
  const { handleCreateOrUpdate } = useExpenseDispatch();
  const { genres, loading } = state;

  const [formData, setFormData] = useState({
    id: '',
    userId: '',
    name: '',
    amount: '',
    category: '',
    date: new Date()
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        name: editingExpense.name || '',
        category: editingExpense.category || '',
        date: editingExpense.date || new Date(),
        amount: editingExpense.amount || '',
        category: editingExpense.category || '',
        description: editingExpense.description || ''
      });
    } else {
      setFormData({
        name: '',
        category: '',
        date: new Date().getFullYear(),
        amount: '',
        category: '',
        description: ''
      });
    }
    setErrors({});
  }, [editingExpense, show]);

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
    const missingRequiredFields = [];

    if (!formData.name.trim()) {
      newErrors.name = 'Expense name cannot be blank.';
      missingRequiredFields.push('name');
    }

    if (!formData.amount) {
      newErrors.amount = 'Expense amount cannot be blank.';
      missingRequiredFields.push('amount');
    } else if (formData.amount < 0) {
      newErrors.amount = 'Expense amount must be an integer.';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Expense category cannot be blank';
      missingRequiredFields.push('category');
    } 

    const date = new Date();
    if (!formData.date) {
      newErrors.date = 'Expense date cannot be blank';
      missingRequiredFields.push('date');
    } else if (formData.date.getFullYear() < 1900 || formData.date.getFullYear() > date.getFullYear() + 5) {
      newErrors.date = `Expense date must be from 1900 to ${date.getFullYear() + 5}`;
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
      const expenseData = {
        ...formData,
        amount: parseInt(formData.amount)
      };

      const isEditing = !!editingExpense;
      const ok = await handleCreateOrUpdate(expenseData, isEditing, editingExpense?.id);

      if (ok) {
        onHide();
      } else {
        setErrors({ submit: 'Có lỗi xảy ra khi lưu phim. Vui lòng thử lại.' });
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      setErrors({
        submit: 'Có lỗi xảy ra khi lưu phim. Vui lòng thử lại.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      category: '',
      date: new Date().getFullYear(),
      amount: '',
      category: '',
      description: ''
    });
    setErrors({});
    onHide();
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {editingExpense ? 'Edit' : 'Delete'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errors.submit && (
            <Alert variant="danger" className="mb-3">
              {errors.submit}
            </Alert>
          )}

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  placeholder="Nhập tên phim..."
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Amuont <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  isInvalid={!!errors.amount}
                  min="1"
                  max="600"
                  placeholder="Ví dụ: 120"
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Category <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                  disabled={submitting || loading}
                >
                  <option value="">Chọn thể loại</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Date <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.date}
                  min="01-01-1900"
                  max={new Date().getFullYear() + 5}
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose}
            disabled={submitting}
          >
            Hủy
          </Button>
          <Button 
            variant={editingExpense ? "warning" : "primary"}
            type="submit"
            disabled={submitting}
          >
            {submitting && (
              <span className="spinner-border spinner-border-sm me-2" role="status" />
            )}
            {editingExpense ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>

      {/* Missing Fields Modal */}
    </Modal>
  );
};

export default ExpenseForm;
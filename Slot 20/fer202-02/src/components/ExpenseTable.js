import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Badge, 
  Modal, 
  Spinner, 
  Alert,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { useExpenseState, useExpenseDispatch } from '../contexts/ExpenseContext';
import { useAuthState } from '../contexts/AuthContext';

const ExpenseTable = ({ onEdit }) => {
  const expenseState = useExpenseState();
  const authState = useAuthState();
  const { confirmDelete } = useExpenseDispatch();
  
  const { filteredExpenses, loading, error } = expenseState;
  
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    expense: null,
    deleting: false
  });

  const handleDeleteClick = (expense) => {
    setDeleteModal({
      show: true,
      expense,
      deleting: false
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.expense) return;

    setDeleteModal(prev => ({ ...prev, deleting: true }));

    try {
      await confirmDelete(deleteModal.expense.id);
      setDeleteModal({
        show: false,
        expense: null,
        deleting: false
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      // Keep modal open on error
      setDeleteModal(prev => ({ ...prev, deleting: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      show: false,
      expense: null,
      deleting: false
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading expense list...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error!</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (filteredExpenses.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>Not Found</Alert.Heading>
        <p>
          No expenses found.
        </p>
      </Alert>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '25%' }}>Name</th>
              <th style={{ width: '15%' }}>Amount</th>
              <th style={{ width: '10%' }}>Category</th>
              <th style={{ width: '12%' }}>Date</th>
              <th style={{ width: '15%' }} className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => {
              // Format date as DD-MM-YYYY
              const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
              };

              // Format amount as VND currency
              const formatAmount = (amount) => {
                return new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(amount);
              };

              return (
                <tr key={expense.id}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">
                    <strong>{expense.name}</strong>
                  </td>
                  <td className="align-middle">
                    {formatAmount(expense.amount)}
                  </td>
                  <td className="align-middle">
                    <Badge bg="secondary">{expense.category}</Badge>
                  </td>
                  <td className="align-middle">
                    {formatDate(expense.date)}
                  </td>
                    <td className="align-middle text-center">
                      <div className="btn-group" size="sm">
                        <>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Edit this expense</Tooltip>}
                            >
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => onEdit(expense)}
                              >
                                Edit
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Delete this expense</Tooltip>}
                            >
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteClick(expense)}
                              >
                                Delete
                              </Button>
                            </OverlayTrigger>
                            </>
                      </div>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal 
        show={deleteModal.show} 
        onHide={handleDeleteCancel}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {deleteModal.expense && (
            <div>
              <p>Do you want to delete this expense</p>
            </div>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleDeleteCancel}
            disabled={deleteModal.deleting}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={deleteModal.deleting}
          >
            {deleteModal.deleting && (
              <Spinner 
                animation="border" 
                size="sm" 
                className="me-2" 
              />
            )}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpenseTable;
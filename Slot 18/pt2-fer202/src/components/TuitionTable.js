import React from 'react';
import { 
  Table, 
  Badge, 
  Spinner, 
  Alert 
} from 'react-bootstrap';
import { useTuitionState } from '../contexts/TuitionContext';

const TuitionTable = () => {
  const { filteredPayments, loading, error } = useTuitionState();

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading payments...</p>
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

  if (!filteredPayments || filteredPayments.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>No payments available</Alert.Heading>
        <p>
          No tuition payments found matching your criteria.
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
              <th style={{ width: '20%' }}>Semester</th>
              <th style={{ width: '30%' }}>Course Name</th>
              <th style={{ width: '20%' }}>Amount (VND)</th>
              <th style={{ width: '25%' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => {
              const date = new Date(payment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              
              return (
                <tr key={payment.id}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">
                    <strong>{payment.semester}</strong>
                  </td>
                  <td className="align-middle">
                    <Badge bg="primary" className="fs-6">
                      {payment.courseName}
                    </Badge>
                  </td>
                  <td className="align-middle">
                    <Badge bg="success" className="fs-6">
                      {payment.amount.toLocaleString()}
                    </Badge>
                  </td>
                  <td className="align-middle">
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TuitionTable;
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { formatCurrency } from '../utils/formatter'; // We'll create this utility later

const PaymentTable = () => {
    const {
        filteredPayments,
        totalAmount,
        loading,
        error,
        deletePayment
    } = usePayment();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            const result = await deletePayment(id);
            if (!result.success) {
                alert('Failed to delete payment: ' + result.error);
            }
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading payments...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-danger">Error: {error}</div>;
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Semester</th>
                            <th>Course</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td>{payment.semester}</td>
                                <td>{payment.courseName}</td>
                                <td className="text-end">{formatCurrency(payment.amount)}</td>
                                <td>
                                    <div className="d-flex gap-2 justify-content-center">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            onClick={() => {/* handleEdit(payment) */}}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(payment.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="text-end fw-bold">
                                Total Amount:
                            </td>
                            <td className="text-end fw-bold">
                                {formatCurrency(totalAmount)}
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default PaymentTable;
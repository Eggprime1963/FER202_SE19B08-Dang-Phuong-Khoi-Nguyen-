import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewDetailsModal = ({ show, onHide, user }) => {
    if (!user) return null;

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                            className="img-fluid rounded-circle mb-3"
                            style={{ maxWidth: '150px' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th>Full Name</th>
                                    <td>{user.fullName}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>
                                        <span className={`badge ${user.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewDetailsModal;
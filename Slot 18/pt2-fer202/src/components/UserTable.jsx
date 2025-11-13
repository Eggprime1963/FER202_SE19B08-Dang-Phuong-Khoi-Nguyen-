import React from 'react';

const UserTable = ({ users, onViewDetails, onBanAccount }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <img
                                    src={user.avatar}
                                    alt={`${user.username}'s avatar`}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                            </td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>
                                <span className={`badge ${user.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td>
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-info btn-sm me-1"
                                        onClick={() => onViewDetails(user)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className={`btn btn-sm ${user.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => onBanAccount(user.id, user.status)}
                                    >
                                        {user.status === 'active' ? 'Ban Account' : 'Unban Account'}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
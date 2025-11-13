import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import ViewDetailsModal from '../components/ViewDetailsModal';
import ConfirmModal from '../components/ConfirmModal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionUser, setActionUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9999/users');
            setUsers(response.data);
            setFilteredUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const handleFilter = (filters) => {
        let filtered = [...users];

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(user => 
                user.username.toLowerCase().includes(searchLower) ||
                user.fullName.toLowerCase().includes(searchLower)
            );
        }

        if (filters.role && filters.role !== 'all') {
            filtered = filtered.filter(user => user.role === filters.role);
        }

        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(user => user.status === filters.status);
        }

        if (filters.sortBy) {
            filtered.sort((a, b) => {
                if (filters.sortOrder === 'asc') {
                    return a[filters.sortBy].localeCompare(b[filters.sortBy]);
                } else {
                    return b[filters.sortBy].localeCompare(a[filters.sortBy]);
                }
            });
        }

        setFilteredUsers(filtered);
    };

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const handleBanAccountClick = (user) => {
        setActionUser(user);
        setShowConfirmModal(true);
    };

    const handleBanAccount = async () => {
        if (!actionUser) return;

        try {
            const newStatus = actionUser.status === 'active' ? 'locked' : 'active';
            await axios.patch(`http://localhost:9999/users/${actionUser.id}`, {
                status: newStatus
            });
            
            // Update local state
            const updatedUsers = users.map(user => {
                if (user.id === actionUser.id) {
                    return { ...user, status: newStatus };
                }
                return user;
            });
            setUsers(updatedUsers);
            setFilteredUsers(prevFiltered =>
                prevFiltered.map(user => {
                    if (user.id === actionUser.id) {
                        return { ...user, status: newStatus };
                    }
                    return user;
                })
            );
            
            setShowConfirmModal(false);
            setActionUser(null);
        } catch (err) {
            setError('Failed to update user status');
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>User Management</h2>
            <UserFilter onFilter={handleFilter} />
            <UserTable 
                users={filteredUsers}
                onViewDetails={handleViewDetails}
                onBanAccount={handleBanAccountClick}
            />

            <ViewDetailsModal
                show={showDetailsModal}
                onHide={() => setShowDetailsModal(false)}
                user={selectedUser}
            />

            <ConfirmModal
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={handleBanAccount}
                title="Confirm Action"
                message={actionUser 
                    ? `Are you sure you want to ${actionUser.status === 'active' ? 'ban' : 'unban'} ${actionUser.fullName}'s account?`
                    : ''
                }
            />
        </div>
    );
};

export default UserList;
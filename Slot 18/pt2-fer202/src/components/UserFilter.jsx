import React, { useState } from 'react';

const UserFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        search: '',
        role: 'all',
        status: 'all',
        sortBy: 'username',
        sortOrder: 'asc'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Search</label>
                        <input
                            type="text"
                            className="form-control"
                            name="search"
                            value={filters.search}
                            onChange={handleChange}
                            placeholder="Search by username or full name"
                        />
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            name="role"
                            value={filters.role}
                            onChange={handleChange}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="locked">Locked</option>
                        </select>
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label">Sort By</label>
                        <select
                            className="form-select"
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleChange}
                        >
                            <option value="username">Username</option>
                            <option value="fullName">Full Name</option>
                            <option value="role">Role</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    
                    <div className="col-md-2">
                        <label className="form-label">Sort Order</label>
                        <select
                            className="form-select"
                            name="sortOrder"
                            value={filters.sortOrder}
                            onChange={handleChange}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFilter;
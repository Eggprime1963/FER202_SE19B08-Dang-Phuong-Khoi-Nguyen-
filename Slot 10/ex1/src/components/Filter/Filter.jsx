import { useState } from 'react';
import './Filter.css';

function Filter({ onSearch, onFilter, onSort }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [sortOption, setSortOption] = useState('none');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterYear(value);
    onFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSort(value);
  };

  return (
    <div className="card filter-card mb-4">
      <div className="card-body">
        <h5 className="card-title">Filter Movies</h5>
        <div className="row g-3">
          {/* Search */}
          <div className="col-md-4">
            <label htmlFor="searchInput" className="form-label">Search:</label>
            <input 
              type="text" 
              className="form-control" 
              id="searchInput" 
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Filter by Year */}
          <div className="col-md-4">
            <label htmlFor="yearFilter" className="form-label">Filter by Year:</label>
            <select 
              className="form-select" 
              id="yearFilter"
              value={filterYear}
              onChange={handleFilterChange}
            >
              <option value="all">All Years</option>
              <option value="old">2000 and older</option>
              <option value="mid">2001-2015</option>
              <option value="new">After 2015</option>
            </select>
          </div>
          
          {/* Sorting */}
          <div className="col-md-4">
            <label htmlFor="sortOption" className="form-label">Sort by:</label>
            <select 
              className="form-select" 
              id="sortOption"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="none">No Sorting</option>
              <option value="yearAsc">Year ↑</option>
              <option value="yearDesc">Year ↓</option>
              <option value="titleAsc">Title A→Z</option>
              <option value="titleDesc">Title Z→A</option>
              <option value="durationAsc">Duration ↑</option>
              <option value="durationDesc">Duration ↓</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
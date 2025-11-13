import React from 'react';
import { Row, Col, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { useExpenseState, useExpenseDispatch } from '../contexts/ExpenseContext';

const FilterBar = () => {
  const state = useExpenseState();
  const { 
    setCategoryFilter, 
    clearFilters 
  } = useExpenseDispatch();

  const { 
    categoryFilter, 
    filteredExpenses 
  } = state;


  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };


  const handleClearFilters = () => {
    clearFilters();
  };

  const hasActiveFilters = categoryFilter;

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-between align-items-center">
        {hasActiveFilters && (
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={handleClearFilters}
          >
            Clear Filter
          </Button>
        )}
        <Badge bg="info">
          {filteredExpenses.length} result{filteredExpenses.length !== 1 ? 's' : ''}
        </Badge>
      </div>
    </>
  );
};

export default FilterBar;
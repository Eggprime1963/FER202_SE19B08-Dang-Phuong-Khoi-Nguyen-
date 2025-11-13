import React from 'react';
import { Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { useTuitionState, useTuitionDispatch } from '../contexts/TuitionContext';

const FilterBar = () => {
  const { payments, searchTerm, selectedSemester, selectedCourse, sortBy, sortOrder } = useTuitionState();
  const { 
    setSearchTerm, 
    setSemesterFilter, 
    setCourseFilter, 
    setSortBy, 
    clearFilters 
  } = useTuitionDispatch();

  // Get unique semesters and courses for filter options
  const uniqueSemesters = [...new Set(payments?.map(p => p.semester))].sort();
  const uniqueCourses = [...new Set(payments?.map(p => p.courseName))].sort();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSemesterFilter = (e) => {
    setSemesterFilter(e.target.value);
  };

  const handleCourseFilter = (e) => {
    setCourseFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy, newSortOrder);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const hasActiveFilters = searchTerm || selectedSemester || selectedCourse || 
    sortBy !== 'course' || sortOrder !== 'asc';

    return (
    <div className="bg-light p-3 rounded mb-4 shadow-sm">
      <Row className="g-3 align-items-end">
        {/* Search Box */}
        <Col md={4}>
          <Form.Label className="fw-bold">Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by semester or course name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>

        {/* Semester Filter */}
        <Col md={3}>
          <Form.Label className="fw-bold">Semester</Form.Label>
          <Form.Select value={selectedSemester} onChange={handleSemesterFilter}>
            <option value="">All Semesters</option>
            {uniqueSemesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Course Filter */}
        <Col md={3}>
          <Form.Label className="fw-bold">Course Name</Form.Label>
          <Form.Select value={selectedCourse} onChange={handleCourseFilter}>
            <option value="">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Sort Options */}
        <Col md={2}>
          <Form.Label className="fw-bold">Sort By</Form.Label>
          <Form.Select value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
            <option value="course-asc">Course name A→Z</option>
            <option value="course-desc">Course name Z→A</option>
            <option value="date-asc">Date ascending</option>
            <option value="date-desc">Date descending</option>
            <option value="amount-asc">Amount ascending</option>
            <option value="amount-desc">Amount descending</option>
          </Form.Select>
        </Col>      </Row>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Row className="mt-3">
          <Col>
            <div className="d-flex gap-2 align-items-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
              
              {searchTerm && (
                <Badge bg="primary" className="d-flex align-items-center">
                  Search: "{searchTerm}"
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-white p-0 ms-1"
                    onClick={() => setSearchTerm('')}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              
              {selectedSemester && (
                <Badge bg="info" className="d-flex align-items-center">
                  Semester: {selectedSemester}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-white p-0 ms-1"
                    onClick={() => setSemesterFilter('')}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              
              {selectedCourse && (
                <Badge bg="success" className="d-flex align-items-center">
                  Course: {selectedCourse}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-white p-0 ms-1"
                    onClick={() => setCourseFilter('')}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              
              {(sortBy !== 'course' || sortOrder !== 'asc') && (
                <Badge bg="secondary" className="d-flex align-items-center">
                  Sort: {
                    sortBy === 'course' ? 'Course Name' : 
                    sortBy === 'date' ? 'Date' : 'Amount'
                  } ({sortOrder === 'asc' ? '↑' : '↓'})
                </Badge>
              )}
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FilterBar;
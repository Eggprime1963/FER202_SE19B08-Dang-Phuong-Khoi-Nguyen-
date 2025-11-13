import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';

const FilterBar = () => {
    const { 
        filters, 
        setFilters, 
        filterOptions: { semesters, courses } 
    } = usePayment();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Search, Filter & Sort</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by semester or course name */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Search (Semester/Course)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Search by semester or course name"
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Semester */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Filter by Semester</Form.Label>
                                <Form.Select
                                    name="semester"
                                    value={filters.semester}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Semesters</option>
                                    {semesters.map(semester => (
                                        <option key={semester} value={semester}>
                                            {semester}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Filter by Course */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Filter by Course</Form.Label>
                                <Form.Select
                                    name="course"
                                    value={filters.course}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Courses</option>
                                    {courses.map(course => (
                                        <option key={course} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sort by:</Form.Label>
                                <Form.Select
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleFilterChange}
                                >
                                    <option value="course_asc">Course name (A-Z)</option>
                                    <option value="course_desc">Course name (Z-A)</option>
                                    <option value="date_asc">Date (Oldest first)</option>
                                    <option value="date_desc">Date (Newest first)</option>
                                    <option value="amount_asc">Amount (Low to High)</option>
                                    <option value="amount_desc">Amount (High to Low)</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
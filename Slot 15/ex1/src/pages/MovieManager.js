// src/pages/MovieManager.jsx
import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';

// Component con hiển thị nội dung, được bọc bởi Provider
const MovieManagerContent = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <Card className="shadow-sm mb-4">
                        <Card.Header className="bg-primary text-white">
                            <h1 className="text-center mb-0">
                                🎬 Quản lý Phim (Context + useReducer + Axios)
                            </h1>
                        </Card.Header>
                        <Card.Body>
                            <Alert variant="info">
                                <strong>📋 Hướng dẫn sử dụng:</strong>
                                <ul className="mb-0 mt-2">
                                    <li>✅ Thêm phim mới bằng form bên dưới</li>
                                    <li>✅ Chỉnh sửa phim bằng nút "Sửa" trong bảng</li>
                                    <li>✅ Xóa phim bằng nút "Xóa" (có xác nhận)</li>
                                    <li>🔄 Dữ liệu được lưu trong file db.json qua json-server</li>
                                </ul>
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <MovieForm /> 
            
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-secondary text-white">
                            <h2 className="mb-0">📚 Danh sách Phim</h2>
                        </Card.Header>
                        <Card.Body>
                            <MovieTable /> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Technical Details Section */}
            <Row className="mt-4">
                <Col>
                    <Card className="bg-light">
                        <Card.Header>
                            <h4>🏗️ Kiến Trúc Ứng Dụng</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <h5>📦 Backend (json-server):</h5>
                                    <ul>
                                        <li>RESTful API tự động</li>
                                        <li>File db.json lưu dữ liệu</li>
                                        <li>Port 3001</li>
                                        <li>CRUD operations</li>
                                    </ul>
                                </Col>
                                <Col md={4}>
                                    <h5>🔄 State Management:</h5>
                                    <ul>
                                        <li>Context API</li>
                                        <li>useReducer Hook</li>
                                        <li>Actions & Reducers</li>
                                        <li>Global State</li>
                                    </ul>
                                </Col>
                                <Col md={4}>
                                    <h5>🌐 HTTP Client:</h5>
                                    <ul>
                                        <li>Axios instance</li>
                                        <li>Base URL config</li>
                                        <li>Error handling</li>
                                        <li>Async/await</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

// Component chính cung cấp Context
const MovieManager = () => (
    <MovieProvider>
        <MovieManagerContent />
    </MovieProvider>
);

export default MovieManager;
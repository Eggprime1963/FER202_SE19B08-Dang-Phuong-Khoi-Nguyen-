import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import MovieForm from './MovieForm';
import MovieTable from './MovieTable';
import FilterBar from './FilterBar';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';

const MovieManager = () => {
  const movieState = useMovieState();
  const authState = useAuthState();
  const { fetchMovies, fetchGenres } = useMovieDispatch();
  
  const { movies, filteredMovies, loading, error } = movieState;
  const { user } = authState;

  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      if (!initialized) {
        try {
          await Promise.all([
            fetchMovies(),
            fetchGenres()
          ]);
          setInitialized(true);
        } catch (error) {
          console.error('Error initializing data:', error);
        }
      }
    };

    initializeData();
  }, [fetchMovies, fetchGenres, initialized]);

  const handleAddMovie = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  const canAdd = () => {
    return user && (user.role === 'admin' || user.role === 'manager');
  };

  if (!initialized && loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Đang khởi tạo...</span>
          </Spinner>
          <h4 className="mt-3">Đang tải dữ liệu...</h4>
          <p className="text-muted">Vui lòng đợi trong giây lát</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-2">🎬 Quản lý phim</h2>
              <p className="text-muted mb-0">
                Chào mừng {user?.fullName || user?.username}! 
                Hiện có <strong>{movies.length}</strong> phim trong hệ thống.
              </p>
            </div>
            
            {canAdd() && (
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleAddMovie}
                className="shadow"
              >
                ➕ Thêm phim mới
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Error Display */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible>
              <Alert.Heading>Có lỗi xảy ra!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Filter Bar */}
      <Row className="mb-4">
        <Col>
          <FilterBar />
        </Col>
      </Row>

      {/* Stats Section */}
      <Row className="mb-4">
        <Col>
          <div className="bg-light p-3 rounded">
            <Row className="text-center">
              <Col md={3}>
                <div className="border-end">
                  <h4 className="text-primary mb-1">{movies.length}</h4>
                  <small className="text-muted">Tổng số phim</small>
                </div>
              </Col>
              <Col md={3}>
                <div className="border-end">
                  <h4 className="text-success mb-1">{filteredMovies.length}</h4>
                  <small className="text-muted">Kết quả hiển thị</small>
                </div>
              </Col>
              <Col md={3}>
                <div className="border-end">
                  <h4 className="text-warning mb-1">
                    {new Set(movies.map(m => m.genre_id)).size}
                  </h4>
                  <small className="text-muted">Thể loại</small>
                </div>
              </Col>
              <Col md={3}>
                <div>
                  <h4 className="text-info mb-1">
                    {movies.length > 0 
                      ? Math.round(movies.reduce((sum, m) => sum + m.duration, 0) / movies.length)
                      : 0
                    } phút
                  </h4>
                  <small className="text-muted">Thời lượng TB</small>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Movies Table */}
      <Row>
        <Col>
          <div className="bg-white rounded shadow-sm">
            <MovieTable onEdit={handleEditMovie} />
          </div>
        </Col>
      </Row>

      {/* Movie Form Modal */}
      <MovieForm 
        show={showForm}
        onHide={handleCloseForm}
        editingMovie={editingMovie}
      />

      {/* User Permissions Info */}
      {!canAdd() && (
        <Row className="mt-4">
          <Col>
            <Alert variant="info">
              <strong>ℹ️ Thông tin quyền hạn:</strong> 
              Bạn đang đăng nhập với quyền <Badge bg="secondary">{user?.role}</Badge>. 
              {user?.role === 'user' && ' Bạn chỉ có thể xem danh sách phim.'}
              {' '}Liên hệ quản trị viên để được cấp thêm quyền.
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MovieManager;
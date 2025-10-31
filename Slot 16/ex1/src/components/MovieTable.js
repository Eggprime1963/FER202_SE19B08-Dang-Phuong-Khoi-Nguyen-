import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Badge, 
  Modal, 
  Spinner, 
  Alert,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';
import MoviePosterModal from './MoviePosterModal';

const MovieTable = ({ onEdit }) => {
  const movieState = useMovieState();
  const authState = useAuthState();
  const { confirmDelete } = useMovieDispatch();
  
  const { filteredMovies, genres, loading, error } = movieState;
  const { user } = authState;
  
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    movie: null,
    deleting: false
  });

  const [posterModal, setPosterModal] = useState({
    show: false,
    movie: null
  });

  const getGenreName = (id) => {
    // Debug logging
    console.log('Getting genre for ID:', id, 'Type:', typeof id);
    console.log('Available genres:', genres);
    
    // Handle both string and number IDs with flexible comparison
    const genre = genres.find(g => 
      g.id === id || 
      g.id === Number(id) || 
      String(g.id) === String(id)
    );
    
    console.log('Found genre:', genre);
    return genre ? genre.name : 'Không xác định';
  };

  const getMovieGenreId = (movie) => {
    // Handle both genreId and genre_id field names, and ensure we have a valid ID
    return movie.genreId || movie.genre_id || null;
  };

  const getDurationBadge = (duration) => {
    if (duration < 90) return { variant: 'success', text: 'Ngắn' };
    if (duration <= 120) return { variant: 'warning', text: 'Trung bình' };
    return { variant: 'danger', text: 'Dài' };
  };

  const canEdit = () => {
    return user && (user.role === 'admin' || user.role === 'manager');
  };

  const canDelete = () => {
    return user && user.role === 'admin';
  };

  const handleDeleteClick = (movie) => {
    setDeleteModal({
      show: true,
      movie,
      deleting: false
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.movie) return;

    setDeleteModal(prev => ({ ...prev, deleting: true }));

    try {
      await confirmDelete(deleteModal.movie.id);
      setDeleteModal({
        show: false,
        movie: null,
        deleting: false
      });
    } catch (error) {
      console.error('Error deleting movie:', error);
      // Keep modal open on error
      setDeleteModal(prev => ({ ...prev, deleting: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      show: false,
      movie: null,
      deleting: false
    });
  };

  const handlePosterClick = (movie) => {
    setPosterModal({
      show: true,
      movie
    });
  };

  const handlePosterClose = () => {
    setPosterModal({
      show: false,
      movie: null
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-2">Đang tải danh sách phim...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Có lỗi xảy ra!</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (filteredMovies.length === 0) {
    return (
      <Alert variant="info">
        <Alert.Heading>📽️ Không có phim nào</Alert.Heading>
        <p>
          Không tìm thấy phim nào phù hợp với bộ lọc hiện tại. 
          Hãy thử điều chỉnh bộ lọc hoặc thêm phim mới.
        </p>
      </Alert>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '25%' }}>Tên phim</th>
              <th style={{ width: '15%' }}>Thể loại</th>
              <th style={{ width: '10%' }}>Năm</th>
              <th style={{ width: '12%' }}>Thời lượng</th>
              <th style={{ width: '18%' }}>Đạo diễn</th>
              <th style={{ width: '15%' }} className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie, index) => {
              const durationBadge = getDurationBadge(movie.duration);
              
              return (
                <tr key={movie.id}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">
                    <div>
                      <strong>{movie.title}</strong>
                      <div className="mt-1">
                        {movie.description && (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>
                                {movie.description.length > 100 
                                  ? `${movie.description.substring(0, 100)}...`
                                  : movie.description
                                }
                              </Tooltip>
                            }
                          >
                            <Badge bg="info" className="me-2" style={{ cursor: 'pointer' }}>
                              📖
                            </Badge>
                          </OverlayTrigger>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="align-middle">
                    <Badge bg="secondary">
                      {getGenreName(getMovieGenreId(movie))}
                    </Badge>
                  </td>
                  <td className="align-middle">
                    <Badge bg="outline-primary" text="dark">
                      {movie.year}
                    </Badge>
                  </td>
                  <td className="align-middle">
                    <Badge bg={durationBadge.variant}>
                      {movie.duration} phút ({durationBadge.text})
                    </Badge>
                  </td>
                  <td className="align-middle">
                    <small>{movie.director}</small>
                  </td>
                    <td className="align-middle text-center">
                      <div className="btn-group" size="sm">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Xem poster phim</Tooltip>}
                        >
                          <Badge 
                            bg="warning" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePosterClick(movie)}
                          >
                            🎬
                          </Badge>
                        </OverlayTrigger>
                        {(canEdit() || canDelete()) && (
                          <>
                          {canEdit() && (
                            <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Chỉnh sửa phim</Tooltip>}
                            >
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => onEdit(movie)}
                              >
                                ✏️
                              </Button>
                            </OverlayTrigger>
                          )}
                        
                          {canDelete() && (
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Xóa phim</Tooltip>}
                            >
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteClick(movie)}
                              >
                                🗑️
                              </Button>
                            </OverlayTrigger>
                            )}
                            </>
                          )}
                      </div>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal 
        show={deleteModal.show} 
        onHide={handleDeleteCancel}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            🗑️ Xác nhận xóa phim
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {deleteModal.movie && (
            <div>
              <p>Bạn có chắc chắn muốn xóa phim:</p>
              <div className="bg-light p-3 rounded">
                <strong>{deleteModal.movie.title}</strong><br />
                <small className="text-muted">
                  {getGenreName(getMovieGenreId(deleteModal.movie))} • {deleteModal.movie.year} • {deleteModal.movie.director}
                </small>
              </div>
              <Alert variant="warning" className="mt-3 mb-0">
                <small>⚠️ Hành động này không thể hoàn tác!</small>
              </Alert>
            </div>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleDeleteCancel}
            disabled={deleteModal.deleting}
          >
            Hủy
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={deleteModal.deleting}
          >
            {deleteModal.deleting && (
              <Spinner 
                animation="border" 
                size="sm" 
                className="me-2" 
              />
            )}
            Xóa phim
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Movie Poster Modal */}
      <MoviePosterModal
        show={posterModal.show}
        onHide={handlePosterClose}
        movie={posterModal.movie}
      />
    </>
  );
};

export default MovieTable;
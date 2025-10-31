import React, { useState } from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';

const MoviePosterModal = ({ show, onHide, movie }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Generate poster URL based on movie data
  const getPosterUrl = (movie) => {
    if (!movie) return null;
    
    // Option 1: Use poster from JSON data if available
    if (movie.poster) {
      // Convert relative path to full URL (assuming images are served from public folder)
      return movie.poster.startsWith('/') ? movie.poster : `/${movie.poster}`;
    }
    
    // Option 2: Use placeholder with movie title as fallback
    const encodedTitle = encodeURIComponent(movie.title);
    return `https://via.placeholder.com/400x600/2c3e50/ecf0f1?text=${encodedTitle}`;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleModalShow = () => {
    setImageLoading(true);
    setImageError(false);
  };

  const posterUrl = movie ? getPosterUrl(movie) : null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size="md"
      onShow={handleModalShow}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          🎬 {movie?.title || 'Poster phim'}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="text-center p-4">
        {movie && (
          <>
            <div className="mb-3">
              <h6 className="text-muted mb-2">Thông tin phim</h6>
              <div className="d-flex justify-content-center flex-wrap gap-2">
                <span className="badge bg-secondary">{movie.year}</span>
                <span className="badge bg-info">{movie.duration} phút</span>
                <span className="badge bg-success">{movie.director}</span>
              </div>
            </div>

            <div className="poster-container" style={{ minHeight: '400px', position: 'relative' }}>
              {imageLoading && (
                <div className="d-flex flex-column align-items-center justify-content-center h-100 position-absolute w-100">
                  <Spinner animation="border" variant="primary" className="mb-2" />
                  <small className="text-muted">Đang tải poster...</small>
                </div>
              )}
              
              {imageError ? (
                <Alert variant="warning" className="mb-0">
                  <div className="text-center">
                    <div className="mb-2" style={{ fontSize: '3rem' }}>🎭</div>
                    <h6>Không thể tải poster</h6>
                    <p className="mb-0 small">
                      Poster cho phim "{movie.title}" hiện không có sẵn.
                    </p>
                    {movie.poster && (
                      <p className="mb-0 small text-muted mt-1">
                        Đường dẫn: {movie.poster}
                      </p>
                    )}
                  </div>
                </Alert>
              ) : (
                posterUrl && (
                  <img
                    src={posterUrl}
                    alt={`Poster phim ${movie.title}`}
                    className="img-fluid rounded shadow"
                    style={{ 
                      maxHeight: '400px', 
                      maxWidth: '100%',
                      display: imageLoading ? 'none' : 'block'
                    }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                )
              )}
            </div>

            {movie.description && (
              <div className="mt-3 p-3 bg-light rounded">
                <h6 className="text-primary mb-2">📖 Mô tả</h6>
                <p className="text-muted small mb-0 text-start">
                  {movie.description}
                </p>
              </div>
            )}
          </>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoviePosterModal;
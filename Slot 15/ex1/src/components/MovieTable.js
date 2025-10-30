// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  // Lấy confirmDelete từ Context (chứa logic xóa phim)
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  
  const { movies, loading, movieToDelete, showDeleteModal } = state;

  // Mapping genreId to genre name
  const genreMap = {
    1: 'Sci-Fi',
    2: 'Comedy', 
    3: 'Drama',
    4: 'Horror',
    5: 'Romance',
    6: 'Action',
    7: 'Thriller'
  };

  // Hàm để lấy màu badge theo thể loại
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info', 
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
      // Mở Modal Sửa và gán dữ liệu vào state
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      // Mở Modal Xác nhận Xóa và gán phim vào movieToDelete
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
          </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead className="table-dark">
            <tr>
              <th>Poster</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Thể loại</th>
              <th>Thời lượng</th>
              <th>Năm</th>
              <th>Quốc gia</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td>
                    <Image 
                      src={movie.poster} 
                      alt={movie.title} 
                      style={{ width: '60px', height: '80px', objectFit: 'cover' }} 
                      rounded 
                    />
                  </td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">{movie.description?.substring(0, 50)}...</small>
                  </td>
                  <td>
                    <Badge bg={getCategoryBadgeVariant(genreName)}>
                      {genreName}
                    </Badge>
                  </td>
                  <td>{movie.duration} phút</td>
                  <td>{movie.year}</td>
                  <td>{movie.country}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleEditClick(movie)}
                      >
                        ✏️ Sửa
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleDeleteClick(movie)}
                      >
                        🗑️ Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            Bạn có chắc chắn muốn xóa phim <strong>"{movieToDelete?.title}"</strong> (ID: {movieToDelete?.id}) không?
            <br />
            <small className="text-muted">Hành động này không thể hoàn tác.</small>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            ❌ Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            🗑️ Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
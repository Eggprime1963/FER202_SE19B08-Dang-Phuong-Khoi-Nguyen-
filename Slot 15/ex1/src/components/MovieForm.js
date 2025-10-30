// src/components/MovieForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

// Danh sách các thể loại phim theo genreId
const genreOptions = [
    { id: 1, name: 'Sci-Fi' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Romance' },
    { id: 6, name: 'Action' },
    { id: 7, name: 'Thriller' }
];

// Component con tái sử dụng cho các trường input
const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview }) => (
    <>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="formPoster">
                    <Form.Label>Poster Phim</Form.Label>
                    <Form.Control 
                        type="file" 
                        name="posterFile" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mb-2"
                    />
                    <Form.Control 
                        type="text" 
                        name="poster" 
                        value={currentMovie.poster || ''} 
                        onChange={handleInputChange} 
                        placeholder="Hoặc nhập URL hình ảnh" 
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px', maxHeight: '150px' }} />
                        </div>
                    )}
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Tên Phim</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="title" 
                        value={currentMovie.title || ''} 
                        onChange={handleInputChange} 
                        placeholder="Tên phim" 
                        required 
                    />
                </Form.Group>
            </Col>
        </Row>
        
        <Row className="mb-3">
            <Col md={12}>
                <Form.Group controlId="formDescription">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        name="description" 
                        value={currentMovie.description || ''} 
                        onChange={handleInputChange} 
                        placeholder="Mô tả phim" 
                        required 
                    />
                </Form.Group>
            </Col>
        </Row>
        
        <Row className="mb-3">
            <Col md={3}>
                <Form.Group controlId="formGenre">
                    <Form.Label>Thể loại</Form.Label>
                    <Form.Select 
                        name="genreId" 
                        value={currentMovie.genreId || ''} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Chọn thể loại</option>
                        {genreOptions.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group controlId="formYear">
                    <Form.Label>Năm</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="year" 
                        value={currentMovie.year || ''} 
                        onChange={handleInputChange} 
                        placeholder="2024" 
                        min="1900"
                        max="2030"
                        required 
                    />
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group controlId="formCountry">
                    <Form.Label>Quốc gia</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="country" 
                        value={currentMovie.country || ''} 
                        onChange={handleInputChange} 
                        placeholder="USA, Vietnam, etc." 
                        required 
                    />
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group controlId="formDuration">
                    <Form.Label>Thời lượng (phút)</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="duration" 
                        value={currentMovie.duration || ''} 
                        onChange={handleInputChange} 
                        placeholder="120" 
                        min="1"
                        required 
                    />
                </Form.Group>
            </Col>
        </Row>
    </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { name: e.target.name, value: e.target.value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo URL preview cho ảnh
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        // Cập nhật poster trong state với base64 string
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'poster', value: imageUrl } });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCloseEditModal = () => {
      dispatch({ type: 'CLOSE_EDIT_MODAL' });
      setImagePreview(''); // Reset preview khi đóng modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Chuẩn hóa dữ liệu trước khi gửi đi
    const dataToSend = {
      ...currentMovie,
      genreId: parseInt(currentMovie.genreId || 1),
      year: parseInt(currentMovie.year || new Date().getFullYear()),
      duration: parseInt(currentMovie.duration || 0)
    };
    
    // Gọi hàm CRUD từ Context
    const success = await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);
    
    // Reset preview nếu thành công và đang tạo mới
    if (success && isEditing === null) {
      setImagePreview('');
    }
  };

  // Logic cho Form Thêm mới (khi isEditing là null)
  const isCreating = isEditing === null; 
  const createFormProps = {
    currentMovie: isCreating ? currentMovie : initialMovieState.currentMovie, 
    handleInputChange: isCreating ? handleInputChange : () => {},
    handleFileChange: isCreating ? handleFileChange : () => {},
    imagePreview: isCreating ? imagePreview : currentMovie.poster
  };

  return (
    <>
      {/* FORM THÊM MỚI (Luôn hiển thị) */}
      <Container className="p-3 mb-4 border rounded">
        <h3 className="mb-3">🎬 Thêm Phim Mới</h3>
        <Form onSubmit={handleSubmit}>
            <MovieFields {...createFormProps} />
            <div className="d-flex gap-2 mt-3">
                <Button variant="success" type="submit">
                ➕ Thêm Phim
                </Button>
            </div>
        </Form>
      </Container>
      
      {/* MODAL CHỈNH SỬA (Chỉ hiện khi showEditModal là true) */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <MovieFields currentMovie={currentMovie} handleInputChange={handleInputChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>Hủy</Button>
                <Button variant="warning" type="submit">💾 Lưu Thay Đổi</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
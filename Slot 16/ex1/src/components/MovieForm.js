import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieForm = ({ show, onHide, editingMovie = null }) => {
  const state = useMovieState();
  const { handleCreateOrUpdate } = useMovieDispatch();
  const { genres, loading } = state;

  const [formData, setFormData] = useState({
    title: '',
    genre_id: '',
    year: new Date().getFullYear(),
    duration: '',
    director: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title || '',
        genre_id: editingMovie.genre_id || '',
        year: editingMovie.year || new Date().getFullYear(),
        duration: editingMovie.duration || '',
        director: editingMovie.director || '',
        description: editingMovie.description || ''
      });
    } else {
      setFormData({
        title: '',
        genre_id: '',
        year: new Date().getFullYear(),
        duration: '',
        director: '',
        description: ''
      });
    }
    setErrors({});
  }, [editingMovie, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tên phim không được để trống';
    } else if (formData.title.length < 2) {
      newErrors.title = 'Tên phim phải có ít nhất 2 ký tự';
    }

    if (!formData.genre_id) {
      newErrors.genre_id = 'Vui lòng chọn thể loại';
    }

    const currentYear = new Date().getFullYear();
    if (!formData.year) {
      newErrors.year = 'Năm sản xuất không được để trống';
    } else if (formData.year < 1900 || formData.year > currentYear + 5) {
      newErrors.year = `Năm sản xuất phải từ 1900 đến ${currentYear + 5}`;
    }

    if (!formData.duration) {
      newErrors.duration = 'Thời lượng không được để trống';
    } else if (formData.duration < 1 || formData.duration > 600) {
      newErrors.duration = 'Thời lượng phải từ 1 đến 600 phút';
    }

    if (!formData.director.trim()) {
      newErrors.director = 'Tên đạo diễn không được để trống';
    } else if (formData.director.length < 2) {
      newErrors.director = 'Tên đạo diễn phải có ít nhất 2 ký tự';
    }

    if (formData.description && formData.description.length < 10) {
      newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const movieData = {
        ...formData,
        genre_id: parseInt(formData.genre_id),
        year: parseInt(formData.year),
        duration: parseInt(formData.duration)
      };

      const isEditing = !!editingMovie;
      const ok = await handleCreateOrUpdate(movieData, isEditing, editingMovie?.id);

      if (ok) {
        onHide();
      } else {
        setErrors({ submit: 'Có lỗi xảy ra khi lưu phim. Vui lòng thử lại.' });
      }
    } catch (error) {
      console.error('Error saving movie:', error);
      setErrors({
        submit: 'Có lỗi xảy ra khi lưu phim. Vui lòng thử lại.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      genre_id: '',
      year: new Date().getFullYear(),
      duration: '',
      director: '',
      description: ''
    });
    setErrors({});
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {editingMovie ? '✏️ Chỉnh sửa phim' : '➕ Thêm phim mới'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errors.submit && (
            <Alert variant="danger" className="mb-3">
              {errors.submit}
            </Alert>
          )}

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Tên phim <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  placeholder="Nhập tên phim..."
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Thể loại <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="genre_id"
                  value={formData.genre_id}
                  onChange={handleChange}
                  isInvalid={!!errors.genre_id}
                  disabled={submitting || loading}
                >
                  <option value="">Chọn thể loại</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Năm sản xuất <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  isInvalid={!!errors.year}
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.year}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Thời lượng (phút) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  isInvalid={!!errors.duration}
                  min="1"
                  max="600"
                  placeholder="Ví dụ: 120"
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>
              Đạo diễn <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              isInvalid={!!errors.director}
              placeholder="Nhập tên đạo diễn..."
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.director}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Nhập mô tả về phim..."
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Mô tả chi tiết về nội dung, diễn viên, đánh giá...
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose}
            disabled={submitting}
          >
            Hủy
          </Button>
          <Button 
            variant={editingMovie ? "warning" : "primary"}
            type="submit"
            disabled={submitting}
          >
            {submitting && (
              <span className="spinner-border spinner-border-sm me-2" role="status" />
            )}
            {editingMovie ? 'Cập nhật' : 'Thêm phim'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MovieForm;
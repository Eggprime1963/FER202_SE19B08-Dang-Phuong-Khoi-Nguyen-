import React from 'react';
import { Row, Col, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
  const state = useMovieState();
  const { 
    setSearchTerm, 
    setGenreFilter, 
    setDurationFilter, 
    setSortBy, 
    clearFilters 
  } = useMovieDispatch();

  const { 
    searchTerm, 
    selectedGenre, 
    durationFilter, 
    sortBy, 
    sortOrder, 
    genres, 
    filteredMovies 
  } = state;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDurationFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSortBy(newSortBy, newSortOrder);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const hasActiveFilters = searchTerm || selectedGenre || durationFilter || sortBy !== 'title' || sortOrder !== 'asc';

  return (
    <div className="bg-light p-3 rounded mb-4 shadow-sm">
      <Row className="g-3 align-items-end">
        {/* Search Box */}
        <Col md={3}>
          <Form.Label className="small fw-bold text-muted">🔍 Tìm kiếm phim</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Nhập tên phim..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <Button 
                variant="outline-secondary" 
                onClick={() => setSearchTerm('')}
                title="Xóa tìm kiếm"
              >
                ✕
              </Button>
            )}
          </InputGroup>
        </Col>

        {/* Genre Filter */}
        <Col md={2}>
          <Form.Label className="small fw-bold text-muted">🎭 Thể loại</Form.Label>
          <Form.Select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">Tất cả thể loại</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Duration Filter */}
        <Col md={2}>
          <Form.Label className="small fw-bold text-muted">⏱️ Thời lượng</Form.Label>
          <Form.Select value={durationFilter} onChange={handleDurationChange}>
            <option value="">Tất cả</option>
            <option value="short">Ngắn (&lt; 90 phút)</option>
            <option value="medium">Trung bình (90-120 phút)</option>
            <option value="long">Dài (&gt; 120 phút)</option>
          </Form.Select>
        </Col>

        {/* Sort Options */}
        <Col md={3}>
          <Form.Label className="small fw-bold text-muted">📊 Sắp xếp</Form.Label>
          <Form.Select value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
            <option value="title-asc">Tên A → Z</option>
            <option value="title-desc">Tên Z → A</option>
            <option value="year-desc">Năm mới nhất</option>
            <option value="year-asc">Năm cũ nhất</option>
            <option value="duration-asc">Thời lượng tăng dần</option>
            <option value="duration-desc">Thời lượng giảm dần</option>
          </Form.Select>
        </Col>

        {/* Clear Filters & Results Count */}
        <Col md={2}>
          <div className="d-flex flex-column">
            {hasActiveFilters && (
              <Button 
                variant="outline-warning" 
                size="sm" 
                onClick={handleClearFilters}
                className="mb-2"
              >
                🔄 Xóa bộ lọc
              </Button>
            )}
            <Badge bg="info" className="text-center">
              {filteredMovies.length} kết quả
            </Badge>
          </div>
        </Col>
      </Row>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Row className="mt-3">
          <Col>
            <div className="d-flex flex-wrap gap-2">
              <small className="text-muted fw-bold">Bộ lọc hiện tại:</small>
              
              {searchTerm && (
                <Badge bg="primary" className="d-flex align-items-center">
                  Tìm: "{searchTerm}"
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
              
              {selectedGenre && (
                <Badge bg="success" className="d-flex align-items-center">
                  Thể loại: {genres.find(g => g.id === String(selectedGenre))?.name}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-white p-0 ms-1"
                    onClick={() => setGenreFilter('')}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              
              {durationFilter && (
                <Badge bg="warning" className="d-flex align-items-center">
                  Thời lượng: {
                    durationFilter === 'short' ? 'Ngắn' :
                    durationFilter === 'medium' ? 'Trung bình' : 'Dài'
                  }
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-white p-0 ms-1"
                    onClick={() => setDurationFilter('')}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              
              {(sortBy !== 'title' || sortOrder !== 'asc') && (
                <Badge bg="secondary" className="d-flex align-items-center">
                  Sắp xếp: {sortBy === 'title' ? 'Tên' : sortBy === 'year' ? 'Năm' : 'Thời lượng'} 
                  {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-white p-0 ms-1"
                    onClick={() => setSortBy('title', 'asc')}
                  >
                    ×
                  </Button>
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
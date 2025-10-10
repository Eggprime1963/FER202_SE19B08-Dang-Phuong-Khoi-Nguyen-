import { useState } from "react";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Default movie if none provided
  const defaultMovie = {
    id: 1,
    title: "Movie Title",
    director: "Director Name",
    year: 2023,
    genre: "Drama",
    poster: "https://via.placeholder.com/300x450?text=Movie+Poster",
    description: "No description available",
    country: "USA",
    duration: 120,
    showtimes: ["12:00 PM", "3:00 PM", "6:00 PM"]
  };

  // Use provided movie or default
  const movieData = movie || defaultMovie;
  
  // Truncate description for card display
  const truncateDescription = (text, maxLength = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  // Add to favorites function
  const addToFavorites = () => {
    // Get existing favorites from localStorage or initialize empty array
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    // Check if movie is already in favorites
    if (!favorites.some(fav => fav.id === movieData.id)) {
      // Add movie to favorites
      favorites.push(movieData);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Add debug logging
  console.log("Rendering MovieCard for:", movieData.title, "Image path:", movieData.poster || movieData.image);

  // Handle the case where the image might be a relative path or a full URL
  const getImagePath = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
    if (path.startsWith('http')) return path;
    // If it's a relative path like "/images/m1.jpg"
    return path;
  };

  return (
    <>
      <div className="card movie-card h-100">
        <img 
          src={getImagePath(movieData.poster || movieData.image)}
          className="card-img-top" 
          alt={`${movieData.title} movie poster`}
          onError={(e) => {
            console.log("Image failed to load:", e.target.src);
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x450?text=Error+Loading+Image";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{movieData.title}</h5>
          <div className="mb-2">
            <span className="badge bg-primary me-2">{movieData.genre}</span>
            <small className="text-muted">({movieData.year})</small>
          </div>
          <p className="card-text description">
            {truncateDescription(movieData.description)}
          </p>
          <div className="movie-meta mt-2 mb-3">
            <div><strong>Country:</strong> {movieData.country}</div>
            <div><strong>Duration:</strong> {movieData.duration} min</div>
          </div>
          <div className="mt-auto d-flex gap-2">
            <button 
              className="btn btn-outline-success flex-grow-1" 
              onClick={addToFavorites}
            >
              <i className="bi bi-heart"></i> Add to Favorites
            </button>
            <button 
              className="btn btn-outline-primary flex-grow-1"
              onClick={() => setShowModal(true)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast notification - Only shows when showToast is true */}
      {showToast && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Notification</strong>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">
              Added to favorites!
            </div>
          </div>
        </div>
      )}
      
      {/* Modal for movie details */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: showModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{movieData.title}</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <img 
                    src={getImagePath(movieData.poster || movieData.image)} 
                    className="img-fluid rounded" 
                    alt={movieData.title} 
                    onError={(e) => {
                      console.log("Modal image failed to load:", e.target.src);
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/300x450?text=${encodeURIComponent(movieData.title)}`;
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{movieData.title} <span className="badge bg-primary">{movieData.genre}</span></h4>
                  <p className="text-muted">
                    {movieData.year} | {movieData.duration} min | {movieData.country}
                  </p>
                  <p>{movieData.description}</p>
                  <p><strong>Director:</strong> {movieData.director}</p>
                  {movieData.cast && (
                    <p><strong>Cast:</strong> {movieData.cast.join(', ')}</p>
                  )}
                  
                  <div className="mt-4">
                    <h5>Showtimes</h5>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                      {movieData.showtimes?.map((time, index) => (
                        <button key={index} className="btn btn-sm btn-outline-dark">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-success"
                onClick={() => {
                  addToFavorites();
                  setShowModal(false);
                }}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
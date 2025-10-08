import "./MovieCard.css";

function MovieCard({ movie }) {
  // Default movie if none provided
  const defaultMovie = {
    id: 1,
    title: "Movie Title",
    director: "Director Name",
    year: 2023,
    genre: "Drama",
    image: "https://via.placeholder.com/300x450?text=Movie+Poster",
    rating: 8.5
  };

  // Use provided movie or default
  const movieData = movie || defaultMovie;

  return (
    <div className="card movie-card h-100">
      <img src={movieData.image} className="card-img-top" alt={movieData.title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movieData.title}</h5>
        <div className="mb-2">
          <span className="badge bg-primary me-2">{movieData.genre}</span>
          <small className="text-muted">({movieData.year})</small>
        </div>
        <p className="card-text">Director: {movieData.director}</p>
        <div className="mt-auto">
          <div className="rating">
            <span className="badge bg-warning text-dark">★ {movieData.rating}/10</span>
          </div>
          <button className="btn btn-outline-primary mt-2 w-100">View Details</button>
        </div>
      </div>
    </div>
  );
}

// =================================================
// ADVANCED APPROACHES & EXPLANATIONS:
//
// This component uses standard Bootstrap classes instead of React Bootstrap.
// 
// It accepts a 'movie' prop with all movie details, falling back to defaults
// if no movie is provided, demonstrating defensive programming.
//
// The flex layout ensures consistent card heights with the button at the bottom.
// =================================================

export default MovieCard;
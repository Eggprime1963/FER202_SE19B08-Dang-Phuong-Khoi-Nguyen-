import "./Carousel.css";
import { featuredMovies as defaultMovies } from "../../data/carousel";

function HomeCarousel({ movies = defaultMovies }) {
  return (
    <div id="movieCarousel" className="carousel slide movie-carousel" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {movies.map((movie, index) => (
          <button 
            key={`indicator-${movie.id}`}
            type="button" 
            data-bs-target="#movieCarousel" 
            data-bs-slide-to={index} 
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={movie.id}>
            <img
              className="d-block w-100"
              src={movie.poster || movie.image || `https://via.placeholder.com/800x400?text=${movie.title}`}
              alt={movie.title}
              onError={(e) => {
                console.log("Carousel image failed to load:", e.target.src);
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/800x400?text=${movie.title}`;
              }}
            />
            <div className="carousel-caption">
              <h3>{movie.title}</h3>
              <span className="badge bg-primary">{movie.genre}</span>
              <p>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default HomeCarousel;
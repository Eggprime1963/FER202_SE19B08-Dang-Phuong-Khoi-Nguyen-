import "./Carousel.css";

// Default movie data - Recent Oscar-winning movies
const defaultMovies = [
  {
    id: 1,
    title: "Everything Everywhere All at Once",
    genre: "Best Picture 2023",
    image: "https://via.placeholder.com/800x400?text=Everything+Everywhere+All+at+Once",
    description: "A Chinese immigrant is swept up in an insane adventure, in which she alone can save the world by exploring other universes."
  },
  {
    id: 2,
    title: "Oppenheimer",
    genre: "Best Picture 2024",
    image: "https://via.placeholder.com/800x400?text=Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
  },
  {
    id: 3,
    title: "CODA",
    genre: "Best Picture 2022",
    image: "https://via.placeholder.com/800x400?text=CODA",
    description: "A hearing child of deaf adults must choose between pursuing her passion for music and her family's struggling fishing business."
  }
];

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
              src={movie.image}
              alt={movie.title}
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

// =================================================
// ADVANCED APPROACHES & EXPLANATIONS:
//
// This component accepts a 'movies' prop with default values.
// Each movie should have: id, title, genre, image, and description.
// 
// Using the map() function to dynamically generate Carousel.Items
// provides flexibility to display any number of movies.
//
// The Badge component highlights the genre visually for each movie.
// =================================================

export default HomeCarousel;
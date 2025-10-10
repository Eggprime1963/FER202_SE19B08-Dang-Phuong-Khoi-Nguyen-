import { useState } from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import Filter from "../components/Filter/Filter";
import { featuredMovies } from "../data/carousel";
import { movies } from "../data/movies";
import "./HomePage.css";

export default function HomePage() {
    const [filteredMovies, setFilteredMovies] = useState(movies);
    
    // Search handler
    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredMovies(movies);
            return;
        }
        
        const term = searchTerm.toLowerCase();
        const results = movies.filter(movie => 
            movie.title.toLowerCase().includes(term) || 
            (movie.description && movie.description.toLowerCase().includes(term))
        );
        setFilteredMovies(results);
    };
    
    // Filter handler
    const handleFilter = (filterOption) => {
        let results = [...movies];
        
        switch (filterOption) {
            case 'old':
                results = movies.filter(movie => movie.year <= 2000);
                break;
            case 'mid':
                results = movies.filter(movie => movie.year > 2000 && movie.year <= 2015);
                break;
            case 'new':
                results = movies.filter(movie => movie.year > 2015);
                break;
            default:
                // 'all' or any other value - no filtering
                break;
        }
        
        setFilteredMovies(results);
    };
    
    // Sort handler
    const handleSort = (sortOption) => {
        let sorted = [...filteredMovies];
        
        switch (sortOption) {
            case 'yearAsc':
                sorted.sort((a, b) => a.year - b.year);
                break;
            case 'yearDesc':
                sorted.sort((a, b) => b.year - a.year);
                break;
            case 'titleAsc':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'titleDesc':
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'durationAsc':
                sorted.sort((a, b) => a.duration - b.duration);
                break;
            case 'durationDesc':
                sorted.sort((a, b) => b.duration - a.duration);
                break;
            default:
                // 'none' or any other value - no sorting
                break;
        }
        
        setFilteredMovies(sorted);
    };

    return (
        <div className="container py-4">
            <h1 className="text-center my-4">Featured Movies</h1>
            <HomeCarousel movies={featuredMovies} />
            
            <h2 className="text-center my-4">Find Your Movies</h2>
            <Filter 
                onSearch={handleSearch} 
                onFilter={handleFilter} 
                onSort={handleSort} 
            />
            
            {/* Display filtered movies */}
            <div className="filtered-movies-section mt-4">
                <h3 className="mb-3">Search Results ({filteredMovies.length} movies)</h3>
                
                {filteredMovies.length === 0 ? (
                    <div className="alert alert-info">
                        No movies match your search criteria. Try different filters.
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filteredMovies.map((movie) => (
                            <div className="col" key={movie.id || movie.title}>
                                <div className="card h-100 movie-card">
                                    <div className="card-img-container">
                                        <img
                                            src={movie.image || movie.poster || `https://via.placeholder.com/300x450?text=${encodeURIComponent(movie.title)}`}
                                            className="card-img-top"
                                            alt={movie.title}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://via.placeholder.com/300x450?text=${encodeURIComponent(movie.title)}`;
                                            }}
                                        />
                                        <div className="year-badge">{movie.year}</div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                <i className="bi bi-clock me-1"></i> {movie.duration} min
                                                {movie.genre && <span> • {movie.genre}</span>}
                                            </small>
                                        </p>
                                        <p className="card-text description-text">{movie.description}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-sm btn-outline-primary">
                                            <i className="bi bi-heart me-1"></i> Add to Favorites
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
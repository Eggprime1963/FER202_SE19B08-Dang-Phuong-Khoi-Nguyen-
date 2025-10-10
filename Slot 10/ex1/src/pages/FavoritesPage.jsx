import { useState, useEffect } from "react";
import MovieCard from "../components/Movie/MovieCard";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Load favorites from localStorage on component mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
        setIsLoaded(true);
    }, []);
    
    // Function to remove a movie from favorites
    const removeFromFavorites = (movieId) => {
        const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };
    
    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">My Favorite Movies</h1>
            
            {isLoaded && favorites.length === 0 ? (
                <div className="text-center p-5">
                    <h3>You haven't added any favorites yet</h3>
                    <p className="text-muted">Browse our movie collections and add some favorites!</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {favorites.map(movie => (
                        <div className="col" key={movie.id}>
                            <div className="position-relative">
                                <MovieCard movie={movie} />
                                <button 
                                    className="position-absolute top-0 end-0 btn btn-danger btn-sm m-2"
                                    onClick={() => removeFromFavorites(movie.id)}
                                    title="Remove from favorites"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
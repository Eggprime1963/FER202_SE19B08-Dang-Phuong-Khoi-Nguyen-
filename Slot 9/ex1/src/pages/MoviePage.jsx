import { useEffect } from "react";
import MovieCard from "../components/Movie/MovieCard";
import { oscarMovies } from "../data/movies";

export default function MoviePage() {
    // Add debugging to check if the data is being loaded correctly
    useEffect(() => {
        console.log("Oscar movies data:", oscarMovies);
    }, []);

    // Fallback data in case the import isn't working
    const fallbackMovies = [
        {
            id: 1,
            title: "Everything Everywhere All at Once",
            director: "Daniel Kwan, Daniel Scheinert",
            year: 2022,
            genre: "Best Picture 2023",
            poster: "/images/m1.jpg",
            description: "A middle-aged Chinese immigrant is swept up in an insane adventure.",
            country: "USA",
            duration: 139,
            showtimes: ["11:00 AM", "2:30 PM", "6:15 PM", "9:00 PM"]
        },
        {
            id: 2,
            title: "Oppenheimer",
            director: "Christopher Nolan",
            year: 2023,
            genre: "Best Picture 2024",
            poster: "/images/m2.jpg",
            description: "The story of American scientist J. Robert Oppenheimer.",
            country: "USA",
            duration: 180,
            showtimes: ["12:00 PM", "3:45 PM", "7:30 PM", "10:15 PM"]
        }
    ];

    // Use the imported data or fallback if it's empty
    const moviesToDisplay = oscarMovies && oscarMovies.length > 0 ? oscarMovies : fallbackMovies;

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">Movie Collection</h1>
            {moviesToDisplay.length === 0 ? (
                <div className="alert alert-warning">No movies found to display</div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {moviesToDisplay.map(movie => (
                        <div className="col" key={movie.id}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import HomeCarousel from "../components/Carousel/HomeCarousel";
import { featuredMovies } from "../data/carousel";
import { movies } from "../data/movies";

export default function HomePage() {
    // Use the data from movies.js and carousel.js
    console.log("HomePage - Featured movies:", featuredMovies);
    console.log("HomePage - Regular movies:", movies);

    return (
        <div className="container py-4">
            <h1 className="text-center my-4">Featured Movies</h1>
            <HomeCarousel movies={featuredMovies} />
        </div>
    );
}
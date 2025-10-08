import MovieCard from "../components/Movie/MovieCard";

export default function MoviePage() {
    // Recent Oscar-winning movies with more details
    const oscarMovies = [
        {
            id: 1,
            title: "Everything Everywhere All at Once",
            director: "Daniel Kwan, Daniel Scheinert",
            year: 2022,
            genre: "Best Picture 2023",
            image: "https://upload.wikimedia.org/wikipedia/en/1/1e/Everything_Everywhere_All_at_Once.jpg",
            rating: 8.0
        },
        {
            id: 2,
            title: "Oppenheimer",
            director: "Christopher Nolan",
            year: 2023,
            genre: "Best Picture 2024",
            image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
            rating: 8.5
        },
        {
            id: 3,
            title: "CODA",
            director: "Sián Heder",
            year: 2021,
            genre: "Best Picture 2022",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Coda_poster.jpeg/250px-Coda_poster.jpeg",
            rating: 8.0
        },
        {
            id: 4,
            title: "Nomadland",
            director: "Chloé Zhao",
            year: 2020,
            genre: "Best Picture 2021",
            image: "https://play-lh.googleusercontent.com/RpRG6UXkFtYttfcEdg26jsJYKeW2DOBeAyT4nuxoPM1TdpSfRmon8WYh53gevA1886KOnWDbzeD0ZU1u4RE0",
            rating: 7.5
        }
    ];

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5">Oscar-Winning Movies</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {oscarMovies.map(movie => (
                    <div className="col" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
}
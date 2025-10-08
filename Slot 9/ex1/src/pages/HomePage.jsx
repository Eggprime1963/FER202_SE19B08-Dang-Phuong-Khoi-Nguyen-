import HomeCarousel from "../components/Carousel/HomeCarousel";

export default function HomePage() {
    // Custom movies data - Recent Oscar winners
    const featuredMovies = [
        {
          id: 1,
          title: "Parasite",
          genre: "Best Picture 2020",
          image: "https://www.elleman.vn/app/uploads/2019/06/26/phim-ky%CC%81-i%CC%81nh-tru%CC%80ng-hi%CC%80nh-a%CC%89nh-poster.jpg",
          description: "A poor family schemes to become employed by a wealthy family, infiltrating their household by posing as unrelated, highly qualified individuals."
        },
        {
          id: 2,
          title: "Nomadland",
          genre: "Best Picture 2021",
          image: "https://statcdn.fandango.com/MPX/image/NBCU_Fandango/650/1011/Nomadland_final_mobile_219.jpg",
          description: "After losing everything in the Great Recession, a woman embarks on a journey through the American West, living as a van-dwelling modern-day nomad."
        },
        {
          id: 3,
          title: "The Shape of Water",
          genre: "Best Picture 2018",
          image: "https://filmfolkhall.com/wp-content/uploads/2018/04/251f1a5a9f553a216c423309d8eca4e7.jpg",
          description: "A mute custodian at a high-security government laboratory falls in love with a captured humanoid amphibian creature."
        }
    ];

    return (
        <div className="container">
            <h1 className="text-center my-4">Featured Movies</h1>
            <HomeCarousel movies={featuredMovies} />
        </div>
    );
}
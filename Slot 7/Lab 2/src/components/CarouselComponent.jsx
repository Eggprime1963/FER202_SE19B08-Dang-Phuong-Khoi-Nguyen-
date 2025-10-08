import image1 from "../assets/images/pizza1.jpg";
import image2 from "../assets/images/pizza2.jpg";
import image3 from "../assets/images/pizza3.jpg";
import image4 from "../assets/images/pizza4.jpg";
import image5 from "../assets/images/pizza5.jpg";

function CarouselComponent() {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={image1} alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h3>Neapolitan Pizza</h3>
            <p>
              if you are looking for a traditional Italian pizza, the Neapolitan
              is the best option
            </p>
          </div>
        </div>
        
        <div className="carousel-item">
          <img className="d-block w-100" src={image2} alt="Second slide" />
          <div className="carousel-caption d-none d-md-block">
            <h3>Neapolitan Pizza</h3>
            <p>
              if you are looking for a traditional Italian pizza, the Neapolitan
              is the best option
            </p>
          </div>
        </div>
        
        <div className="carousel-item">
          <img className="d-block w-100" src={image3} alt="Third slide" />
          <div className="carousel-caption d-none d-md-block">
            <h3>Neapolitan Pizza</h3>
            <p>
              if you are looking for a traditional Italian pizza, the Neapolitan
              is the best option
            </p>
          </div>
        </div>
        
        <div className="carousel-item">
          <img className="d-block w-100" src={image4} alt="Fourth slide" />
          <div className="carousel-caption d-none d-md-block">
            <h3>Neapolitan Pizza</h3>
            <p>
              if you are looking for a traditional Italian pizza, the Neapolitan
              is the best option
            </p>
          </div>
        </div>
        
        <div className="carousel-item">
          <img className="d-block w-100" src={image5} alt="Fifth slide" />
          <div className="carousel-caption d-none d-md-block">
            <h3>Neapolitan Pizza</h3>
            <p>
              if you are looking for a traditional Italian pizza, the Neapolitan
              is the best option
            </p>
          </div>
        </div>
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CarouselComponent;
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page-container">
      <div className="container py-5">
        <h2 className="text-center mb-4">About Movie Collection</h2>
        
        <div className="row">
          <div className="col-md-6">
            <div className="about-section mb-4">
              <h3>Our Mission</h3>
              <p>
                Our mission is to create the most comprehensive movie database and recommendation system that 
                helps movie enthusiasts discover, track, and enjoy films from across the globe and throughout 
                cinema history.
              </p>
            </div>
            
            <div className="about-section mb-4">
              <h3>Who We Are</h3>
              <p>
                We are a dedicated team of film lovers and technology experts who believe that great stories 
                should be accessible to everyone. Our platform combines cutting-edge technology with cinematic 
                expertise to deliver personalized movie experiences.
              </p>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="about-image-container">
              <img 
                src="/images/about-cinema.jpg" 
                alt="Movie theater" 
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/600x400?text=About+Us";
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="about-section mt-4">
          <h3>Our Features</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-collection-play feature-icon"></i>
                <h4>Extensive Collection</h4>
                <p>Access thousands of movies spanning all genres, eras, and countries.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-star feature-icon"></i>
                <h4>Award Winners</h4>
                <p>Explore Oscar-winning films and other prestigious award recipients.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-heart feature-icon"></i>
                <h4>Personal Favorites</h4>
                <p>Create your own collection of favorite films for easy access.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
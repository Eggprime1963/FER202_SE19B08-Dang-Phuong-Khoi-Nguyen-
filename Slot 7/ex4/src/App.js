import './App.css';
import logo from './assets/fpt-logo.png';

function App() {
  // Import the new logo from assets

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          {/* Logo image from assets - rescaled and no text */}
          <img src={logo} alt="FPT University Logo" className="fpt-logo-img" />
        </div>
        <nav className="main-nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="App-main">
        <section className="about-section">
          <h2>About</h2>
          <p>This is the about section of the website.</p>
        </section>

        <section className="contact-section">
          <h2>Contact</h2>
          <p>For any inquiries, please contact us at example@example.com.</p>
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2023 Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

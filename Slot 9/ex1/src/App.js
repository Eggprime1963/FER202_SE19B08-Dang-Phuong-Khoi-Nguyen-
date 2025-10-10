import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import FooterPage from './pages/FooterPage';

function App() {
  return (
    <div className="App">
      <div className="container py-4">
        <HomePage />
        <hr className="my-5" />
        <MoviePage />
      </div>
      <FooterPage />
    </div>
  );
}

export default App;

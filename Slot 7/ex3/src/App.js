import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's test the grid!</h1>
      </header>
      
      <nav className="navbar">
        <a href="#" className="active">Active</a>
        <a href="#" className="link">Link</a>
        <a href="#" className="link">Link</a>
        <span className="disabled">Disabled</span>
      </nav>

      <div className="grid-container">
        <div className="row row-1">
          <div className="col col-1-1">First col</div>
          <div className="col col-1-2">Second col</div>
        </div>
        <div className="row row-2">
          <div className="col col-2-1">col</div>
          <div className="col col-2-2">col</div>
          <div className="col col-2-3">col</div>
        </div>
        <div className="row row-3">
          <div className="col col-3-1">col</div>
          <div className="col col-3-2">col</div>
          <div className="col col-3-3">col</div>
          <div className="col col-3-4">col</div>
        </div>
      </div>
      
      <footer className="App-footer">
        <p>Created by ABC!</p>
      </footer>
    </div>
  );
}

export default App;

import './App.css';
import { useState } from 'react';
import fptLogo from './assets/fpt.png';
import avatar from './assets/avatar.png';
import fu from './assets/fu.png';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const students = [
    {
      id: "DE160182",
      name: "Nguyễn Hữu Quốc Khánh",
      campus: "DaNang",
      image: avatar
    },
    {
      id: "DE160377",
      name: "Chay Vinh Thiện",
      campus: "QuangNam",
      image: avatar
    },
    {
      id: "DE160547",
      name: "Đỗ Nguyễn Phúc",
      campus: "QuangNam",
      image: avatar
    },
    {
      id: "DE170049",
      name: "Lê Hoàng Minh",
      campus: "DaNang",
      image: avatar
    }
  ];

  // === Exercise 5: React Menu Options with Icons ===

  // Required Results:
  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <div className="logo-container">
            <img src={fptLogo} alt="FPT Logo" className="fpt-logo" />
          </div>
          {/* Menu options - horizontal on desktop, vertical on mobile */}
          <nav className={`main-menu' ${menuOpen ? 'show' : ''}`} aria-label="Main navigation">
            <ul className="menu-list">
              <li className="menu-item">
                <a href="#"></a>
                Trang chủ
              </li>
              <li className="menu-item">
                <i className="bi bi-journal-bookmark-fill" style={{ marginRight: '8px' }}></i>
                Ngành học
              </li>
              <li className="menu-item">
                <i className="bi bi-person-plus-fill" style={{ marginRight: '8px' }}></i>
                Tuyển sinh
              </li>
              <li className="menu-item">
                <i className="bi bi-people-fill" style={{ marginRight: '8px' }}></i>
                Sinh viên
              </li>
            </ul>
          </nav>
          <div className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon">☰</span>
          </div>
          <div className={`search-box ${menuOpen ? 'show' : ''}`}>
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" />
          </div>
        </div>
        
        <div className="banner">
          <img src={fu} alt="FPT University Students" className="banner-img" />
        </div>
        
        <nav className={`breadcrumb ${menuOpen ? 'show' : ''}`}>
          <a href="/">Home</a> / <span>Students</span>
        </nav>
      </header>

      <main className="students-section">
        <h1>Students Detail</h1>
        
        <div className="students-grid">
          {students.map((student) => (
            <div key={student.id} className="student-card">
              <img src={student.image} alt={student.name} className="student-img" />
              <div className="student-details">
                <p className="student-id">{student.id}</p>
                <p className="student-name">{student.name}</p>
                <p className="student-campus">{student.campus}</p>
                <div className="attendance">
                  <label>
                    <input type="radio" name={`attendance-${student.id}`} value="absent" /> Absent
                  </label>
                  <label>
                    <input type="radio" name={`attendance-${student.id}`} value="present" /> Present
                  </label>
                </div>
                <button className="submit-btn">Submit</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="App-footer">
        <div className="footer-content">
          <div className="address">
            <h3>Our Address</h3>
            <p>Khu đô thị FPT Đà Nẵng</p>
            <p>📞 0905911111</p>
            <p>📧 info@fpt.edu.vn</p>
            <p>🌐 danang.fpt.edu.vn</p>
          </div>
          <div className="social">
            <div className="social-icons">
              <span>G+</span>
              <span>f</span>
              <span>in</span>
              <span>tw</span>
              <span>✉</span>
            </div>
            <p>© Copyright 2023</p>
          </div>
        </div>
      </footer>
    </div>
  );

  // ==================================================
  // ADVANCED APPROACHES & EXPLANATIONS:
  //
  // - Instead of using <button> elements, the navigation is now a <nav> with a <ul> and <li> for each menu option.
  // - Each menu item has a Bootstrap icon (bi) to the left, using <i> tags.
  // - For accessibility, the <nav> has aria-label and the list uses semantic HTML.
  // - Styling should be updated in App.css to display .menu-list as horizontal (flex or inline-block).
  // - Example CSS:
  //     .main-menu .menu-list { display: flex; gap: 16px; list-style: none; padding: 0; margin: 0; }
  //     .main-menu .menu-item { cursor: pointer; display: flex; align-items: center; font-weight: 500; }
  //     .main-menu .menu-item:hover { color: #007bff; }
  // - This approach is more typical for navigation menus in React apps.
  // - The rest of the app structure remains unchanged.
}

export default App;

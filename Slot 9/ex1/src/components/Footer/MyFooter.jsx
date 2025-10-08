import "./Footer.css";

// Basic student version
function MyFooter({ author = "Dang Phuong Khoi Nguyen", email = "dang.phuong.khoi.nguyen@example.com", project = "Movies Management" }) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>&copy; {new Date().getFullYear()} {author}. All rights reserved</p>
      <a className="btn btn-link" href="https://github.com/Eggprime1963/FER202_SE19B08-Dang-Phuong-Khoi-Nguyen-">My Link Github's project: {project}</a>
    </footer>
  );
}

// =================================================
// ADVANCED APPROACHES & EXPLANATIONS:
// 
// The component now accepts props with default values, making it more reusable.
// Props:
// - author: The name of the author/creator
// - email: Contact email address
// - project: Name of the GitHub project
//
// Using default parameter values ensures the component works even if props aren't provided.
// This follows the educational pattern from the FER202 course instructions.
// =================================================

export default MyFooter;
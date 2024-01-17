import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style1.css";
import { AppContext } from "./AppContext";

const Home = () => {
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');
  const signOut = () => {
    // Clear all items from localStorage
    localStorage.clear();
    // You can also remove specific items if needed
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    // ...

    // Redirect to the login page or any other desired route
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="Work">About</Link>
          </li>
          <li>
            <Link to="/Studentdash">Internship</Link>
          </li>
          {!userId ? (
            <>
              {" "}
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/SignUp">SignUp</Link>
              </li>
            </>
          ) : (
            <>
            <li> <Link to="/enrolled-projects">Enrolled Courses</Link> </li>
            <li> <Link to="/login" onClick={signOut}>Signout</Link> </li>
            </>
           
          )}
        </ul>
        <h1 className="logo">Internship Portal</h1>
      </div>
    </nav>
  );
};

export default Home;

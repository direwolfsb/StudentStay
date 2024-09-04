import React, { useContext } from 'react';
import './navbar.css';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  // Accessing user data and dispatch function from AuthContext
  const { user, dispatch } = useContext(AuthContext);
  console.log("user", user);

  // Hook for navigation
  const navigate = useNavigate();

  // Handling logout functionality
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatching logout action
    localStorage.removeItem("user"); // Removing user data from localStorage
    navigate("/"); // Redirecting to home page
  };

  return (
    <div className='navbar'>
      <div className="navContainer">
        {/* Logo linking to home page */}
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className='logo'>StudentStay</span>
        </Link>
        
        {/* Conditional rendering based on user login status */}
        {user ? (
          <div>
            <span>Hi {user.username}</span>
            <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            {/* Navigation buttons for Register and Login */}
            <button className="navButton" onClick={() => navigate('/register')}>Register</button>
            <button className="navButton" onClick={() => navigate('/login')}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

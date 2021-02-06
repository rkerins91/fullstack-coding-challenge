import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="navbar">
      <div id="navbar-logo-container">NYCC</div>
      <div id="navbar-link-container">
        <Link to="/complaints" className="navlink">
          Complaints
        </Link>
        <Link to="/login" className="navlink">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

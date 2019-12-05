import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="">
        <nav className="">
          <div className="navDiv">
            <Link to="/" className="titleNav">  
              The Ultimate Verb Conjugator
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}export default Navbar;
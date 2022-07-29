import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./nav.css"
import styled, { keyframes } from "styled-components"
import halo from "../../assets/images/header.png"

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navkeys">
          <li>
            <Link to="/signup" className="navfonts">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="navfonts">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <div>
      <nav className="navbar">
        {showNavigation()}
      </nav>
      <header style={{backgroundImage: `url(${halo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left top' }}>
        <br/>
        <div className="headermain">
          <Link to="/">
            <img className="bitcoin" src="bitcoin.png" alt="bitcoin ico" />
          </Link>
          <p>Bitcoin Bootcamp Store</p>
        </div>
      </header>
    </div>
  );
}

export default Nav;


import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { useState } from "react";


var userToken = localStorage.getItem("access_token");
const AuthButtons = () => {
  const navigate = useNavigate();
  if (userToken) {
      return null
  } 
  else {
      return (
      <div class="text-end" id="authButtons">
        <button type="button" class="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
        <button type="button" class="btn btn-warning" onClick={() => navigate('/signup')}>Sign-up</button>
      </div>
      )
  };
};

const NavButtons = () => {

  const navigate = useNavigate();


  const logOut = () => {
    if (window.confirm("Are you sure?")) {
      axios.get("http://localhost:8080/api/v1/logout")
      localStorage.removeItem("access_token")
      userToken = localStorage.getItem("access_token");
      navigate("/")
      
    }
  }

  if (userToken) {
      return (
        <>
        <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
        <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
        <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
        <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
        <li><a type="button" class="nav-link px-2 text-success" onClick={() => navigate('/game')}>Game</a></li>
        <li><a type="button" class="nav-link px-2 text-warning" onClick={logOut}>Logout</a></li>
        </>
      )
    } 
    else {
      return (
        <>
        <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
        <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
        <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
        <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
        <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </>
      )
  };
};

export const Header = () => {
  userToken = localStorage.getItem("access_token");

  return <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <NavButtons/>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" class="form-control form-control-dark text-white bg-dark" placeholder="Search..." aria-label="Search"/>
        </form>
        <AuthButtons/>
      </div>
    </div>
  </header>
}
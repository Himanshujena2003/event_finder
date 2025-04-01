// src/Components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
  
  const handelEvent = () => {
    if(isAuthenticated){
      navigate("/create-event");
    }
    else{
      navigate("/login")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="bg-[#0f0f0f]/35 text-[#FFFFFF] shadow-md sticky top-0 z-10 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with Small Text */}
        <Link to="/" className="group flex flex-col items-start">
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#1976D2] via-[#FFFFFF] to-[#1976D2] bg-clip-text text-transparent drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg">
            EVENTZZZ
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <button
            onClick={handelEvent}
            className="px-4 py-2 bg-white text-[#000000] rounded-md transition-all duration-300 shadow-md flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            <span>Create</span>
          </button>
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-white text-[#000000] rounded-md  transition-all duration-300 shadow-md"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-5 py-2 bg-transparent border border-[#FFFFFF] text-[#FFFFFF] rounded-md  transition-all duration-300"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-[#FFFFFF] text-[#000000] rounded-md transition-all duration-300 shadow-md"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
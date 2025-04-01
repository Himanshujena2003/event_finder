// src/App.js
import React,{useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import CreateEvent from './Components/CreateEvent';
import Footer from './Components/Footer';
import events from './events';

const logoutAfterTokenExpires = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const { exp } = jwtDecode(token);
  const timeUntilExpiry = exp * 1000 - Date.now();

  if (timeUntilExpiry > 0) {
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }, timeUntilExpiry);
  } else {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
};

const AppContent = () => {
  useEffect(() => {
    logoutAfterTokenExpires();
  }, []);
  const location = useLocation();
  
  const isAuthPage = ['/login', '/signup', '/create-event'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard events={events} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

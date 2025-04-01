import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === true) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-[#1A1A40] via-[#282846] to-[#121212] overflow-hidden">
      {/* EVENTZZZ Logo in the Top-Left Corner */}
      <div className="fixed top-5 left-5 text-3xl font-extrabold text-[#FFFFFF] tracking-wide z-50">
            <Link to="/" className="group flex flex-col items-start">
              <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#1976D2] via-[#FFFFFF] to-[#1976D2] bg-clip-text text-transparent drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg">
                EVENTZZZ
              </span>
            </Link>
      </div>

      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-[#90a6f6] opacity-20 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#6f38ef] opacity-20 rounded-full blur-3xl bottom-20 right-20 animate-pulse"></div>
        <div className="absolute w-full h-full bg-transparent bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.07)_10%,_transparent_40%)]"></div>
      </div>

      {/* Login Form */}
      <div className="relative bg-[#1E1E1E]/80 backdrop-blur-md p-10 rounded-2xl shadow-lg w-full max-w-md border border-[#2A2A2A]">
        <h1 className="text-5xl font-bold text-[#FFFFFF] text-center mb-6">Login</h1>
        <p className="text-center text-[#B0BEC5] mb-8 text-lg">Access your EVENTZZZ account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#708df5] transition-all duration-300 placeholder-[#B0BEC5]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#708df5] transition-all duration-300 placeholder-[#B0BEC5]"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#708df5] text-[#000000] rounded-md shadow-md hover:bg-[#5a7ee3] transition-all duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-[#B0BEC5] mt-6">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-[#FFF8E1] font-medium hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

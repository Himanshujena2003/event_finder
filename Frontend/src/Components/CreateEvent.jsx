import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    category: '',
    desc: '', // Matches backend field name
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    ampm: '',
    place: '',
    address: '',
    price: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation check for empty fields
    if (
      !formData.eventName ||
      !formData.category ||
      !formData.desc || // Updated to desc
      !formData.day ||
      !formData.month ||
      !formData.year ||
      !formData.hour ||
      !formData.minute ||
      !formData.ampm ||
      !formData.place ||
      !formData.address ||
      !formData.price
    ) {
      alert('All fields are required');
      return;
    }

    // Format the event data for the backend
    const formattedData = {
      eventName: formData.eventName,
      category: formData.category,
      desc: formData.desc,
      day: formData.day,
      month: formData.month,
      year: formData.year,
      hour: formData.hour,
      minute: formData.minute,
      ampm: formData.ampm,
      place: formData.place,
      address: formData.address,
      price: formData.price,
    };

    try {
      console.log('Sending data:', formattedData); // Log for debugging
      await axios.post('http://localhost:3000/user/createEvent', formattedData);
      console.log('Event created:', formattedData);
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      console.error('Error creating event:', error.response ? error.response.data : error.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-6 py-12 bg-gradient-to-r from-[#242458] via-[#282846] to-[#121212] overflow-hidden">
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

      <div className="relative bg-[#1E1E1E]/80 backdrop-blur-md p-10 rounded-2xl shadow-lg w-full max-w-xl border border-[#2A2A2A]">
        <h1 className="text-4xl font-bold text-[#FFFFFF] text-center mb-6">Create New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Event Name</label>
            <input
              type="text"
              name="eventName"
              placeholder="Enter event name"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300"
              required
            >
              <option value="">Select a category</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
              <option value="AI">AI</option>
              <option value="Blockchain">Blockchain</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Description</label>
            <textarea
              name="desc" // Changed to match formData
              placeholder="Describe your event"
              value={formData.desc} // Changed to match formData
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5] h-32 resize-none"
              required
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Event Date</label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleChange}
                placeholder="DD"
                className="w-1/3 p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5] text-center"
                required
              />
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                placeholder="MM"
                className="w-1/3 p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5] text-center"
                required
              />
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="YYYY"
                className="w-1/3 p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5] text-center"
                required
              />
            </div>
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Event Time</label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="hour"
                value={formData.hour}
                onChange={handleChange}
                placeholder="HH"
                className="w-1/3 p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5] text-center"
                required
              />
              <input
                type="text"
                name="minute"
                value={formData.minute}
                onChange={handleChange}
                placeholder="MM"
                className="w-1/3 p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5] text-center"
                required
              />
              <select
                name="ampm"
                value={formData.ampm}
                onChange={handleChange}
                className="w-1/3 p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 text-center"
                required
              >
                <option value="" disabled>Select</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Place */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Place</label>
            <input
              type="text"
              name="place"
              placeholder="Event venue or city"
              value={formData.place}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5]"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Full address (e.g., 123 Main St)"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5]"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-[#B0BEC5] mb-2">Price (in USD)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price (e.g., 50)"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="1"
              className="w-full p-4 rounded-md bg-[#121212] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#1976D2] text-[#FFFFFF] rounded-md hover:bg-[#1565C0] transition-all duration-300 shadow-md"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
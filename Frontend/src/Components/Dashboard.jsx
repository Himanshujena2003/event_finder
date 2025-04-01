// src/Components/Dashboard.jsx
import React, { useState } from 'react';
import EventCard from './EventCard';
import Category from './Category';

const Dashboard = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleCategorySelect = (category) => {
    setFilteredEvents(category ? events.filter((e) => e.category === category) : events);
  };

  const slideLeft = () => setSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
  const slideRight = () =>
    setSlideIndex((prev) => (prev < filteredEvents.length - 1 ? prev + 1 : prev));

  const currentEvent = filteredEvents[slideIndex];

  return (
    <div className="px-6 py-10 bg-[#121212]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#FFFFFF] mb-10">Explore Your Next Event</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Search events..."
            className="flex-1 p-4 rounded-md bg-[#1E1E1E] text-[#FFFFFF] border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-[#1976D2] transition-all duration-300 placeholder-[#B0BEC5]"
          />
          <Category onSelectCategory={handleCategorySelect} />
        </div>
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-[#FFFFFF] mb-6">Trending Events</h2>
          <div className="relative group">
            {currentEvent && (
              <div className="relative w-full h-[550px] rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121212] to-transparent p-8">
                  <h3 className="text-3xl font-bold text-[#FFFFFF]">{currentEvent.title}</h3>
                  <p className="text-[#B0BEC5] mt-2 text-lg">{currentEvent.date}</p>
                </div>
              </div>
            )}
            <button
              onClick={slideLeft}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#1976D2] text-[#FFFFFF] p-4 rounded-md hover:bg-[#1565C0] transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              ←
            </button>
            <button
              onClick={slideRight}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#1976D2] text-[#FFFFFF] p-4 rounded-md hover:bg-[#1565C0] transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              →
            </button>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-semibold text-[#FFFFFF] mb-6">All Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
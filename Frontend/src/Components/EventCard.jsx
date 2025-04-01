import React from "react";
import { MapPin } from "lucide-react";

const EventCard = ({ event }) => {
  const openMap = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="bg-[#343333] rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <img
        src={event.image || "https://via.placeholder.com/400x200"}
        alt={event.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-[#B0BEC5] text-sm font-medium mb-1">{event.date}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <p className="text-[#B0BEC5] text-sm">{event.location}</p>
          <button onClick={openMap} className="text-[#708df5] hover:text-white">
            <MapPin size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#eff0f2]">{event.price}</span>
          <button className="px-5 py-2 bg-[#708df5] text-black rounded-md">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

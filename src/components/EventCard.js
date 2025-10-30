import React, { useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { useNetworking } from '../contexts/NetworkingContext';

const EventCard = ({ event }) => {
  const { 
    title, 
    description, 
    date, 
    time, 
    location, 
    image, 
    category, 
    categoryColor 
  } = event;
  
  const { showSuccess } = useNotification();
  const { addPoints } = useNetworking();

  const handleRegisterClick = useCallback(() => {
    // Simulate registration process
    showSuccess(`🎉 Successfully registered for "${title}"!`, {
      title: 'Registration Confirmed',
      duration: 4000
    });
    
    // Add points for registering
    addPoints(15, `registering for ${title}`);
    
    console.log(`Registered for event: ${title}`);
  }, [title, showSuccess, addPoints]);

  return (
    <article className="event-card bg-custom-bg-2 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-custom-teal/20 border border-custom-border">
      <div className="relative">
        <img
          alt={`${title} event`}
          className="w-full h-48 object-cover"
          src={image}
          loading="lazy"
        />
        <span
          className={`absolute top-4 left-4 ${categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
          aria-label={`Event category: ${category}`}
        >
          {category}
        </span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>
        
        <p className="text-custom-text-secondary text-sm mb-4">
          {description}
        </p>
        
        <div className="text-custom-text-secondary text-sm space-y-2 mb-4">
          <div className="flex items-center">
            <span 
              className="material-icons align-middle text-base mr-2"
              aria-hidden="true"
            >
              event
            </span>
            <span>{date} • {time}</span>
          </div>
          
          <div className="flex items-center">
            <span 
              className="material-icons align-middle text-base mr-2"
              aria-hidden="true"
            >
              location_on
            </span>
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-end">
          <button 
            type="button"
            className="bg-custom-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2"
            onClick={handleRegisterClick}
            aria-label={`Register for ${title}`}
          >
            Register
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;

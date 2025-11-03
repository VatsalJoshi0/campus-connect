import React, { useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { useNetworking } from '../contexts/NetworkingContext';
import OptimizedImage from './OptimizedImage';

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
    <article 
      className="event-card card-hover bg-custom-bg-2 rounded-lg overflow-hidden border border-custom-border"
      aria-labelledby={`event-title-${event.id}`}
    >
      <div className="relative">
        <OptimizedImage
          src={image}
          alt={`${title} event promotional image showing event theme and atmosphere`}
          width={400}
          height={192}
          className="w-full h-48"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span
          className={`absolute top-4 left-4 ${categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
          role="status"
          aria-label={`Event category: ${category}`}
        >
          {category}
        </span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" id={`event-title-${event.id}`}>
          {title}
        </h3>
        
        <p className="text-custom-text-secondary text-sm mb-4" id={`event-desc-${event.id}`}>
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
            <span>
              <time dateTime={date}>{date}</time> • <time>{time}</time>
            </span>
          </div>
          
          <div className="flex items-center">
            <span 
              className="material-icons align-middle text-base mr-2"
              aria-hidden="true"
            >
              location_on
            </span>
            <address className="not-italic">{location}</address>
          </div>
        </div>
        
        <div className="flex items-center justify-end">
          <button 
            type="button"
            className="btn-primary text-white px-6 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 focus:ring-offset-custom-bg-2"
            onClick={handleRegisterClick}
            aria-label={`Register for ${title} event on ${date} at ${time}`}
            aria-describedby={`event-desc-${event.id}`}
          >
            Register
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const HERO_BACKGROUNDS = [
  {
    bg: 'linear-gradient(to right, var(--hero-gradient-start), var(--hero-gradient-end)), var(--hero-bg-1)',
    text: 'Spring Innovation Summit 2025'
  },
  {
    bg: 'linear-gradient(to right, var(--hero-gradient-start), var(--hero-gradient-end)), var(--hero-bg-2)',
    text: 'Tech Leaders Meetup 2025'
  },
  {
    bg: 'linear-gradient(to right, var(--hero-gradient-start), var(--hero-gradient-end)), var(--hero-bg-3)',
    text: 'Campus Creators Expo 2025'
  },
  {
    bg: 'linear-gradient(to right, var(--hero-gradient-start), var(--hero-gradient-end)), var(--hero-bg-1)',
    text: 'Future Innovators Forum'
  },
  {
    bg: 'linear-gradient(to right, var(--hero-gradient-start), var(--hero-gradient-end)), var(--hero-bg-2)',
    text: 'Student Networking Gala'
  }
];

const FADE_DURATION = 1000;
const CAROUSEL_INTERVAL = 5000;

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showSuccess, showInfo } = useNotification();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const currentHero = useMemo(() => 
    HERO_BACKGROUNDS[currentIndex], 
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % HERO_BACKGROUNDS.length);
  }, []);

  const handleRegisterClick = useCallback(() => {
    if (isAuthenticated) {
      showSuccess('🎉 You\'re already registered! Welcome to Campus Connect!', {
        duration: 3000
      });
    } else {
      showInfo('Redirecting to registration...', { duration: 2000 });
      setTimeout(() => {
        navigate('/register');
      }, 1000);
    }
  }, [isAuthenticated, navigate, showSuccess, showInfo]);

  const handleLearnMoreClick = useCallback(() => {
    showInfo('Exploring events...', { duration: 2000 });
    setTimeout(() => {
      navigate('/events');
    }, 1000);
  }, [navigate, showInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      const timeout = setTimeout(() => {
        nextSlide();
        setFade(false);
      }, FADE_DURATION);

      return () => clearTimeout(timeout);
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      className={`hero-section rounded-lg p-12 lg:p-20 text-custom-text flex flex-col items-start relative z-10 ${
        fade ? 'fade' : ''
      }`}
      style={{ backgroundImage: currentHero.bg }}
      aria-label="Featured Event"
    >
      <span className="text-custom-teal font-semibold mb-2">
        Featured Event
      </span>
      
      <h1 className="text-4xl lg:text-6xl font-bold mb-4">
        {currentHero.text}
      </h1>
      
      <p className="max-w-xl mb-8">
        Connect with industry leaders and fellow students at our annual
        innovation conference. Discover new opportunities and expand your
        network.
      </p>
      
      <div className="flex space-x-4">
        <button 
          type="button"
          className="hero-register-button"
          onClick={handleRegisterClick}
        >
          Register Now
        </button>
        
        <button 
          type="button"
          className="hero-learn-more-button"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

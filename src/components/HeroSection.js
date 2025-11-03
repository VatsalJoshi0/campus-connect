import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const HERO_BACKGROUNDS = [
  {
    bg: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop")',
    text: 'Spring Innovation Summit 2025',
    description: 'Join the biggest innovation summit of the year. Connect with industry leaders and showcase your ideas.'
  },
  {
    bg: 'url("https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop")',
    text: 'Tech Leaders Meetup 2025',
    description: 'Network with tech industry pioneers and learn about emerging technologies shaping our future.'
  },
  {
    bg: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop")',
    text: 'Campus Creators Expo 2025',
    description: 'Showcase your creativity at our annual expo. Meet fellow creators and industry professionals.'
  },
  {
    bg: 'url("https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop")',
    text: 'Future Innovators Forum',
    description: 'Be part of the next generation of innovators. Share ideas, build solutions, create impact.'
  },
  {
    bg: 'url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop")',
    text: 'Student Networking Gala',
    description: 'Connect with peers and professionals in a vibrant atmosphere. Build lasting relationships.'
  }
];

const SLIDE_DURATION = 5000; // Display each slide for 5 seconds
const TRANSITION_DURATION = 2000; // 2 second cross-fade transition

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showSuccess, showInfo } = useNotification();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [nextSlide, setNextSlide] = useState(null);
  const USE_ALT_LAYOUT = true;

  const goToSlide = useCallback((index) => {
    if (!transitioning && index !== currentSlide) {
      setNextSlide(index);
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setNextSlide(null);
        setTransitioning(false);
      }, TRANSITION_DURATION);
    }
  }, [transitioning, currentSlide]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentSlide + 1) % HERO_BACKGROUNDS.length;
    goToSlide(nextIndex);
  }, [currentSlide, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentSlide - 1 + HERO_BACKGROUNDS.length) % HERO_BACKGROUNDS.length;
    goToSlide(prevIndex);
  }, [currentSlide, goToSlide]);

  const handleTransition = useCallback(() => {
    handleNext();
  }, [handleNext]);

  const handleRegisterClick = useCallback(() => {
    if (isAuthenticated) {
      showSuccess('🎉 You\'re already registered! Welcome to Campus Connect!', {
        duration: 3000
      });
    } else {
      showInfo('Redirecting to registration...', { duration: 2000 });
      setTimeout(() => navigate('/register'), 1000);
    }
  }, [isAuthenticated, navigate, showSuccess, showInfo]);

  const handleLearnMoreClick = useCallback(() => {
    showInfo('Exploring events...', { duration: 2000 });
    setTimeout(() => navigate('/events'), 1000);
  }, [navigate, showInfo]);

  useEffect(() => {
    const interval = setInterval(handleTransition, SLIDE_DURATION + TRANSITION_DURATION);
    return () => clearInterval(interval);
  }, [handleTransition]);

  // using HERO_BACKGROUNDS[currentSlide] directly in render

  return (
    <section className="hero-section hero-carousel" aria-label="Featured Events">
      {/* Background layers: current + upcoming (when transitioning) */}
      <div
        className={`bg-layer carousel-bg ${transitioning && nextSlide !== null ? 'fade-out' : 'fade-in'}`}
        style={{ backgroundImage: `url(${HERO_BACKGROUNDS[currentSlide].bg.replace(/^url\("|"\)$/g, '')})` }}
        aria-hidden="true"
      />

      {nextSlide !== null && (
        <div
          className={`bg-layer carousel-bg ${transitioning ? 'fade-in' : 'fade-out'}`}
          style={{ backgroundImage: `url(${HERO_BACKGROUNDS[nextSlide].bg.replace(/^url\("|"\)$/g, '')})` }}
          aria-hidden="true"
        />
      )}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="carousel-arrow carousel-arrow-left"
        aria-label="Previous slide"
      >
        <span className="material-icons">chevron_left</span>
      </button>
      
      <button
        onClick={handleNext}
        className="carousel-arrow carousel-arrow-right"
        aria-label="Next slide"
      >
        <span className="material-icons">chevron_right</span>
      </button>

      {/* Overlay gradient (keeps text readable) */}
      {/* existing ::before handles gradient overlay */}

      {/* Content layers */}
  <div className={`content-layer ${transitioning ? 'fade-out' : 'fade-in'} ${USE_ALT_LAYOUT ? 'alt' : ''}`}>
        <span className="inline-block bg-custom-teal text-black font-semibold px-4 py-1.5 rounded-full mb-4 transform transition hover:scale-105 hover:shadow-lg backdrop-blur-sm">
          Featured Event
        </span>

        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
          {HERO_BACKGROUNDS[currentSlide].text}
        </h1>

        <p className="text-xl lg:text-2xl mb-8 max-w-2xl">
          {HERO_BACKGROUNDS[currentSlide].description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button onClick={handleRegisterClick} className="hero-button hero-primary-button">Register Now</button>
          <button onClick={handleLearnMoreClick} className="hero-button hero-secondary-button">
            <span className="flex items-center">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {nextSlide !== null && (
        <div className={`content-layer ${transitioning ? 'fade-in' : 'fade-out'} ${USE_ALT_LAYOUT ? 'alt' : ''}`}>
          <span className="inline-block bg-custom-teal text-black font-semibold px-4 py-1.5 rounded-full mb-4 transform transition hover:scale-105 hover:shadow-lg backdrop-blur-sm">
            Featured Event
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            {HERO_BACKGROUNDS[nextSlide].text}
          </h1>

          <p className="text-xl lg:text-2xl mb-8 max-w-2xl">
            {HERO_BACKGROUNDS[nextSlide].description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button onClick={handleRegisterClick} className="hero-button hero-primary-button">Register Now</button>
            <button onClick={handleLearnMoreClick} className="hero-button hero-secondary-button">
              <span className="flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default HeroSection;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';

const SearchSuggestions = ({ 
  isOpen, 
  onClose, 
  searchQuery,
  recentSearches = [],
  onRecentSearchClick,
  onClearRecentSearches
}) => {
  const navigate = useNavigate();
  const { showInfo } = useNotification();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRefs = useRef([]);

  // Mock data for suggestions
  const mockEvents = [
    { id: 1, title: 'AI Development Workshop', type: 'event', category: 'Workshop', date: '2024-10-15' },
    { id: 2, title: 'Tech Leaders Meetup', type: 'event', category: 'Networking', date: '2024-10-20' },
    { id: 3, title: 'Campus Creators Expo', type: 'event', category: 'Exhibition', date: '2024-10-25' },
    { id: 4, title: 'Startup Pitch Competition', type: 'event', category: 'Competition', date: '2024-11-01' },
    { id: 5, title: 'Web Development Bootcamp', type: 'event', category: 'Workshop', date: '2024-11-05' },
    { id: 6, title: 'Career Fair 2024', type: 'event', category: 'Career', date: '2024-11-10' }
  ];

  const mockPeople = [
    { id: 1, name: 'Dr. Sarah Chen', type: 'person', role: 'AI Research Professor', department: 'Computer Science' },
    { id: 2, name: 'Alex Johnson', type: 'person', role: 'Senior Developer', company: 'Google' },
    { id: 3, name: 'Maria Rodriguez', type: 'person', role: 'UX Designer', company: 'Microsoft' },
    { id: 4, name: 'David Kim', type: 'person', role: 'Data Scientist', company: 'Netflix' },
    { id: 5, name: 'Emily Zhang', type: 'person', role: 'Product Manager', company: 'Apple' },
    { id: 6, name: 'Michael Brown', type: 'person', role: 'Startup Founder', company: 'TechStart Inc.' }
  ];

  // Filter suggestions based on search query
  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeople = mockPeople.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (person.company && person.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (person.department && person.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allSuggestions = useMemo(() => [
    ...filteredEvents.slice(0, 4),
    ...filteredPeople.slice(0, 4)
  ], [filteredEvents, filteredPeople]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    if (suggestion.type === 'event') {
      showInfo(`Viewing event: ${suggestion.title}`, { duration: 2000 });
      navigate('/events');
    } else if (suggestion.type === 'person') {
      showInfo(`Viewing profile: ${suggestion.name}`, { duration: 2000 });
      navigate('/network');
    }
    onClose();
  }, [showInfo, navigate, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < allSuggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            handleSuggestionClick(allSuggestions[selectedIndex]);
          }
          break;
        case 'Escape':
          onClose();
          break;
        default:
          // No action needed for other keys
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allSuggestions, onClose, handleSuggestionClick]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);

  if (!isOpen) {
    return null;
  }

  // Show default suggestions when search is empty
  const showDefaultSuggestions = !searchQuery.trim();

  return (
    <div className="fixed inset-x-4 top-16 md:absolute md:inset-x-0 md:top-full md:mt-2 bg-custom-bg-2 border border-custom-border rounded-lg shadow-2xl z-50 max-h-[80vh] md:max-h-96 overflow-y-auto search-suggestions backdrop-blur-lg bg-opacity-95">
      {searchQuery.trim() && allSuggestions.length === 0 ? (
        <div className="p-6 text-center text-custom-text-secondary">
          <span className="material-icons text-3xl mb-3 block">search_off</span>
          <p className="font-medium">No results found for "{searchQuery}"</p>
          <p className="text-sm mt-2 text-custom-text-secondary">
            Try adjusting your search terms or explore suggested categories below
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => handleSuggestionClick({ type: 'event', category: 'Workshop' })}
              className="px-3 py-1.5 rounded-full bg-custom-bg text-custom-text-secondary text-sm hover:bg-custom-teal hover:text-black transition-all duration-200"
            >
              Workshops
            </button>
            <button 
              onClick={() => handleSuggestionClick({ type: 'event', category: 'Networking' })}
              className="px-3 py-1.5 rounded-full bg-custom-bg text-custom-text-secondary text-sm hover:bg-custom-teal hover:text-black transition-all duration-200"
            >
              Networking
            </button>
            <button 
              onClick={() => handleSuggestionClick({ type: 'person', role: 'Developer' })}
              className="px-3 py-1.5 rounded-full bg-custom-bg text-custom-text-secondary text-sm hover:bg-custom-teal hover:text-black transition-all duration-200"
            >
              Developers
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && showDefaultSuggestions && (
            <div className="p-2 border-b border-custom-border">
              <div className="px-3 py-2 flex items-center justify-between">
                <div className="text-xs font-semibold text-custom-text-secondary uppercase tracking-wider">
                  Recent Searches
                </div>
                <button
                  onClick={onClearRecentSearches}
                  className="text-xs text-custom-blue hover:text-custom-teal transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
              <div className="px-3 py-2 flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => onRecentSearchClick(search)}
                    className="px-3 py-1.5 rounded-full bg-custom-bg text-custom-text-secondary text-sm hover:bg-custom-teal hover:text-black transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span className="material-icons text-base">history</span>
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Header for default suggestions */}
          {showDefaultSuggestions && (
            <div className="p-3 border-b border-custom-border">
              <div className="text-sm font-medium text-custom-text flex items-center space-x-2">
                <span className="material-icons text-lg text-custom-teal">trending_up</span>
                <span>Trending Now</span>
              </div>
            </div>
          )}
          
          {/* Events Section */}
          {(showDefaultSuggestions ? mockEvents.slice(0, 3) : filteredEvents).length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-custom-text-secondary uppercase tracking-wider">
                Events
              </div>
              {(showDefaultSuggestions ? mockEvents.slice(0, 3) : filteredEvents.slice(0, 4)).map((event, index) => (
                <button
                  key={`event-${event.id}`}
                  ref={el => suggestionRefs.current[index] = el}
                  onClick={() => handleSuggestionClick(event)}
                  className={`suggestion-item w-full text-left px-3 py-3 rounded-lg flex items-center space-x-3 ${
                    selectedIndex === index
                      ? 'bg-custom-teal text-black selected'
                      : 'hover:bg-custom-bg text-custom-text'
                  }`}
                >
                  <span className="material-icons text-lg text-custom-blue">event</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-sm text-custom-text-secondary flex items-center space-x-2">
                      <span>{event.category}</span>
                      <span>•</span>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* People Section */}
          {(showDefaultSuggestions ? mockPeople.slice(0, 3) : filteredPeople).length > 0 && (
            <div className="p-2 border-t border-custom-border">
              <div className="px-3 py-2 text-xs font-semibold text-custom-text-secondary uppercase tracking-wider">
                People
              </div>
              {(showDefaultSuggestions ? mockPeople.slice(0, 3) : filteredPeople.slice(0, 4)).map((person, index) => {
                const globalIndex = (showDefaultSuggestions ? mockEvents.slice(0, 3) : filteredEvents.slice(0, 4)).length + index;
                return (
                  <button
                    key={`person-${person.id}`}
                    ref={el => suggestionRefs.current[globalIndex] = el}
                    onClick={() => handleSuggestionClick(person)}
                    className={`suggestion-item w-full text-left px-3 py-3 rounded-lg flex items-center space-x-3 ${
                      selectedIndex === globalIndex
                        ? 'bg-custom-teal text-black selected'
                        : 'hover:bg-custom-bg text-custom-text'
                    }`}
                  >
                    <span className="material-icons text-lg text-custom-orange">person</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{person.name}</div>
                      <div className="text-sm text-custom-text-secondary truncate">
                        {person.role} {person.company && `at ${person.company}`}
                        {person.department && `• ${person.department}`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          {searchQuery.trim() && (
            <div className="p-2 border-t border-custom-border">
              <div className="px-3 py-2 text-xs font-semibold text-custom-text-secondary uppercase tracking-wider">
                Quick Actions
              </div>
              <button
                onClick={() => {
                  navigate('/events');
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-custom-bg text-custom-text transition-colors duration-200 flex items-center space-x-3"
              >
                <span className="material-icons text-lg text-custom-blue">search</span>
                <span>Search all events for "{searchQuery}"</span>
              </button>
              <button
                onClick={() => {
                  navigate('/network');
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-custom-bg text-custom-text transition-colors duration-200 flex items-center space-x-3"
              >
                <span className="material-icons text-lg text-custom-orange">people</span>
                <span>Search all people for "{searchQuery}"</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchSuggestions;

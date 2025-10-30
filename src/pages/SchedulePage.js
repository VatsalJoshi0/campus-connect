import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Removed unused import
import { useNetworking } from '../contexts/NetworkingContext';

const SchedulePage = () => {
  // Removed unused user declaration
  const { addPoints } = useNetworking();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  // Removed unused state variables
  // Used by the "Add Event" button click handler

  // Mock schedule data
  const [scheduleEvents] = useState([
    {
      id: 1,
      title: 'AI Development Workshop',
      type: 'workshop',
      startTime: new Date(2025, 3, 28, 14, 0), // April 28, 2:00 PM
      endTime: new Date(2025, 3, 28, 17, 0),   // April 28, 5:00 PM
      location: 'Tech Hub, Building C',
      description: 'Learn practical AI development skills',
      attendees: 45,
      isRegistered: true,
      reminder: '30min',
      category: 'Workshop',
      color: 'event-orange'
    },
    {
      id: 2,
      title: 'Industry Networking Mixer',
      type: 'networking',
      startTime: new Date(2025, 3, 30, 18, 30), // April 30, 6:30 PM
      endTime: new Date(2025, 3, 30, 21, 0),    // April 30, 9:00 PM
      location: 'University Center, Grand Hall',
      description: 'Connect with industry professionals',
      attendees: 120,
      isRegistered: true,
      reminder: '1hour',
      category: 'Networking',
  color: 'event-blue'
    },
    {
      id: 3,
      title: 'Spring Career Expo',
      type: 'career',
      startTime: new Date(2025, 4, 5, 10, 0),  // May 5, 10:00 AM
      endTime: new Date(2025, 4, 5, 16, 0),    // May 5, 4:00 PM
      location: 'Campus Recreation Center',
      description: 'Meet with 50+ employers',
      attendees: 200,
      isRegistered: false,
      reminder: 'none',
      category: 'Career Fair',
  color: 'event-yellow'
    },
    {
      id: 4,
      title: 'Team Meeting - Innovation Challenge',
      type: 'meeting',
      startTime: new Date(2025, 3, 29, 15, 0), // April 29, 3:00 PM
      endTime: new Date(2025, 3, 29, 16, 0),   // April 29, 4:00 PM
      location: 'Innovation Lab, Room 301',
      description: 'Discuss project progress and next steps',
      attendees: 5,
      isRegistered: true,
      reminder: '15min',
      category: 'Meeting',
  color: 'event-purple'
    },
    {
      id: 5,
      title: 'Study Session - Data Structures',
      type: 'study',
      startTime: new Date(2025, 3, 27, 19, 0), // April 27, 7:00 PM
      endTime: new Date(2025, 3, 27, 21, 0),   // April 27, 9:00 PM
      location: 'Library, Study Room 5',
      description: 'Group study for upcoming exam',
      attendees: 8,
      isRegistered: true,
      reminder: '30min',
      category: 'Study Group',
  color: 'event-green'
    }
  ]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getEventsForDate = (date) => {
    return scheduleEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    }).sort((a, b) => a.startTime - b.startTime);
  };

  const getEventsForWeek = (date) => {
    const weekDates = getWeekDates(date);
    const weekEvents = {};
    
    weekDates.forEach(day => {
      weekEvents[day.toDateString()] = getEventsForDate(day);
    });
    
    return weekEvents;
  };

  const handleRegisterEvent = (eventId) => {
    // Mock registration
    addPoints(10, 'registering for an event');
    console.log(`Registered for event ${eventId}`);
  };

  const EventCard = ({ event, compact = false }) => (
    <div className={`p-3 rounded-r-lg mb-2 cursor-pointer transition-colors border-l-4 ${
      event.color === 'event-orange' ? 'border-custom-orange bg-[rgba(249,115,22,0.06)]' : '' } ${
      event.color === 'event-blue' ? 'border-custom-blue bg-[rgba(59,130,246,0.06)]' : '' } ${
      event.color === 'event-yellow' ? 'border-custom-orange bg-[rgba(245,158,11,0.06)]' : '' } ${
      event.color === 'event-purple' ? 'border-custom-teal bg-[rgba(99,102,241,0.06)]' : '' } ${
      event.color === 'event-green' ? 'border-green-500 bg-[rgba(16,185,129,0.06)]' : '' }
    `}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-semibold text-custom-text ${compact ? 'text-sm' : 'text-base'}`}>
            {event.title}
          </h4>
          <p className={`text-custom-text-secondary ${compact ? 'text-xs' : 'text-sm'}`}>
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
          </p>
          {!compact && (
            <>
              <p className="text-custom-text-secondary text-sm mt-1">{event.location}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center space-x-1 text-xs text-custom-text-secondary">
                  <span className="material-icons text-sm">people</span>
                  <span>{event.attendees}</span>
                </span>
                {event.reminder !== 'none' && (
                  <span className="flex items-center space-x-1 text-xs text-custom-text-secondary">
                    <span className="material-icons text-sm">notifications</span>
                    <span>{event.reminder}</span>
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2 ml-2">
          {event.isRegistered ? (
            <span className="material-icons text-custom-teal text-sm">check_circle</span>
          ) : (
            <button
              onClick={() => handleRegisterEvent(event.id)}
              className="bg-custom-blue text-white px-2 py-1 rounded text-xs hover:opacity-90 transition duration-300"
            >
              Join
            </button>
          )}
          <button className="text-custom-text-secondary hover:text-custom-text">
            <span className="material-icons text-sm">more_vert</span>
          </button>
        </div>
      </div>
    </div>
  );

  const WeekView = () => {
    const weekDates = getWeekDates(selectedDate);
    const weekEvents = getEventsForWeek(selectedDate);

    return (
      <div className="grid grid-cols-7 gap-1 bg-custom-bg-2 rounded-lg border border-custom-border overflow-hidden">
        {/* Week Header */}
        {weekDates.map((date, index) => (
          <div key={index} className="p-4 border-b border-custom-border text-center">
            <div className="text-sm text-custom-text-secondary">
              {date.toLocaleDateString([], { weekday: 'short' })}
            </div>
            <div className={`text-lg font-semibold ${
              date.toDateString() === new Date().toDateString() 
                ? 'text-custom-teal' 
                : 'text-custom-text'
            }`}>
              {date.getDate()}
            </div>
          </div>
        ))}
        
        {/* Week Events */}
        {weekDates.map((date, index) => (
          <div key={index} className="p-2 min-h-[200px] border-r border-custom-border last:border-r-0">
            {weekEvents[date.toDateString()]?.map(event => (
              <EventCard key={event.id} event={event} compact={true} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const DayView = () => {
    const dayEvents = getEventsForDate(selectedDate);

    return (
      <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-6">
        <h2 className="text-xl font-semibold text-custom-text mb-4">
          {formatDate(selectedDate)}
        </h2>
        
        {dayEvents.length > 0 ? (
          <div className="space-y-4">
            {dayEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
              event_available
            </span>
            <h3 className="text-lg font-semibold text-custom-text mb-2">No events scheduled</h3>
            <p className="text-custom-text-secondary">
              Your day is free! Consider joining an event or scheduling study time.
            </p>
          </div>
        )}
      </div>
    );
  };

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return scheduleEvents
      .filter(event => event.startTime > now)
      .sort((a, b) => a.startTime - b.startTime)
      .slice(0, 3);
  }, [scheduleEvents]);

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-custom-text mb-2">My Schedule</h1>
          <p className="text-custom-text-secondary">
            Manage your events, meetings, and study sessions
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
            <div className="text-2xl font-bold text-custom-teal mb-2">
              {scheduleEvents.filter(e => e.isRegistered).length}
            </div>
            <div className="text-custom-text-secondary text-sm">Registered Events</div>
          </div>
          
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
            <div className="text-2xl font-bold text-custom-blue mb-2">
              {upcomingEvents.length}
            </div>
            <div className="text-custom-text-secondary text-sm">Upcoming This Week</div>
          </div>
          
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">
              {scheduleEvents.filter(e => e.type === 'study').length}
            </div>
            <div className="text-custom-text-secondary text-sm">Study Sessions</div>
          </div>
          
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
            <div className="text-2xl font-bold text-purple-500 mb-2">
              {scheduleEvents.filter(e => e.type === 'meeting').length}
            </div>
            <div className="text-custom-text-secondary text-sm">Meetings</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - (viewMode === 'day' ? 1 : 7))))}
                  className="text-custom-text-secondary hover:text-custom-text"
                >
                  <span className="material-icons">chevron_left</span>
                </button>
                
                <h2 className="text-xl font-semibold text-custom-text">
                  {viewMode === 'day' 
                    ? formatDate(selectedDate)
                    : `Week of ${selectedDate.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`
                  }
                </h2>
                
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + (viewMode === 'day' ? 1 : 7))))}
                  className="text-custom-text-secondary hover:text-custom-text"
                >
                  <span className="material-icons">chevron_right</span>
                </button>
                
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="bg-custom-bg border border-custom-border text-custom-text px-3 py-1 rounded-lg hover:bg-custom-bg-2 transition duration-300 text-sm"
                >
                  Today
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex bg-custom-bg-2 rounded-lg border border-custom-border">
                  <button
                    onClick={() => setViewMode('day')}
                    className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                      viewMode === 'day' ? 'bg-custom-teal text-black' : 'text-custom-text-secondary hover:text-custom-text'
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                      viewMode === 'week' ? 'bg-custom-teal text-black' : 'text-custom-text-secondary hover:text-custom-text'
                    }`}
                  >
                    Week
                  </button>
                </div>
                
                <button
                  onClick={() => {/* TODO: Implement add event functionality */}}
                  className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
                >
                  <span className="material-icons text-sm">add</span>
                  <span>Add Event</span>
                </button>
              </div>
            </div>

            {/* Calendar View */}
            {viewMode === 'day' ? <DayView /> : <WeekView />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border">
              <h3 className="text-lg font-semibold text-custom-text mb-4">Next Up</h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className="bg-custom-bg text-center rounded-lg p-2 min-w-[50px]">
                      <div className="text-xs text-custom-text-secondary">
                        {event.startTime.toLocaleDateString([], { month: 'short' })}
                      </div>
                      <div className="text-lg font-bold text-custom-text">
                        {event.startTime.getDate()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-custom-text text-sm">{event.title}</h4>
                      <p className="text-xs text-custom-text-secondary">
                        {formatTime(event.startTime)}
                      </p>
                      <p className="text-xs text-custom-text-secondary">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border">
              <h3 className="text-lg font-semibold text-custom-text mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-custom-bg rounded-lg hover:bg-custom-bg-2 transition duration-300 flex items-center space-x-3">
                  <span className="material-icons text-custom-teal">event</span>
                  <span className="text-custom-text">Browse Events</span>
                </button>
                <button className="w-full text-left p-3 bg-custom-bg rounded-lg hover:bg-custom-bg-2 transition duration-300 flex items-center space-x-3">
                  <span className="material-icons text-custom-teal">group_add</span>
                  <span className="text-custom-text">Schedule Study Group</span>
                </button>
                <button className="w-full text-left p-3 bg-custom-bg rounded-lg hover:bg-custom-bg-2 transition duration-300 flex items-center space-x-3">
                  <span className="material-icons text-custom-teal">calendar_today</span>
                  <span className="text-custom-text">Sync External Calendar</span>
                </button>
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border">
              <h3 className="text-lg font-semibold text-custom-text mb-4">Event Types</h3>
              <div className="space-y-2">
                {[
                  { color: 'bg-orange-500', label: 'Workshops' },
                  { color: 'bg-blue-500', label: 'Networking' },
                  { color: 'bg-yellow-500', label: 'Career Events' },
                  { color: 'bg-purple-500', label: 'Meetings' },
                  { color: 'bg-green-500', label: 'Study Sessions' }
                ].map((type, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${type.color} rounded`}></div>
                    <span className="text-sm text-custom-text">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SchedulePage;

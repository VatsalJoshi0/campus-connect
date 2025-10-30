import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const events = useMemo(() => ([
    {
      id: 1,
      title: "Tech Hackathon 2023",
      date: "2023-12-15",
      time: "09:00 AM",
      location: "Main Campus Hall",
      category: "Technology",
      attendees: 120,
    },
    {
      id: 2,
      title: 'Industry Networking Mixer',
      description: 'Connect with industry professionals and fellow students in a relaxed atmosphere.',
      date: 'April 30, 2025',
      time: '6:30 PM - 9:00 PM',
      location: 'University Center, Grand Hall',
      category: 'Networking',
      categoryColor: 'bg-custom-blue',
      attendees: 120,
      maxAttendees: 150,
      tags: ['Networking', 'Career', 'Professional'],
      organizer: 'Career Services'
    },
    {
      id: 3,
      title: 'Spring Career Expo',
      description: 'Meet with over 50 employers offering internships and full-time positions.',
      date: 'May 5, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Campus Recreation Center',
      category: 'Career Fair',
      categoryColor: 'bg-yellow-600',
      attendees: 200,
      maxAttendees: 300,
      tags: ['Career', 'Jobs', 'Internships'],
      organizer: 'Career Center'
    },
    {
      id: 4,
      title: '48-Hour Innovation Challenge',
      description: 'Form teams and build innovative solutions to real-world problems.',
      date: 'May 12-14, 2025',
      time: 'Starts at 5:00 PM',
      location: 'Innovation Center, Main Campus',
      category: 'Hackathon',
      categoryColor: 'bg-green-600',
      attendees: 80,
      maxAttendees: 100,
      tags: ['Hackathon', 'Innovation', 'Team Building'],
      organizer: 'Innovation Lab'
    },
    {
      id: 5,
      title: 'Web Development Bootcamp',
      description: 'Intensive 3-day bootcamp covering modern web development technologies.',
      date: 'May 20-22, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Computer Lab, Building A',
      category: 'Workshop',
      categoryColor: 'bg-custom-orange',
      attendees: 25,
      maxAttendees: 30,
      tags: ['Web Development', 'JavaScript', 'React'],
      organizer: 'CS Department'
    },
    {
      id: 6,
      title: 'Startup Pitch Competition',
      description: 'Present your startup ideas to industry experts and win funding opportunities.',
      date: 'June 1, 2025',
      time: '2:00 PM - 6:00 PM',
      location: 'Auditorium, Main Building',
      category: 'Competition',
      categoryColor: 'bg-purple-600',
      attendees: 60,
      maxAttendees: 80,
      tags: ['Startup', 'Entrepreneurship', 'Pitch'],
      organizer: 'Entrepreneurship Club'
    }
  ]), []);

  const filters = ['All Events', 'Workshops', 'Networking', 'Career Fairs', 'Hackathons', 'Competitions'];

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (activeFilter !== 'All Events') {
      const categoryMap = {
        'Workshops': 'Workshop',
        'Networking': 'Networking',
        'Career Fairs': 'Career Fair',
        'Hackathons': 'Hackathon',
        'Competitions': 'Competition'
      };
      filtered = filtered.filter(event => event.category === categoryMap[activeFilter]);
    }

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'popularity':
          return b.attendees - a.attendees;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, activeFilter, searchQuery, sortBy]);

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-custom-text mb-2">Campus Events</h1>
          <p className="text-custom-text-secondary">
            Discover and join exciting events happening on campus
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-custom-text-secondary">
              search
            </span>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-custom-bg-2 border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-custom-teal text-black'
                      : 'bg-custom-bg-2 text-custom-text-secondary hover:text-custom-text border border-custom-border'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-custom-text-secondary text-sm">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-custom-bg-2 border border-custom-border rounded-lg px-3 py-2 text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
              >
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="relative">
              <EventCard event={event} />
              
              <div className="absolute top-4 right-4 bg-custom-bg-3 text-custom-text-secondary text-xs px-2 py-1 rounded-full border border-custom-border">
                {event.attendees}/{event.maxAttendees}
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
              event_busy
            </span>
            <h3 className="text-xl font-semibold text-custom-text mb-2">No events found</h3>
            <p className="text-custom-text-secondary">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
            <div className="text-3xl font-bold text-custom-teal mb-2">{events.length}</div>
            <div className="text-custom-text-secondary">Total Events</div>
          </div>
          
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
            <div className="text-3xl font-bold text-custom-teal mb-2">
              {events.reduce((sum, event) => sum + event.attendees, 0)}
            </div>
            <div className="text-custom-text-secondary">Total Attendees</div>
          </div>
          
          <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
            <div className="text-3xl font-bold text-custom-teal mb-2">
              {new Set(events.map(event => event.organizer)).size}
            </div>
            <div className="text-custom-text-secondary">Organizers</div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
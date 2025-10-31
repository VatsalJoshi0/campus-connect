import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import OptimizedImage from '../components/OptimizedImage';

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('All Events');

  const events = [
    {
      id: 1,
      title: 'AI Development Workshop',
      description: 'Learn practical AI development skills with hands-on projects and expert guidance.',
      date: 'April 28, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Tech Hub, Building C',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBg6zQMQanqgVj2NyH3rT1kVx7qUCdehCj-vYrmU9o9KKirKfWWo__aSmMoltPkMYgCwjdVi9oSEo4EWcGly3L4AlIblnNEQWada_zYj49hCExk9GT5H4yk12N4tKQVby2KF82Ar3Qi-TXWAs0HqmJvOn65dvGabKrIYmZ9gzn66a6OIW_PKx1Q3ZxK8NDRVUbDINSw0c_bthLtfqv9nZEkhaq5FWsARe-5EFtUq74Y6dpxS7A4M7Nw973F7CuJTVkiXgJT4-K5iLw',
      category: 'Workshop',
      categoryColor: 'bg-custom-orange'
    },
    {
      id: 2,
      title: 'Industry Networking Mixer',
      description: 'Connect with industry professionals and fellow students in a relaxed atmosphere.',
      date: 'April 30, 2025',
      time: '6:30 PM - 9:00 PM',
      location: 'University Center, Grand Hall',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_ZXOzbX4Gw3x4l6VVEoCLn1LhIh9TbBd_ImFql7DqqJK7jQk7Qo_Mm5uKQgwj29LHc-3NAgCPaukLFPcPKVNaTwNrzD8i0DCaZWw5oQS6_P2eBObHWbYeqwo_uewEsJ0TOHcxVL4mc_5loEWYD0XUqheAOrGzoPZ1rTj0TOrYL5vuwULGABzXR4VdZpyybFJ_EO2Z8-NkdLltDEFKZiSRfAa9uRVOyObfCvKIl-RnUmXtSOWPNbMsDf_oGWsUXNa6MGzjBQIIi7s',
      category: 'Networking',
      categoryColor: 'bg-custom-blue'
    },
    {
      id: 3,
      title: 'Spring Career Expo',
      description: 'Meet with over 50 employers offering internships and full-time positions.',
      date: 'May 5, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Campus Recreation Center',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd7CqyOH3Df0yGRJwIJc6FJd2SQBbMqt-vCmi8Ciq-UnhlMb7XA37WpFXo1jzSj0fh8OqisFLpZa_6qIpZl-LvwHaQBTJim6cNx17tz2ZExojYMM2bVrx55CiMtEC4sOmz_GAIJyEYGdczyGUEadH5kj7k2ZSvt8udfe0mBDdSc3MFzz8Ose4CR7QClsjbJDE3jsZUL8ap_18nftuxolZphEcvG0pghIR79HlD24Dow25vj3gsZ14bDmntsiqgrCCEbzIwZBU65vrc',
      category: 'Career Fair',
      categoryColor: 'bg-yellow-600'
    },
    {
      id: 4,
      title: '48-Hour Innovation Challenge',
      description: 'Form teams and build innovative solutions to real-world problems.',
      date: 'May 12-14, 2025',
      time: 'Starts at 5:00 PM',
      location: 'Innovation Center, Main Campus',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgVmxYgfcoZks8e1dy4ql-8u_7J3Hv-tMXMURKAm6a2e4S-E1cUWNtzBPML8OpLwjwKNllEESLOXIS1Gv-kEdC51cHNqQOjOuMFsim7nQ52c5b9StFFcn1Kjh5WCiu75r1tK_LokxQAhORTvCPmeb6K5G9PJde7TBhzB6XJtvBfCK0YN0a9cpgG5pJ__0UnMy-QJpy5B-anr2m2nqjiSbCYZFIeOxs1yd9kY5wX5WgNm6n4SUKC6LUm7B7lh03MXI0Y9stbPIyCiUF',
      category: 'Hackathon',
      categoryColor: 'bg-green-600'
    }
  ];

  const filters = ['All Events', 'Workshops', 'Networking', 'Career Fairs', 'Hackathons', 'Seminars'];

  const activeUsers = [
    { id: 1, name: 'Yagnik Patel', initials: 'YP', lastSeen: '1 min ago' },
    { id: 2, name: 'Darpan Agrawal', initials: 'JB', lastSeen: '3 min ago' },
    { id: 3, name: 'Darsh Ayde', initials: 'DA', lastSeen: '4 min ago' },
    { id: 4, name: 'Meet Shah', initials: 'MS', lastSeen: '5 min ago' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'AI Development Workshop', date: 'APR', day: '28', time: '2:00 PM - 5:00 PM', location: 'Main Building, Internet Lab' },
    { id: 2, title: 'Industry Networking Mixer', date: 'APR', day: '30', time: '6:30 PM - 9:00 PM', location: 'Grand Hall' },
    { id: 3, title: 'Spring Career Expo', date: 'MAY', day: '05', time: '10:00 AM - 4:00 PM', location: 'Auditorium 1' }
  ];

  const recommendations = [
    { id: 1, name: 'Mansi Sharma', initials: 'MS', field: 'Computer Science & Eng, 2nd Year', skills: ['Web Dev', 'Designer'], connections: '1 mutual connection' },
    { id: 2, name: 'Ayush Singh', initials: 'AS', field: 'Computer Science & Eng, 2nd Year', skills: ['Management', 'Cyber Security'], connections: '2 mutual connections' },
    { id: 3, name: 'Mahek Sachdev', initials: 'MS', field: 'Computer Engineering, 2nd Year', skills: ['Web Dev', 'Frontend Developer'], connections: '1 mutual connection' }
  ];

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen transition-theme">
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <HeroSection />
        
        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center bg-custom-bg-2 px-4 py-2 rounded-lg text-custom-text border border-custom-border">
                  <span className="material-icons mr-2">filter_list</span> Filter
                </button>
                <button className="flex items-center bg-custom-bg-2 px-4 py-2 rounded-lg text-custom-text border border-custom-border">
                  <span className="material-icons mr-2">sort</span> Sort By
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeFilter === filter
                      ? 'bg-custom-blue text-white'
                      : 'bg-custom-bg-2 text-custom-text-secondary hover:bg-custom-bg-3 border border-custom-border'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          
          <aside className="w-full lg:w-1/3 space-y-8">
            {/* Profile Card */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border profile-card">
              <div className="relative mb-4">
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDkQr6zs80BeF8NMXEHhBCYayaNjv8FmqbAp_rlLJdgZ9kb_r1x_2pYYM-E79zu2doSHNuTZfdWUvC87jWmV6gMMfOtvXl4IQRQqm_VPhFwpEp1LUtEU3fgOC5omFKvXAl_2RTrSmO4SKXnP7yokbL5bOU14xekUUhD8XPoHMtDOkLWf7SM1Qs_sgil-uhnDQvmwYhz4qi8ZTRTfaTzGzuV_nqlnk1DLkSXIsrrLgpld0Xn9qJZXxZ526Cjyt5Hao5wf2taKIL9axC"
                  alt="Vatsal Joshi profile background - Campus Connect"
                  width={400}
                  height={96}
                  className="h-24 w-full rounded-t-lg"
                  loading="eager"
                  priority={true}
                />
                <div className="profile-avatar bg-custom-teal text-button" role="img" aria-label="User avatar with initials VJ">VJ</div>
                <button 
                  className="absolute top-2 right-2 text-sm text-custom-text bg-black bg-opacity-50 px-2 py-1 rounded hover:bg-opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
                  aria-label="Edit your profile"
                  type="button"
                >
                  Edit Profile
                </button>
              </div>
              <div className="text-center pt-10">
                <h3 className="text-xl font-bold" id="user-profile-name">Vatsal Joshi</h3>
                <p className="text-custom-text-secondary" aria-label="Student information">Computer Engineering, 2nd Year</p>
                <p className="text-custom-text-secondary text-sm">Drs. Kiran & Pallavi Patel Global University</p>
              </div>
              <div className="flex justify-around my-6 text-center" role="group" aria-label="Profile statistics">
                <div>
                  <p className="text-2xl font-bold" aria-label="42 connections">42</p>
                  <p className="text-custom-text-secondary text-sm" aria-hidden="true">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" aria-label="12 following">12</p>
                  <p className="text-custom-text-secondary text-sm" aria-hidden="true">Following</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" aria-label="Profile 87 percent complete">87%</p>
                  <p className="text-custom-text-secondary text-sm" aria-hidden="true">Profile</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs mb-6">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Web Dev</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Web Development</span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">UI/UX Design</span>
              </div>
              <button 
                className="w-full bg-custom-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2"
                type="button"
                aria-label="Complete your profile to unlock all features"
              >
                Complete Your Profile
              </button>
            </div>

            {/* Active Now Card */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border active-now-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Active Now</h3>
                <button className="text-sm text-custom-teal hover:underline" type="button">View All</button>
              </div>
              <div className="space-y-4">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="active-now-avatar" role="img" aria-label={`${user.name} avatar`}>
                          <span className="text-white font-bold" aria-hidden="true">{user.initials}</span>
                        </div>
                        <span className="active-status" aria-label="Online now"></span>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-custom-text-secondary" aria-label={`Last seen ${user.lastSeen}`}>{user.lastSeen}</p>
                      </div>
                    </div>
                    <button 
                      className="text-custom-text-secondary hover:text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2 rounded p-1"
                      type="button"
                      aria-label={`Send message to ${user.name}`}
                    >
                      <span className="material-icons" aria-hidden="true">chat_bubble_outline</span>
                    </button>
                  </div>
                ))})
              </div>
            </div>

            {/* Upcoming Events Card */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border upcoming-events-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Your Upcoming Events</h3>
                <button className="text-sm text-custom-teal hover:underline" type="button">View Calendar</button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="bg-custom-bg text-center rounded-lg p-2 mr-4">
                      <p className="text-xs text-custom-text-secondary">{event.date}</p>
                      <p className="text-xl font-bold">{event.day}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-custom-text-secondary">{event.time}</p>
                      <p className="text-xs text-custom-text-secondary">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* People You May Know */}
        <div className="mt-12 bg-custom-bg-2 p-6 rounded-lg border border-custom-border people-you-may-know">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">People You May Know</h2>
            <button className="text-sm text-custom-teal hover:underline" type="button">See All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((person) => (
              <div key={person.id} className="bg-custom-bg p-4 rounded-lg text-center border border-custom-border">
                <div className="recommendation-avatar">{person.initials}</div>
                <h4 className="font-semibold">{person.name}</h4>
                <p className="text-sm text-custom-text-secondary">{person.field}</p>
                <div className="flex justify-center gap-2 text-xs my-2">
                  {person.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full ${
                        index === 0 ? 'bg-blue-100 text-blue-800' : 
                        index === 1 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-3">{person.connections}</p>
                <button 
                  className="w-full bg-custom-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2"
                  type="button"
                  aria-label={`Connect with ${person.name}`}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

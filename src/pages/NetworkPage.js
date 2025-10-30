import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QRCodeScanner from '../components/QRCodeScanner';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';

const NetworkPage = () => {
  const { user } = useAuth();
  const { connections, suggestedMatches, connectWithUser } = useNetworking();
  const [activeTab, setActiveTab] = useState('matches');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMatches = suggestedMatches.filter(match =>
    match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (person) => {
    connectWithUser(person);
  };

  const MatchCard = ({ person, isConnection = false }) => (
    <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold text-xl">
          {person.initials}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-custom-text">{person.name}</h3>
              <p className="text-custom-text-secondary text-sm">{person.field}</p>
              {person.connections && (
                <p className="text-custom-text-secondary text-xs mt-1">{person.connections}</p>
              )}
            </div>
            
            {/* Match Score */}
            {person.matchScore && (
              <div className="bg-custom-teal text-black px-2 py-1 rounded-full text-xs font-semibold">
                {person.matchScore}% Match
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {person.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-custom-bg-3 text-custom-text border border-custom-border"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 mt-4">
            {isConnection ? (
              <>
                <button className="flex items-center space-x-2 bg-custom-teal text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition duration-300">
                  <span className="material-icons text-sm">chat</span>
                  <span>Message</span>
                </button>
                <button className="flex items-center space-x-2 bg-custom-bg border border-custom-border text-custom-text px-4 py-2 rounded-lg hover:bg-custom-bg-2 transition duration-300">
                  <span className="material-icons text-sm">person</span>
                  <span>View Profile</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleConnect(person)}
                  className="flex items-center space-x-2 bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  <span className="material-icons text-sm">person_add</span>
                  <span>Connect</span>
                </button>
                <button className="flex items-center space-x-2 bg-custom-bg border border-custom-border text-custom-text px-4 py-2 rounded-lg hover:bg-custom-bg-2 transition duration-300">
                  <span className="material-icons text-sm">visibility</span>
                  <span>View</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
  <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-custom-text mb-2">Network & Connect</h1>
          <p className="text-custom-text-secondary">
            Discover like-minded peers and build meaningful connections
          </p>
        </div>

        {/* AI Matching Stats */}
  <div className="mb-8 bg-gradient-to-r from-custom-blue to-custom-teal p-6 rounded-lg text-black dark:text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">AI-Powered Matching</h2>
              <p className="opacity-90">
                Our smart algorithm analyzes your interests, skills, and goals to find the best connections
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{suggestedMatches.length}</div>
              <div className="text-sm opacity-90">New Matches</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-custom-text-secondary">
              search
            </span>
            <input
              type="text"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-custom-bg-2 border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-custom-bg-2 p-1 rounded-lg border border-custom-border">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'matches'
                  ? 'bg-custom-teal text-black'
                  : 'text-custom-text-secondary hover:text-custom-text'
              }`}
              onClick={() => setActiveTab('matches')}
            >
              <span className="material-icons text-sm mr-2">psychology</span>
              Smart Matches ({suggestedMatches.length})
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'connections'
                  ? 'bg-custom-teal text-black'
                  : 'text-custom-text-secondary hover:text-custom-text'
              }`}
              onClick={() => setActiveTab('connections')}
            >
              <span className="material-icons text-sm mr-2">people</span>
              My Connections ({connections.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'matches' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-custom-text">Recommended for You</h2>
              <button className="flex items-center space-x-2 text-custom-teal hover:text-custom-text">
                <span className="material-icons text-sm">refresh</span>
                <span>Refresh Matches</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMatches.map((person) => (
                <MatchCard key={person.id} person={person} />
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
                  psychology
                </span>
                <h3 className="text-xl font-semibold text-custom-text mb-2">No matches found</h3>
                <p className="text-custom-text-secondary">
                  Try updating your profile interests or check back later
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'connections' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-custom-text">Your Network</h2>
              <div className="flex items-center space-x-4">
                <span className="text-custom-text-secondary text-sm">
                  {connections.length} connections
                </span>
                <button 
                  onClick={() => setShowQRScanner(true)}
                  className="flex items-center space-x-2 bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  <span className="material-icons text-sm">qr_code_scanner</span>
                  <span>QR Connect</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredConnections.map((person) => (
                <MatchCard key={person.id} person={person} isConnection={true} />
              ))}
            </div>

            {filteredConnections.length === 0 && (
              <div className="text-center py-12">
                <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
                  people_outline
                </span>
                <h3 className="text-xl font-semibold text-custom-text mb-2">No connections yet</h3>
                <p className="text-custom-text-secondary">
                  Start connecting with people from the matches tab
                </p>
              </div>
            )}
          </div>
        )}

        {/* Networking Tips */}
        <div className="mt-12 bg-custom-bg-2 p-6 rounded-lg border border-custom-border">
          <h3 className="text-lg font-semibold text-custom-text mb-4">Networking Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <span className="material-icons text-custom-teal">lightbulb</span>
              <div>
                <h4 className="font-medium text-custom-text">Complete Your Profile</h4>
                <p className="text-sm text-custom-text-secondary">Add skills and interests for better matches</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-custom-teal">chat</span>
              <div>
                <h4 className="font-medium text-custom-text">Start Conversations</h4>
                <p className="text-sm text-custom-text-secondary">Send personalized messages to connections</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-custom-teal">event</span>
              <div>
                <h4 className="font-medium text-custom-text">Attend Events</h4>
                <p className="text-sm text-custom-text-secondary">Meet people at campus events and workshops</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRCodeScanner onClose={() => setShowQRScanner(false)} />
      )}
      
      <Footer />
    </div>
  );
};

export default NetworkPage;

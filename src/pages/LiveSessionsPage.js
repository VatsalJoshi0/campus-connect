import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';
import { useNotification } from '../contexts/NotificationContext';

const LiveSessionsPage = () => {
  const { user } = useAuth();
  const { addPoints } = useNetworking();
  const { showSuccess, showInfo } = useNotification();
  const [activeSessions, setActiveSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [sessionMessages, setSessionMessages] = useState({});
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoQuality, setVideoQuality] = useState('HD');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoPlayerRef, setVideoPlayerRef] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Mock live sessions data
  useEffect(() => {
    const mockSessions = [
      {
        id: 'ai-workshop-live',
        title: 'AI Development Workshop - Live Session',
        presenter: 'Dr. Sarah Chen',
        description: 'Interactive session on machine learning fundamentals with live coding examples',
        startTime: new Date(Date.now() - 1800000), // Started 30 min ago
        duration: 120, // 2 hours
        participants: 45,
        maxParticipants: 50,
        status: 'live',
        category: 'Workshop',
        tags: ['AI', 'Machine Learning', 'Python'],
        streamUrl: 'https://example.com/stream/ai-workshop',
        chatEnabled: true,
        pollsEnabled: true,
        qnaEnabled: true
      },
      {
        id: 'career-panel',
        title: 'Industry Career Panel Discussion',
        presenter: 'Tech Industry Professionals',
        description: 'Panel discussion with professionals from Google, Microsoft, and Amazon',
        startTime: new Date(Date.now() + 900000), // Starts in 15 min
        duration: 90,
        participants: 120,
        maxParticipants: 200,
        status: 'upcoming',
        category: 'Panel',
        tags: ['Career', 'Industry', 'Q&A'],
        streamUrl: 'https://example.com/stream/career-panel',
        chatEnabled: true,
        pollsEnabled: false,
        qnaEnabled: true
      },
      {
        id: 'startup-pitch',
        title: 'Startup Pitch Competition - Finals',
        presenter: 'Entrepreneurship Club',
        description: 'Watch the final presentations of our startup competition',
        startTime: new Date(Date.now() + 3600000), // Starts in 1 hour
        duration: 180,
        participants: 80,
        maxParticipants: 150,
        status: 'upcoming',
        category: 'Competition',
        tags: ['Startup', 'Pitch', 'Entrepreneurship'],
        streamUrl: 'https://example.com/stream/startup-pitch',
        chatEnabled: true,
        pollsEnabled: true,
        qnaEnabled: false
      }
    ];

    setActiveSessions(mockSessions);

    // Mock session messages
    setSessionMessages({
      'ai-workshop-live': [
        { id: 1, user: 'Alice Johnson', message: 'Great explanation of neural networks!', timestamp: new Date(Date.now() - 300000), type: 'chat' },
        { id: 2, user: 'Bob Smith', message: 'Can you share the code repository?', timestamp: new Date(Date.now() - 240000), type: 'chat' },
        { id: 3, user: 'Dr. Sarah Chen', message: 'Repository link: github.com/ai-workshop', timestamp: new Date(Date.now() - 180000), type: 'presenter' },
        { id: 4, user: 'System', message: 'Poll: Which topic should we cover next?', timestamp: new Date(Date.now() - 120000), type: 'poll' }
      ]
    });
  }, []);

  const handleJoinSession = (sessionId) => {
    if (!joinedSessions.includes(sessionId)) {
      setJoinedSessions(prev => [...prev, sessionId]);
      addPoints(20, 'joining a live session');
      const session = activeSessions.find(s => s.id === sessionId);
      showSuccess(`Successfully joined "${session?.title}"!`, {
        duration: 3000
      });
    }
    setSelectedSession(sessionId);
  };

  const handleLeaveSession = (sessionId) => {
    setJoinedSessions(prev => prev.filter(id => id !== sessionId));
    if (selectedSession === sessionId) {
      setSelectedSession(null);
    }
    const session = activeSessions.find(s => s.id === sessionId);
    showInfo(`Left session "${session?.title}"`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || !selectedSession) return;

    const newMessage = {
      id: Date.now(),
      user: user?.name || 'You',
      message: chatMessage,
      timestamp: new Date(),
      type: 'chat'
    };

    setSessionMessages(prev => ({
      ...prev,
      [selectedSession]: [...(prev[selectedSession] || []), newMessage]
    }));

    setChatMessage('');
    addPoints(5, 'participating in session chat');
  };

  const toggleAudio = () => {
    setAudioMuted(!audioMuted);
    showInfo(audioMuted ? 'Audio unmuted' : 'Audio muted', { duration: 2000 });
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        if (videoPlayerRef) {
          await videoPlayerRef.requestFullscreen();
          setIsFullscreen(true);
          showInfo('Entered fullscreen mode', { duration: 2000 });
        }
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
        setIsFullscreen(false);
        showInfo('Exited fullscreen mode', { duration: 2000 });
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
      showInfo('Fullscreen not supported on this device', { duration: 3000 });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const changeVideoQuality = () => {
    const qualities = ['HD', '720p', '480p', '360p'];
    const currentIndex = qualities.indexOf(videoQuality);
    const nextQuality = qualities[(currentIndex + 1) % qualities.length];
    setVideoQuality(nextQuality);
    showInfo(`Video quality changed to ${nextQuality}`, { duration: 2000 });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeUntilStart = (startTime) => {
    const diff = startTime - new Date();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 0) return 'Live Now';
    if (minutes < 60) return `Starts in ${minutes}m`;
    return `Starts in ${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const SessionCard = ({ session }) => (
    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              session.status === 'live' 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 animate-pulse' 
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
            }`}>
              {session.status === 'live' ? '🔴 LIVE' : getTimeUntilStart(session.startTime)}
            </span>
            <span className="bg-custom-bg-3 text-custom-text-secondary px-2 py-1 rounded-full text-xs">
              {session.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-custom-text mb-2">{session.title}</h3>
          <p className="text-custom-text-secondary text-sm mb-2">by {session.presenter}</p>
          <p className="text-custom-text-secondary text-sm mb-4">{session.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {session.tags.map((tag, index) => (
              <span key={index} className="bg-custom-teal text-black px-2 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-custom-text-secondary">
            <span className="flex items-center space-x-1">
              <span className="material-icons text-sm">people</span>
              <span>{session.participants}/{session.maxParticipants}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="material-icons text-sm">schedule</span>
              <span>{session.duration} min</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="material-icons text-sm">access_time</span>
              <span>{formatTime(session.startTime)}</span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {joinedSessions.includes(session.id) ? (
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedSession(session.id)}
              className="bg-custom-teal text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition duration-300 flex items-center space-x-2"
            >
              <span className="material-icons text-sm">videocam</span>
              <span>View Session</span>
            </button>
            <button
              onClick={() => handleLeaveSession(session.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Leave
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleJoinSession(session.id)}
            className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
            disabled={session.participants >= session.maxParticipants}
          >
            <span className="material-icons text-sm">play_arrow</span>
            <span>{session.status === 'live' ? 'Join Live' : 'Join Session'}</span>
          </button>
        )}
        
        <div className="flex items-center space-x-2 text-custom-text-secondary">
          {session.chatEnabled && (
            <span className="material-icons text-sm" title="Chat enabled">chat</span>
          )}
          {session.pollsEnabled && (
            <span className="material-icons text-sm" title="Polls enabled">poll</span>
          )}
          {session.qnaEnabled && (
            <span className="material-icons text-sm" title="Q&A enabled">help</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {selectedSession ? (
          /* Session Viewer */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div 
                ref={setVideoPlayerRef}
                className={`rounded-lg aspect-video flex items-center justify-center mb-4 relative overflow-hidden transition-all duration-300 ${isFullscreen ? 'fullscreen-video' : ''}`}
              >
                <div className="text-center text-white">
                  <span className="material-icons text-6xl mb-4 block">videocam</span>
                  <h3 className="text-xl font-semibold mb-2">
                    {activeSessions.find(s => s.id === selectedSession)?.title}
                  </h3>
                  <p className="text-custom-text-secondary">Live stream would appear here</p>
                </div>

                {/* Fullscreen Controls Overlay */}
                {isFullscreen && (
                  <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-black/50 via-transparent to-black/50">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-white font-semibold">
                          {activeSessions.find(s => s.id === selectedSession)?.title}
                        </h3>
                        <span className="text-red-500 flex items-center text-sm">
                          <span className="material-icons text-sm mr-1">fiber_manual_record</span>
                          LIVE
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">{videoQuality}</span>
                        <span className="text-white text-sm">•</span>
                        <span className="text-white text-sm">{formatTime(new Date())}</span>
                      </div>
                    </div>

                    {/* Center Content - for future floating notifications */}
                    <div className="flex-1"></div>

                    {/* Bottom Control Bar */}
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={toggleAudio}
                        className="hover:bg-white/20 p-3 rounded-full text-white transition-all duration-300"
                        title={audioMuted ? 'Unmute' : 'Mute'}
                      >
                        <span className="material-icons">{audioMuted ? 'mic_off' : 'mic'}</span>
                      </button>
                      <button 
                        onClick={() => setIsCameraOn(!isCameraOn)}
                        className="hover:bg-white/20 p-3 rounded-full text-white transition-all duration-300"
                        title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
                      >
                        <span className="material-icons">{isCameraOn ? 'videocam' : 'videocam_off'}</span>
                      </button>
                      <button 
                        onClick={() => setIsScreenSharing(!isScreenSharing)}
                        className="hover:bg-white/20 p-3 rounded-full text-white transition-all duration-300"
                        title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                      >
                        <span className="material-icons">
                          {isScreenSharing ? 'stop_screen_share' : 'present_to_all'}
                        </span>
                      </button>
                      <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="hover:bg-white/20 p-3 rounded-full text-white transition-all duration-300"
                        title="More Options"
                      >
                        <span className="material-icons">more_vert</span>
                      </button>
                      <button 
                        onClick={toggleFullscreen}
                        className="hover:bg-white/20 p-3 rounded-full text-white transition-all duration-300"
                        title="Exit Fullscreen"
                      >
                        <span className="material-icons">fullscreen_exit</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Session Controls */}
              <div className="bg-custom-bg-2 p-4 rounded-lg border border-custom-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Audio Control */}
                    <button 
                      onClick={toggleAudio}
                      className={`audio-control-btn p-3 rounded-full text-white transition-all duration-300 ${
                        audioMuted ? 'muted' : ''
                      }`}
                      title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      <span className="material-icons text-lg">
                        {audioMuted ? 'volume_off' : 'volume_up'}
                      </span>
                    </button>
                    
                    {/* Fullscreen Control */}
                    <button 
                      onClick={toggleFullscreen}
                      className="audio-control-btn p-3 rounded-full text-white transition-all duration-300"
                      title="Toggle Fullscreen"
                    >
                      <span className="material-icons text-lg">
                        {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                      </span>
                    </button>
                    
                    {/* Quality Control */}
                    <button 
                      onClick={changeVideoQuality}
                      className="audio-control-btn p-3 rounded-full text-white transition-all duration-300 flex items-center space-x-1"
                      title="Change Video Quality"
                    >
                      <span className="material-icons text-lg">hd</span>
                      <span className="text-xs font-semibold">{videoQuality}</span>
                    </button>
                    
                    {/* Camera Control */}
                    <button 
                      onClick={() => setIsCameraOn(!isCameraOn)}
                      className={`audio-control-btn p-3 rounded-full text-white transition-all duration-300 ${
                        !isCameraOn ? 'muted' : ''
                      }`}
                      title={isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
                    >
                      <span className="material-icons text-lg">
                        {isCameraOn ? 'videocam' : 'videocam_off'}
                      </span>
                    </button>

                    {/* Screen Share */}
                    <button 
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                      className={`audio-control-btn p-3 rounded-full text-white transition-all duration-300 ${
                        isScreenSharing ? 'bg-custom-teal' : ''
                      }`}
                      title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                    >
                      <span className="material-icons text-lg">
                        {isScreenSharing ? 'stop_screen_share' : 'present_to_all'}
                      </span>
                    </button>

                    {/* Settings Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="audio-control-btn p-3 rounded-full text-white transition-all duration-300" 
                        title="Settings"
                      >
                        <span className="material-icons text-lg">settings</span>
                      </button>
                      
                      {showSettings && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-custom-bg-2 rounded-lg shadow-lg border border-custom-border">
                          <div className="p-2 space-y-1">
                            <button 
                              onClick={() => changeVideoQuality()}
                              className="w-full text-left px-3 py-2 rounded hover:bg-custom-bg flex items-center space-x-2 text-custom-text"
                            >
                              <span className="material-icons text-sm">hd</span>
                              <span>Quality: {videoQuality}</span>
                            </button>
                            <button 
                              onClick={() => {}} 
                              className="w-full text-left px-3 py-2 rounded hover:bg-custom-bg flex items-center space-x-2 text-custom-text"
                            >
                              <span className="material-icons text-sm">mic</span>
                              <span>Audio Settings</span>
                            </button>
                            <button 
                              onClick={() => {}} 
                              className="w-full text-left px-3 py-2 rounded hover:bg-custom-bg flex items-center space-x-2 text-custom-text"
                            >
                              <span className="material-icons text-sm">videocam</span>
                              <span>Video Settings</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Participants */}
                    <button 
                      onClick={() => setShowParticipants(!showParticipants)}
                      className="audio-control-btn p-3 rounded-full text-white transition-all duration-300"
                      title="Show Participants"
                    >
                      <span className="material-icons text-lg">people</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Session Info */}
                    <div className="text-right">
                      <div className="text-sm font-semibold text-custom-text">
                        {activeSessions.find(s => s.id === selectedSession)?.participants || 0} viewers
                      </div>
                      <div className="text-xs text-custom-text-secondary">
                        {activeSessions.find(s => s.id === selectedSession)?.status === 'live' ? '🔴 LIVE' : 'Recorded'}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedSession(null)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center space-x-2"
                    >
                      <span className="material-icons text-sm">exit_to_app</span>
                      <span>Leave Session</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Sidebar */}
            <div className="bg-custom-bg-2 rounded-lg border border-custom-border flex flex-col h-[600px]">
              <div className="p-4 border-b border-custom-border">
                <h3 className="font-semibold text-custom-text">Session Chat</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {sessionMessages[selectedSession]?.map((msg) => (
                  <div key={msg.id} className={`${
                    msg.type === 'presenter' ? 'bg-custom-teal bg-opacity-20 p-2 rounded' :
                    msg.type === 'poll' ? 'bg-blue-100 p-2 rounded' : ''
                  }`}>
                    <div className="flex items-start space-x-2">
                      <span className={`font-semibold text-sm ${
                        msg.type === 'presenter' ? 'text-custom-teal' :
                        msg.type === 'poll' ? 'text-blue-600' :
                        'text-custom-text'
                      }`}>
                        {msg.user}:
                      </span>
                    </div>
                    <p className="text-sm text-custom-text mt-1">{msg.message}</p>
                    <span className="text-xs text-custom-text-secondary">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-custom-border">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-input border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                  />
                  <button
                    type="submit"
                    className="bg-custom-teal text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition duration-300"
                  >
                    <span className="material-icons text-sm">send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Sessions List */
          <div>
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-custom-text mb-2">Live Sessions</h1>
              <p className="text-custom-text-secondary">
                Join interactive sessions, workshops, and events happening right now
              </p>
            </div>

            {/* Live Sessions Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {activeSessions.filter(s => s.status === 'live').length}
                </div>
                <div className="text-custom-text-secondary">Live Now</div>
              </div>
              
              <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
                <div className="text-3xl font-bold text-custom-teal mb-2">
                  {joinedSessions.length}
                </div>
                <div className="text-custom-text-secondary">Joined Sessions</div>
              </div>
              
              <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border text-center">
                <div className="text-3xl font-bold text-custom-blue mb-2">
                  {activeSessions.reduce((sum, s) => sum + s.participants, 0)}
                </div>
                <div className="text-custom-text-secondary">Total Participants</div>
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="space-y-6">
              {/* Live Sessions */}
              {activeSessions.filter(s => s.status === 'live').length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                    <span className="material-icons text-red-500 mr-2">fiber_manual_record</span>
                    Live Now
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeSessions
                      .filter(session => session.status === 'live')
                      .map(session => (
                        <SessionCard key={session.id} session={session} />
                      ))}
                  </div>
                </div>
              )}

              {/* Upcoming Sessions */}
              {activeSessions.filter(s => s.status === 'upcoming').length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                    <span className="material-icons text-custom-blue mr-2">schedule</span>
                    Coming Up
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeSessions
                      .filter(session => session.status === 'upcoming')
                      .map(session => (
                        <SessionCard key={session.id} session={session} />
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* No Sessions */}
            {activeSessions.length === 0 && (
              <div className="text-center py-12">
                <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
                  videocam_off
                </span>
                <h3 className="text-xl font-semibold text-custom-text mb-2">No live sessions</h3>
                <p className="text-custom-text-secondary">
                  Check back later for upcoming sessions and events
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LiveSessionsPage;

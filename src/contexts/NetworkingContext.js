import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';

const NetworkingContext = createContext(undefined);

export const useNetworking = () => {
  const context = useContext(NetworkingContext);
  if (!context) {
    throw new Error('useNetworking must be used within a NetworkingProvider');
  }
  return context;
};

export const NetworkingProvider = ({ children }) => {
  const { user, updateUser } = useAuth();
  
  // Mock data for connections and matches
  const [connections, setConnections] = useState([
    { id: 1, name: 'Yagnik Patel', initials: 'YP', field: 'Computer Science', skills: ['React', 'Node.js'], status: 'connected', lastSeen: '1 min ago' },
    { id: 2, name: 'Darpan Agrawal', initials: 'DA', field: 'Data Science', skills: ['Python', 'ML'], status: 'connected', lastSeen: '3 min ago' },
    { id: 3, name: 'Darsh Ayde', initials: 'DA', field: 'UI/UX Design', skills: ['Figma', 'Design'], status: 'connected', lastSeen: '4 min ago' },
    { id: 4, name: 'Meet Shah', initials: 'MS', field: 'Backend Development', skills: ['Java', 'Spring'], status: 'connected', lastSeen: '5 min ago' }
  ]);

  const [suggestedMatches, setSuggestedMatches] = useState([
    { id: 5, name: 'Mansi Sharma', initials: 'MS', field: 'Computer Science & Eng, 2nd Year', skills: ['Web Dev', 'Designer'], connections: '1 mutual connection', matchScore: 95 },
    { id: 6, name: 'Ayush Singh', initials: 'AS', field: 'Computer Science & Eng, 2nd Year', skills: ['Management', 'Cyber Security'], connections: '2 mutual connections', matchScore: 87 },
    { id: 7, name: 'Mahek Sachdev', initials: 'MS', field: 'Computer Engineering, 2nd Year', skills: ['Web Dev', 'Frontend Developer'], connections: '1 mutual connection', matchScore: 92 }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, senderId: 1, senderName: 'Yagnik Patel', message: 'Hey! Great presentation today!', timestamp: new Date(Date.now() - 300000), read: false },
    { id: 2, senderId: 2, senderName: 'Darpan Agrawal', message: 'Would love to collaborate on the AI project', timestamp: new Date(Date.now() - 600000), read: true },
    { id: 3, senderId: 3, senderName: 'Darsh Ayde', message: 'Thanks for the design feedback!', timestamp: new Date(Date.now() - 900000), read: true }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'connection', message: 'Yagnik Patel wants to connect', timestamp: new Date(Date.now() - 180000), read: false },
    { id: 2, type: 'event', message: 'AI Workshop starts in 30 minutes', timestamp: new Date(Date.now() - 300000), read: false },
    { id: 3, type: 'badge', message: 'You earned the "Networker" badge!', timestamp: new Date(Date.now() - 600000), read: true }
  ]);

  // Gamification system
  const addPoints = useCallback((points, reason) => {
    if (!user) return;
    
    const newPoints = user.points + points;
    const newBadges = [...user.badges];
    
    // Check for new badges
    if (newPoints >= 100 && !newBadges.includes('Networker')) {
      newBadges.push('Networker');
    }
    if (newPoints >= 500 && !newBadges.includes('Super Connector')) {
      newBadges.push('Super Connector');
    }
    
    updateUser({ points: newPoints, badges: newBadges });
    
    // Add notification for points/badges
    const pointNotification = {
      id: Date.now(),
      type: 'points',
      message: `You earned ${points} points for ${reason}!`,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [pointNotification, ...prev]);
  }, [user, updateUser]);

  // Connect with someone
  const connectWithUser = useCallback((targetUser) => {
    setConnections(prev => [...prev, { ...targetUser, status: 'connected', lastSeen: 'just now' }]);
    setSuggestedMatches(prev => prev.filter(match => match.id !== targetUser.id));
    addPoints(10, 'making a new connection');
    
    updateUser({ connections: user?.connections ? user.connections + 1 : 1 });
  }, [addPoints, user, updateUser]);

  // Send message
  const sendMessage = useCallback((recipientId, message) => {
    const newMessage = {
      id: Date.now(),
      senderId: user?.id,
      senderName: user?.name,
      recipientId,
      message,
      timestamp: new Date(),
      read: false
    };
    
    setMessages(prev => [newMessage, ...prev]);
    addPoints(5, 'sending a message');
  }, [user, addPoints]);

  // Mark notifications as read
  const markNotificationRead = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // QR Code exchange simulation
  const exchangeQRContact = useCallback((contactData) => {
    addPoints(15, 'QR contact exchange');
    
    const qrNotification = {
      id: Date.now(),
      type: 'qr',
      message: `Contact exchanged with ${contactData.name}`,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [qrNotification, ...prev]);
  }, [addPoints]);

  const contextValue = useMemo(() => ({
    connections,
    suggestedMatches,
    messages,
    notifications,
    connectWithUser,
    sendMessage,
    markNotificationRead,
    exchangeQRContact,
    addPoints
  }), [
    connections,
    suggestedMatches,
    messages,
    notifications,
    connectWithUser,
    sendMessage,
    markNotificationRead,
    exchangeQRContact,
    addPoints
  ]);

  return (
    <NetworkingContext.Provider value={contextValue}>
      {children}
    </NetworkingContext.Provider>
  );
};

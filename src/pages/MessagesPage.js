import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';

const MessagesPage = () => {
  const { user } = useAuth();
  const { connections, sendMessage } = useNetworking();
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('direct');
  const messagesEndRef = useRef(null);

  // Mock group forums
  const [groupForums] = useState([
    {
      id: 'ai-workshop',
      name: 'AI Workshop Discussion',
      description: 'Discuss AI development techniques and share resources',
      members: 45,
      lastMessage: 'Great session today! Anyone has the slides?',
      lastMessageTime: new Date(Date.now() - 300000),
      unread: 3,
      avatar: 'AI'
    },
    {
      id: 'career-fair',
      name: 'Career Fair 2025',
      description: 'Tips, experiences, and networking for the upcoming career fair',
      members: 120,
      lastMessage: 'Microsoft booth was amazing!',
      lastMessageTime: new Date(Date.now() - 600000),
      unread: 0,
      avatar: 'CF'
    },
    {
      id: 'hackathon-team',
      name: 'Innovation Challenge Team',
      description: 'Coordination for the 48-hour hackathon',
      members: 8,
      lastMessage: 'Meeting at 2 PM in lab 3',
      lastMessageTime: new Date(Date.now() - 900000),
      unread: 1,
      avatar: 'HC'
    }
  ]);

  const [chatMessages, setChatMessages] = useState({
    1: [
      { id: 1, senderId: 1, message: 'Hey! Great presentation today!', timestamp: new Date(Date.now() - 300000), sent: false },
      { id: 2, senderId: user?.id, message: 'Thank you! I really enjoyed your questions during the Q&A', timestamp: new Date(Date.now() - 240000), sent: true },
      { id: 3, senderId: 1, message: 'Would love to collaborate on a project sometime', timestamp: new Date(Date.now() - 180000), sent: false }
    ],
    2: [
      { id: 4, senderId: 2, message: 'Would love to collaborate on the AI project', timestamp: new Date(Date.now() - 600000), sent: false },
      { id: 5, senderId: user?.id, message: 'Absolutely! When are you free to discuss?', timestamp: new Date(Date.now() - 540000), sent: true }
    ]
  });

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const message = {
      id: Date.now(),
      senderId: user?.id,
      message: newMessage,
      timestamp: new Date(),
      sent: true
    };

    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), message]
    }));

    sendMessage(activeChat, newMessage);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const ChatList = ({ items, type }) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            activeChat === item.id
              ? 'bg-custom-teal bg-opacity-20 border-l-4 border-custom-teal'
              : 'bg-custom-bg-2 hover:bg-custom-bg border border-custom-border'
          }`}
          onClick={() => setActiveChat(item.id)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold">
              {item.initials || item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-custom-text truncate">
                  {item.name}
                </h3>
                <span className="text-xs text-custom-text-secondary">
                  {formatDate(item.lastMessageTime || item.lastSeen)}
                </span>
              </div>
              <p className="text-sm text-custom-text-secondary truncate">
                {type === 'group' ? item.description : item.lastMessage || 'Start a conversation'}
              </p>
              {type === 'group' && (
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-custom-text-secondary">
                    {item.members} members
                  </span>
                  {item.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {item.unread}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const MessageBubble = ({ message, isOwn }) => (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwn ? 'bg-custom-teal text-black' : 'bg-custom-bg-2 text-custom-text border border-custom-border'}`}>
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-black opacity-70' : 'text-custom-text-secondary'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="bg-custom-bg-2 rounded-lg border border-custom-border h-[calc(100vh-200px)] flex">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-custom-border flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-custom-border">
              <h1 className="text-xl font-bold text-custom-text mb-4">Messages</h1>
              
              {/* Tabs */}
              <div className="flex space-x-1 bg-custom-bg p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'direct'
                      ? 'bg-custom-teal text-black'
                      : 'text-custom-text-secondary hover:text-custom-text'
                  }`}
                  onClick={() => setActiveTab('direct')}
                >
                  Direct Messages
                </button>
                <button
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'groups'
                      ? 'bg-custom-teal text-black'
                      : 'text-custom-text-secondary hover:text-custom-text'
                  }`}
                  onClick={() => setActiveTab('groups')}
                >
                  Group Forums
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'direct' ? (
                <ChatList items={connections} type="direct" />
              ) : (
                <ChatList items={groupForums} type="group" />
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-custom-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold">
                      {activeTab === 'direct' 
                        ? connections.find(c => c.id === activeChat)?.initials
                        : groupForums.find(g => g.id === activeChat)?.avatar
                      }
                    </div>
                    <div>
                      <h2 className="font-semibold text-custom-text">
                        {activeTab === 'direct' 
                          ? connections.find(c => c.id === activeChat)?.name
                          : groupForums.find(g => g.id === activeChat)?.name
                        }
                      </h2>
                      <p className="text-sm text-custom-text-secondary">
                        {activeTab === 'direct' 
                          ? 'Online'
                          : `${groupForums.find(g => g.id === activeChat)?.members} members`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  {chatMessages[activeChat]?.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwn={message.senderId === user?.id}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-custom-border">
                  <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                    />
                    <button
                      type="submit"
                      className="bg-custom-teal text-black px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300 flex items-center space-x-2"
                    >
                      <span className="material-icons text-sm">send</span>
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* No Chat Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
                    chat_bubble_outline
                  </span>
                  <h3 className="text-xl font-semibold text-custom-text mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-custom-text-secondary">
                    Choose from your existing conversations or start a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;

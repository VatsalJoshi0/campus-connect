import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import ChatList from '../components/ChatList';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';
import { useChat } from '../hooks/useChat';
import { sanitizeChatMessage } from '../utils/sanitize';

const MessagesPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { connections } = useNetworking();
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('direct');
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle pre-selected user from URL parameter
  useEffect(() => {
    const userId = searchParams.get('userId');
    if (userId) {
      const userIdNum = parseInt(userId);
      const connection = connections.find(c => c.id === userIdNum);
      if (connection) {
        setActiveChat(connection);
        setActiveTab('direct');
      }
    }
  }, [searchParams, connections]);

  const {
    messages,
    isTyping,
    sendChatMessage,
    handleTypingStart,
    loadChatHistory,
    retryMessage,
    markAsRead
  } = useChat();

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const success = await sendChatMessage(activeChat, newMessage);
    if (success) {
      setNewMessage('');
      chatInputRef.current?.focus();
    }
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
    <div className="space-y-2" role="list" aria-label={`${type === 'group' ? 'Group forums' : 'Direct messages'}`}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`w-full p-4 min-h-[76px] rounded-lg cursor-pointer transition-colors text-left ${
            activeChat === item.id
              ? 'bg-custom-teal bg-opacity-20 border-l-4 border-custom-teal'
              : 'bg-custom-bg-2 hover:bg-custom-bg border border-custom-border'
          }`}
          onClick={() => setActiveChat(item.id)}
          aria-current={activeChat === item.id ? 'true' : undefined}
          aria-label={`Chat with ${item.name}. Last message: ${item.lastMessage || item.description || 'No messages'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center font-bold" style={{ color: '#000000' }}>
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
        </button>
      ))}
    </div>
  );

  const MessageBubble = ({ message, isOwn }) => (
    <div 
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      role="article"
      aria-label={`Message ${isOwn ? 'sent by you' : 'received'} at ${formatTime(message.timestamp)}`}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwn ? 'bg-custom-teal text-black' : 'bg-custom-bg-2 text-custom-text border border-custom-border'}`}>
        {/* Use textContent implicitly by rendering as text, not HTML */}
        <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
        <time 
          className={`text-xs mt-1 block ${isOwn ? 'text-black opacity-70' : 'text-custom-text-secondary'}`}
          dateTime={new Date(message.timestamp).toISOString()}
        >
          {formatTime(message.timestamp)}
        </time>
      </div>
    </div>
  );

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8" id="main-content">
        <div className="bg-custom-bg-2 rounded-lg border border-custom-border h-[calc(100vh-140px)] sm:h-[calc(100vh-200px)] flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className={`w-full md:w-1/3 border-b md:border-b-0 md:border-r border-custom-border flex flex-col ${activeChat && 'hidden md:flex'}`} aria-label="Message list">
            {/* Header */}
            <div className="p-4 border-b border-custom-border space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-custom-text">Messages</h1>
                <button
                  type="button"
                  className="p-2 text-custom-text-secondary hover:text-custom-text hover:bg-custom-bg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
                  aria-label="Start new conversation"
                >
                  <span className="material-icons">edit</span>
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-custom-bg border border-custom-border rounded-lg text-custom-text placeholder-custom-text-secondary focus:outline-none focus:ring-2 focus:ring-custom-teal"
                  onFocus={() => setIsSearching(true)}
                  onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-text-secondary">
                  <span className="material-icons text-sm">search</span>
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-custom-text-secondary hover:text-custom-text"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <span className="material-icons text-sm">close</span>
                  </button>
                )}
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-1 bg-custom-bg p-1 rounded-lg" role="tablist" aria-label="Message categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'direct'}
                  aria-controls="chat-list-panel"
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal ${
                    activeTab === 'direct'
                      ? 'bg-custom-teal text-black'
                      : 'text-custom-text-secondary hover:text-custom-text'
                  }`}
                  onClick={() => setActiveTab('direct')}
                >
                  Direct Messages
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'groups'}
                  aria-controls="chat-list-panel"
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal ${
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
            <div 
              id="chat-list-panel"
              role="tabpanel"
              className="flex-1 overflow-y-auto p-4"
              aria-label={`${activeTab === 'direct' ? 'Direct messages' : 'Group forums'} list`}
            >
              {activeTab === 'direct' ? (
                <ChatList items={connections} type="direct" />
              ) : (
                <ChatList items={groupForums} type="group" />
              )}
            </div>
          </aside>

          {/* Chat Area */}
          <section className={`flex-1 flex flex-col ${!activeChat && 'hidden md:flex'}`} aria-label="Chat conversation">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <header className="p-3 sm:p-4 border-b border-custom-border bg-custom-bg-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Back button for mobile */}
                      <button
                        type="button"
                        className="md:hidden p-2 min-w-[44px] min-h-[44px] text-custom-text-secondary hover:text-custom-text hover:bg-custom-bg rounded-lg transition-colors flex items-center justify-center"
                        onClick={() => setActiveChat(null)}
                        aria-label="Back to message list"
                      >
                        <span className="material-icons">arrow_back</span>
                      </button>
                      <div className="relative">
                        <div 
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold ring-2 ring-custom-teal ring-offset-2 ring-offset-custom-bg-2"
                          role="img"
                          aria-label={`${activeTab === 'direct' 
                            ? connections.find(c => c.id === activeChat)?.name
                            : groupForums.find(g => g.id === activeChat)?.name} avatar`}
                        >
                          {activeTab === 'direct' 
                            ? connections.find(c => c.id === activeChat)?.initials
                            : groupForums.find(g => g.id === activeChat)?.avatar
                          }
                        </div>
                        {activeTab === 'direct' && (
                          <span 
                            className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"
                            aria-label="Online"
                          ></span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold text-custom-text flex items-center space-x-2">
                          <span>
                            {activeTab === 'direct' 
                              ? connections.find(c => c.id === activeChat)?.name
                              : groupForums.find(g => g.id === activeChat)?.name
                            }
                          </span>
                          {activeTab === 'group' && (
                            <span className="bg-custom-teal text-black text-xs px-2 py-1 rounded-full">
                              Group
                            </span>
                          )}
                        </h2>
                        <p className="text-sm text-custom-text-secondary flex items-center space-x-2">
                          {activeTab === 'direct' ? (
                            <>
                              <span className="flex items-center">
                                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                <span aria-label="User is online">Online</span>
                              </span>
                              <span>•</span>
                              <span>Last active 2m ago</span>
                            </>
                          ) : (
                            <>
                              <span className="flex items-center">
                                <span className="material-icons text-sm mr-1">group</span>
                                <span>{groupForums.find(g => g.id === activeChat)?.members} members</span>
                              </span>
                              <span>•</span>
                              <span>3 online</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-2 text-custom-text-secondary hover:text-custom-text hover:bg-custom-bg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
                        aria-label="Start video call"
                      >
                        <span className="material-icons">videocam</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-custom-text-secondary hover:text-custom-text hover:bg-custom-bg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
                        aria-label="Start voice call"
                      >
                        <span className="material-icons">call</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-custom-text-secondary hover:text-custom-text hover:bg-custom-bg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
                        aria-label="View chat information"
                      >
                        <span className="material-icons">info</span>
                      </button>
                    </div>
                  </div>
                </header>

                {/* Messages */}
                <div 
                  className="flex-1 overflow-y-auto p-4"
                  role="log"
                  aria-live="polite"
                  aria-atomic="false"
                  aria-label="Chat messages"
                >
                  {chatMessages[activeChat]?.sort((a, b) => (a.sequence || 0) - (b.sequence || 0)).map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwn={message.senderId === user?.id}
                    />
                  ))}
                  <div ref={messagesEndRef} aria-hidden="true" />
                </div>

                {/* Message Input */}
                <footer className="p-4 border-t border-custom-border">
                  <form onSubmit={handleSendMessage} className="space-y-4" aria-label="Send message">
                    <div className="flex space-x-3">
                      <div className="flex-1 relative">
                        <label htmlFor="message-input" className="sr-only">
                          Type your message
                        </label>
                        <textarea
                          id="message-input"
                          ref={chatInputRef}
                          value={newMessage}
                          onChange={(e) => {
                            setNewMessage(e.target.value);
                            handleTypingStart(activeChat);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage(e);
                            }
                          }}
                          placeholder="Type a message... (Press Enter to send, Shift+Enter for new line)"
                          maxLength="1000"
                          rows={1}
                          className="w-full px-4 py-3 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal resize-none"
                          style={{ minHeight: '2.5rem', maxHeight: '8rem' }}
                          aria-describedby="message-limit"
                          autoComplete="off"
                        />
                        <div className="absolute bottom-2 right-2 flex items-center space-x-2 text-custom-text-secondary text-xs">
                          <span>{newMessage.length}/1000</span>
                        </div>
                      </div>
                      <div className="flex items-end space-x-2">
                        <button
                          type="button"
                          className="p-2 text-custom-text-secondary hover:text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2 rounded-lg"
                          aria-label="Attach file"
                        >
                          <span className="material-icons">attach_file</span>
                        </button>
                        <button
                          type="button"
                          className="p-2 text-custom-text-secondary hover:text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2 rounded-lg"
                          aria-label="Add emoji"
                        >
                          <span className="material-icons">mood</span>
                        </button>
                        <button
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="bg-custom-teal text-black px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2 transform hover:scale-105"
                          aria-label="Send message"
                        >
                          <span className="material-icons text-sm" aria-hidden="true">send</span>
                          <span>Send</span>
                        </button>
                      </div>
                    </div>
                  </form>
                  {isTyping[activeChat] && (
                    <div className="text-xs text-custom-text-secondary mt-1 flex items-center">
                      <span className="material-icons text-sm mr-1">edit</span>
                      Someone is typing...
                    </div>
                  )}
                </footer>
              </>
            ) : (
              /* No Chat Selected */
              <div className="flex-1 flex items-center justify-center" role="status" aria-live="polite">
                <div className="text-center">
                  <span className="material-icons text-6xl text-custom-text-secondary mb-4 block" aria-hidden="true">
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
          </section>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;

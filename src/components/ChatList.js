import React from 'react';

const ChatList = ({ items, type, activeChat, onChatSelect }) => {
  const formatDate = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diffTime / (1000 * 60));
        if (minutes === 0) return 'Just now';
        return `${minutes}m ago`;
      }
      return `${hours}h ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div 
      className="space-y-2" 
      role="list" 
      aria-label={`${type === 'group' ? 'Group forums' : 'Direct messages'}`}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`w-full p-4 rounded-lg cursor-pointer transition-all duration-300 text-left transform hover:-translate-y-0.5 ${
            activeChat === item.id
              ? 'bg-custom-teal bg-opacity-20 border-l-4 border-custom-teal shadow-md'
              : 'bg-custom-bg-2 hover:bg-custom-bg border border-custom-border hover:shadow-sm'
          }`}
          onClick={() => onChatSelect(item.id)}
          aria-current={activeChat === item.id ? 'true' : undefined}
          aria-label={`Chat with ${item.name}. Last message: ${item.lastMessage || item.description || 'No messages'}${
            item.unread ? `. ${item.unread} unread messages` : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div 
                className={`
                  w-12 h-12 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal 
                  flex items-center justify-center text-white font-bold
                  ${type === 'group' ? 'ring-2 ring-custom-teal ring-offset-2 ring-offset-custom-bg-2' : ''}
                `}
              >
                {item.initials || item.avatar}
              </div>
              {type === 'direct' && item.isOnline && (
                <span 
                  className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"
                  aria-label="Online"
                ></span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-custom-text truncate">
                  {item.name}
                </h3>
                <span className="text-xs text-custom-text-secondary flex items-center">
                  {item.typing ? (
                    <span className="text-custom-teal flex items-center">
                      <span className="material-icons text-sm mr-1">edit</span>
                      typing...
                    </span>
                  ) : (
                    formatDate(item.lastMessageTime || item.lastSeen)
                  )}
                </span>
              </div>
              
              <p className="text-sm text-custom-text-secondary truncate">
                {type === 'group' ? item.description : item.lastMessage || 'Start a conversation'}
              </p>
              
              <div className="flex items-center justify-between mt-1">
                {type === 'group' ? (
                  <span className="text-xs text-custom-text-secondary flex items-center">
                    <span className="material-icons text-sm mr-1">group</span>
                    {item.members} members
                  </span>
                ) : (
                  <span className="text-xs text-custom-text-secondary">
                    {item.lastMessageSender ? `${item.lastMessageSender}: ` : ''}
                  </span>
                )}
                
                {item.unread > 0 && (
                  <span 
                    className="bg-custom-teal text-black text-xs font-semibold rounded-full px-2 py-1 min-w-[1.5rem] text-center"
                    aria-label={`${item.unread} unread messages`}
                  >
                    {item.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;
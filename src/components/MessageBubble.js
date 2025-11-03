import React from 'react';

const MessageBubble = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}
      role="article"
      aria-label={`Message ${isOwn ? 'sent by you' : 'received'} at ${formatTime(message.timestamp)}`}
    >
      <div 
        className={`
          max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all duration-300
          ${isOwn 
            ? 'bg-custom-teal text-black' 
            : 'bg-custom-bg-2 text-custom-text border border-custom-border'
          }
          ${message.pending ? 'opacity-70' : ''}
          ${message.failed ? 'bg-red-100 border-red-300' : ''}
        `}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
        <div className="flex items-center justify-end mt-1 space-x-2">
          <time 
            className={`text-xs ${isOwn ? 'text-black opacity-70' : 'text-custom-text-secondary'}`}
            dateTime={new Date(message.timestamp).toISOString()}
          >
            {formatTime(message.timestamp)}
          </time>
          {isOwn && (
            <>
              {message.pending && (
                <span className="material-icons text-xs" aria-label="Sending message">
                  schedule
                </span>
              )}
              {message.failed && (
                <span className="material-icons text-xs text-red-500" aria-label="Failed to send">
                  error_outline
                </span>
              )}
              {!message.pending && !message.failed && (
                <span className="material-icons text-xs" aria-label="Message sent">
                  check
                </span>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Retry button for failed messages */}
      {message.failed && (
        <button
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 text-red-500 hover:text-red-600"
          onClick={() => message.onRetry?.()}
          aria-label="Retry sending message"
        >
          <span className="material-icons text-sm">refresh</span>
        </button>
      )}
    </div>
  );
};

export default MessageBubble;
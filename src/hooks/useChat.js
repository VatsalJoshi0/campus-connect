import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';
import { useNotification } from '../contexts/NotificationContext';
import { sanitizeChatMessage } from '../utils/sanitize';

export const useChat = () => {
  const { user } = useAuth();
  const { connections, sendMessage } = useNetworking();
  const { showError } = useNotification();
  const [messages, setMessages] = useState({});
  const [isTyping, setIsTyping] = useState({});
  const [typingTimeout, setTypingTimeout] = useState({});

  // Simulate receiving messages
  useEffect(() => {
    // Simulated WebSocket connection setup
    console.log('Setting up chat connection...');
    return () => {
      // Cleanup WebSocket connection
      console.log('Cleaning up chat connection...');
    };
  }, []);

  // Handle incoming messages
  const handleIncomingMessage = useCallback((chatId, message) => {
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), {
        id: Date.now(),
        senderId: message.senderId,
        message: message.content,
        timestamp: new Date(),
        sequence: (prev[chatId]?.length || 0) + 1,
        sent: false
      }]
    }));
  }, []);

  // Send message with optimistic update
  const sendChatMessage = useCallback(async (chatId, content) => {
    const sanitizedMessage = sanitizeChatMessage(content);
    
    if (!sanitizedMessage) {
      showError('Message contains invalid content');
      return false;
    }

    const tempId = Date.now();
    const newMessage = {
      id: tempId,
      senderId: user?.id,
      message: sanitizedMessage,
      timestamp: new Date(),
      sequence: (messages[chatId]?.length || 0) + 1,
      sent: true,
      pending: true
    };

    // Optimistic update
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    try {
      await sendMessage(chatId, sanitizedMessage);
      
      // Confirm message sent
      setMessages(prev => ({
        ...prev,
        [chatId]: prev[chatId].map(msg => 
          msg.id === tempId ? { ...msg, pending: false } : msg
        )
      }));

      return true;
    } catch (error) {
      // Mark message as failed
      setMessages(prev => ({
        ...prev,
        [chatId]: prev[chatId].map(msg =>
          msg.id === tempId ? { ...msg, failed: true } : msg
        )
      }));
      
      showError('Failed to send message. Please try again.');
      return false;
    }
  }, [user?.id, messages, sendMessage, showError]);

  // Handle typing indicators
  const handleTypingStart = useCallback((chatId) => {
    if (typingTimeout[chatId]) {
      clearTimeout(typingTimeout[chatId]);
    }

    setIsTyping(prev => ({ ...prev, [chatId]: true }));
    
    const timeout = setTimeout(() => {
      setIsTyping(prev => ({ ...prev, [chatId]: false }));
    }, 3000);
    
    setTypingTimeout(prev => ({ ...prev, [chatId]: timeout }));
  }, [typingTimeout]);

  // Load chat history
  const loadChatHistory = useCallback(async (chatId) => {
    try {
      // Simulate API call to load chat history
      console.log(`Loading chat history for ${chatId}...`);
      // In a real app, you would fetch messages from your backend here
    } catch (error) {
      showError('Failed to load chat history');
    }
  }, [showError]);

  // Retry failed message
  const retryMessage = useCallback(async (chatId, messageId) => {
    const failedMessage = messages[chatId]?.find(msg => msg.id === messageId);
    if (!failedMessage) return;

    // Remove failed message and try sending again
    setMessages(prev => ({
      ...prev,
      [chatId]: prev[chatId].filter(msg => msg.id !== messageId)
    }));

    return sendChatMessage(chatId, failedMessage.message);
  }, [messages, sendChatMessage]);

  // Mark messages as read
  const markAsRead = useCallback((chatId) => {
    // In a real app, you would send this to your backend
    console.log(`Marking messages as read for chat ${chatId}`);
  }, []);

  return {
    messages,
    isTyping,
    sendChatMessage,
    handleTypingStart,
    loadChatHistory,
    retryMessage,
    markAsRead,
    handleIncomingMessage
  };
};
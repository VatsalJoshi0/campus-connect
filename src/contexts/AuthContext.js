import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('authToken', null);
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  // Mock login function (replace with actual API call)
  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock JWT token and user data
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: 1,
        name: 'Vatsal Joshi',
        email: credentials.email,
        enrollment: credentials.enrollment,
        phone: credentials.phone,
        avatar: 'VJ',
        profileImage: null,
        interests: ['Web Development', 'AI/ML', 'UI/UX Design'],
        skills: ['React', 'JavaScript', 'Python'],
        projects: [],
        goals: ['Network with industry professionals', 'Learn new technologies'],
        points: 0,
        badges: [],
        connections: 42,
        following: 12,
        profileCompletion: 87
      };

      setToken(mockToken);
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setLoading(false);
    }
  }, [setToken, setUser]);

  // Mock register function
  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: Date.now(),
        name: userData.name || 'New User',
        email: userData.email,
        enrollment: userData.enrollment,
        phone: userData.phone,
        avatar: userData.name ? userData.name.split(' ').map(n => n[0]).join('') : 'NU',
        profileImage: null,
        interests: [],
        skills: [],
        projects: [],
        goals: [],
        points: 0,
        badges: [],
        connections: 0,
        following: 0,
        profileCompletion: 25
      };

      setToken(mockToken);
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  }, [setToken, setUser]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, [setToken, setUser]);

  const updateUser = useCallback((updates) => {
    setUser(prevUser => ({ ...prevUser, ...updates }));
  }, [setUser]);

  const contextValue = useMemo(() => ({
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser
  }), [user, token, isAuthenticated, loading, login, register, logout, updateUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

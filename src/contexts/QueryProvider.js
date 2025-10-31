import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAuthError, isNetworkError } from '../utils/api';

/**
 * Configure React Query Client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long before data is considered stale
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Cache time - how long to keep unused data in cache
      cacheTime: 10 * 60 * 1000, // 10 minutes
      
      // Retry configuration
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (isAuthError(error)) return false;
        
        // Don't retry on client errors (4xx)
        if (error.status >= 400 && error.status < 500) return false;
        
        // Retry up to 3 times for server errors or network issues
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus (production only)
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Don't refetch on mount if data is fresh
      refetchOnMount: true,
      
      // Suspense mode
      suspense: false,
      
      // Error handling
      onError: (error) => {
        if (isAuthError(error)) {
          console.error('[Query] Authentication error:', error);
          // Handle logout or redirect to login
        } else if (isNetworkError(error)) {
          console.error('[Query] Network error:', error);
          // Show offline notification
        } else {
          console.error('[Query] Error:', error);
        }
      }
    },
    
    mutations: {
      // Retry mutations once for network errors
      retry: (failureCount, error) => {
        if (isNetworkError(error) && failureCount < 1) return true;
        return false;
      },
      
      // Error handling
      onError: (error) => {
        console.error('[Mutation] Error:', error);
      }
    }
  }
});

/**
 * Query Provider Component
 */
export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export { queryClient };
export default QueryProvider;

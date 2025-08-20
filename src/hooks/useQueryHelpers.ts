import { useQueryClient } from 'react-query';
import { useEffect } from 'react';

// Hook to persist React Query cache
export const usePersistentQueries = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Set up periodic cache persistence
    const interval = setInterval(() => {
      const cache = queryClient.getQueryCache();
      const queries = cache.getAll();
      
      // Log cache status for debugging
      console.log('React Query Cache Status:', {
        totalQueries: queries.length,
        activeQueries: queries.filter(q => q.state.status === 'success').length,
        errorQueries: queries.filter(q => q.state.status === 'error').length,
        loadingQueries: queries.filter(q => q.state.status === 'loading').length,
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [queryClient]);

  // Invalidate queries on network recovery
  useEffect(() => {
    const handleOnline = () => {
      console.log('Network recovered, invalidating queries...');
      queryClient.invalidateQueries();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [queryClient]);
};

// Hook to debug query states
export const useQueryDebugger = (queryKey: string, queryResult: any) => {
  useEffect(() => {
    console.log(`[${queryKey}] Query State:`, {
      status: queryResult.status,
      isLoading: queryResult.isLoading,
      isFetching: queryResult.isFetching,
      isSuccess: queryResult.isSuccess,
      isError: queryResult.isError,
      error: queryResult.error,
      data: queryResult.data,
      dataUpdatedAt: queryResult.dataUpdatedAt,
      errorUpdatedAt: queryResult.errorUpdatedAt,
    });
  }, [queryKey, queryResult.status, queryResult.data, queryResult.error]);
};

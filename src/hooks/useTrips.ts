import { useQuery } from 'react-query';
import { tripsAPI, Trip, PaginatedApiResponse } from '../services/estabraqAPI';

// Hook for fetching trips with filters
export const useTrips = (
  page = 1,
  pageSize = 12,
  search?: string,
  categoryId?: number,
  minPrice?: number,
  maxPrice?: number,
  sortBy?: string,
  sortDescending = false
) => {
  const queryKey = ['trips', { page, pageSize, search, categoryId, minPrice, maxPrice, sortBy, sortDescending }];
  
  return useQuery({
    queryKey,
    queryFn: () => tripsAPI.getAll(page, pageSize, search, categoryId, minPrice, maxPrice, sortBy, sortDescending),
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    keepPreviousData: true, // Keep previous data while loading new page
    select: (data: PaginatedApiResponse<Trip>) => ({
      trips: data.data.items,
      totalCount: data.data.totalCount,
      totalPages: Math.ceil(data.data.totalCount / pageSize),
      currentPage: data.data.page,
      pageSize: data.data.pageSize,
    }),
  });
};

// Hook for fetching a single trip by ID
export const useTrip = (id: number) => {
  return useQuery({
    queryKey: ['trip', id],
    queryFn: () => tripsAPI.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    select: (data) => data.data,
  });
};

// Hook for fetching featured trips
export const useFeaturedTrips = (count = 6) => {
  return useQuery({
    queryKey: ['featuredTrips', count],
    queryFn: () => tripsAPI.getFeatured(count),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true,
    refetchInterval: false,
    select: (data) => {
      return data.data || data;
    },
  });
};

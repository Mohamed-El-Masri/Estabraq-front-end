import { useQuery } from 'react-query';
import { categoriesAPI, Category, PaginatedApiResponse, CategoriesQueryParams } from '../services/estabraqAPI';

export const useCategories = (params?: CategoriesQueryParams) => {
  const queryKey = ['categories', params];
  
  return useQuery({
    queryKey,
    queryFn: () => categoriesAPI.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: true,
    refetchInterval: false,
    select: (data: PaginatedApiResponse<Category>) => {
      const result = {
        categories: data.data?.items || data.data || [],
        totalCount: data.data?.totalCount || 0,
        totalPages: Math.ceil((data.data?.totalCount || 0) / (params?.pageSize || 10)),
        currentPage: data.data?.page || 1,
        pageSize: data.data?.pageSize || (params?.pageSize || 10),
      };
      return result;
    },
  });
};

export const useActiveCategories = () => {
  return useCategories({ isActive: true, pageSize: 50 });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesAPI.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    select: (data) => data.data,
  });
};

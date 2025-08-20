import { useQuery } from 'react-query';
import { categoriesAPI, Category, PaginatedApiResponse, CategoriesQueryParams } from '../services/estabraqAPI';

export const useCategories = (params?: CategoriesQueryParams) => {
  const queryKey = ['categories', params];
  
  return useQuery({
    queryKey,
    queryFn: () => categoriesAPI.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    select: (data: PaginatedApiResponse<Category>) => ({
      categories: data.data.items,
      totalCount: data.data.totalCount,
      totalPages: Math.ceil(data.data.totalCount / (params?.pageSize || 10)),
      currentPage: data.data.page,
      pageSize: data.data.pageSize,
    }),
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

import axios, { AxiosResponse } from 'axios';

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages?: number;
  };
  errors: string[];
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

// Category types
export interface Category {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  imageUrl: string;
  isActive: boolean;
  tripCount: number;
  createdAt: string;
}

// Trip types
export interface Trip {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  location: string;
  locationAr: string;
  price: number;
  duration: number;
  maxParticipants: number;
  difficulty: string;
  difficultyAr: string;
  includes?: string;
  includesAr?: string;
  excludes?: string;
  excludesAr?: string;
  itinerary?: string;
  itineraryAr?: string;
  imageUrl: string;
  images?: string[];
  isActive: boolean;
  isFeatured: boolean;
  category: {
    id: number;
    name: string;
    nameAr: string;
  };
  createdAt: string;
}

// Booking types
export interface BookingRequest {
  tripId: number;
  participants: number;
  specialRequests?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface Booking {
  id: number;
  bookingNumber: string;
  tripId: number;
  userId: number;
  participants: number;
  totalAmount: number;
  status: string;
  statusAr: string;
  specialRequests?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  trip: {
    id: number;
    title: string;
    titleAr: string;
    price: number;
    duration: number;
    imageUrl: string;
  };
  createdAt: string;
}

// Contact types
export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://estabraq.runasp.net/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Services
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  refreshToken: async (token: string, refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/refresh', { token, refreshToken });
    return response.data;
  },
};

// Categories query parameters
export interface CategoriesQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDescending?: boolean;
  isDescending?: boolean; // Alternative to sortDescending
  isActive?: boolean;
}

export const categoriesAPI = {
  getAll: async (params?: CategoriesQueryParams): Promise<PaginatedApiResponse<Category>> => {
    const queryParams = new URLSearchParams();
    
    // Set default values
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    
    queryParams.append('page', page.toString());
    queryParams.append('pageSize', pageSize.toString());
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortDescending) queryParams.append('sortDescending', 'true');
    if (params?.isDescending) queryParams.append('isDescending', 'true');
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());

    const response = await apiClient.get(`/categories?${queryParams}`);
    return response.data;
  },

  getActive: async (): Promise<ApiResponse<Category[]>> => {
    const response = await apiClient.get('/categories/active');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Category>> => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },
};

export const tripsAPI = {
  getAll: async (
    page = 1,
    pageSize = 12,
    search?: string,
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    sortDescending = false
  ): Promise<PaginatedApiResponse<Trip>> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (search) params.append('search', search);
    if (categoryId) params.append('categoryId', categoryId.toString());
    if (minPrice) params.append('minPrice', minPrice.toString());
    if (maxPrice) params.append('maxPrice', maxPrice.toString());
    if (sortBy) params.append('sortBy', sortBy);
    if (sortDescending) params.append('sortDescending', 'true');

    const response = await apiClient.get(`/trips?${params}`);
    return response.data;
  },

  getFeatured: async (count = 6): Promise<ApiResponse<Trip[]>> => {
    const response = await apiClient.get(`/trips/featured?count=${count}`);
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Trip>> => {
    const response = await apiClient.get(`/trips/${id}`);
    return response.data;
  },
};

export const bookingsAPI = {
  create: async (booking: BookingRequest): Promise<ApiResponse<Booking>> => {
    const response = await apiClient.post('/bookings', booking);
    return response.data;
  },

  getMyBookings: async (
    page = 1,
    pageSize = 10,
    status?: string
  ): Promise<PaginatedApiResponse<Booking>> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (status) params.append('status', status);

    const response = await apiClient.get(`/bookings/my-bookings?${params}`);
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Booking>> => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  cancel: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.put(`/bookings/${id}/cancel`);
    return response.data;
  },
};

export const contactAPI = {
  sendMessage: async (message: ContactRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post('/contact', message);
    return response.data;
  },
};

export const healthAPI = {
  checkAPI: async (): Promise<any> => {
    // Health endpoints are not under /api, use direct URL
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://estabraq.runasp.net/api';
    const healthUrl = baseUrl.replace('/api', '/health');
    const response = await axios.get(healthUrl);
    return response.data;
  },

  checkDatabase: async (): Promise<any> => {
    // Database health endpoint is under /api
    const response = await apiClient.get('/health/database');
    return response.data;
  },
};

// Utility functions
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export default apiClient;

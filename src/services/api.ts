import axios, { AxiosResponse } from 'axios';
import { Trip, Booking, Category, ApiResponse, PaginatedResponse, TripFilters, BookingForm } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://estabraq.runasp.net/api',
  timeout: 30000, // Increased timeout for hosting environment
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Trip API endpoints
export const tripAPI = {
  // Get all trips with optional filtering
  getTrips: async (filters?: TripFilters, page = 1, pageSize = 12): Promise<PaginatedResponse<Trip>> => {
    const params = new URLSearchParams();
    
    if (filters?.categoryId && filters.categoryId !== null) params.append('categoryId', filters.categoryId.toString());
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.startDate) params.append('startDate', filters.startDate.toISOString());
    if (filters?.endDate) params.append('endDate', filters.endDate.toISOString());
    if (filters?.searchTerm) params.append('searchTerm', filters.searchTerm);
    
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    
    const response = await api.get<PaginatedResponse<Trip>>(`/trips?${params}`);
    return response.data;
  },

  // Get single trip by ID
  getTripById: async (id: string): Promise<Trip> => {
    const response = await api.get<ApiResponse<Trip>>(`/trips/${id}`);
    return response.data.data;
  },

  // Get featured trips for home page
  getFeaturedTrips: async (limit = 6): Promise<Trip[]> => {
    const response = await api.get<ApiResponse<Trip[]>>(`/trips/featured?limit=${limit}`);
    return response.data.data;
  },

  // Admin only - Create trip
  createTrip: async (tripData: FormData): Promise<Trip> => {
    const response = await api.post<ApiResponse<Trip>>('/trips', tripData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Admin only - Update trip
  updateTrip: async (id: string, tripData: FormData): Promise<Trip> => {
    const response = await api.put<ApiResponse<Trip>>(`/trips/${id}`, tripData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Admin only - Delete trip
  deleteTrip: async (id: string): Promise<void> => {
    await api.delete(`/trips/${id}`);
  },
};

// Category API endpoints
export const categoryAPI = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },

  // Get trips by category
  getTripsByCategory: async (categoryId: string, page = 1, pageSize = 12): Promise<PaginatedResponse<Trip>> => {
    const response = await api.get<PaginatedResponse<Trip>>(`/categories/${categoryId}/trips?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },
};

// Booking API endpoints
export const bookingAPI = {
  // Create new booking
  createBooking: async (bookingData: FormData): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>('/bookings', bookingData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Get booking by ID (for confirmation page)
  getBookingById: async (id: string): Promise<Booking> => {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data.data;
  },

  // Admin only - Get all bookings
  getAllBookings: async (page = 1, pageSize = 20, tripId?: string): Promise<PaginatedResponse<Booking>> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (tripId) params.append('tripId', tripId);

    const response = await api.get<PaginatedResponse<Booking>>(`/bookings?${params}`);
    return response.data;
  },

  // Admin only - Update booking status
  updateBookingStatus: async (id: string, status: 'Confirmed' | 'Cancelled'): Promise<Booking> => {
    const response = await api.put<ApiResponse<Booking>>(`/bookings/${id}/status`, { status });
    return response.data.data;
  },

  // Admin only - Delete booking
  deleteBooking: async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
  },
};

// Media API endpoints
export const mediaAPI = {
  // Upload image to Cloudinary
  uploadImage: async (file: File, folder = 'trips'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await api.post<ApiResponse<{ url: string }>>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.url;
  },

  // Delete image from Cloudinary
  deleteImage: async (publicId: string): Promise<void> => {
    await api.delete(`/media/${publicId}`);
  },

  // Validate YouTube URL
  validateYouTubeUrl: async (url: string): Promise<{ isValid: boolean; videoId?: string }> => {
    const response = await api.post<ApiResponse<{ isValid: boolean; videoId?: string }>>('/media/youtube/validate', { url });
    return response.data.data;
  },
};

// Reports API endpoints (Admin only)
export const reportsAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get<ApiResponse<{
      totalTrips: number;
      activeTrips: number;
      totalBookings: number;
      pendingBookings: number;
      confirmedBookings: number;
      totalRevenue: number;
      upcomingTrips: Trip[];
      riskyTrips: Trip[];
    }>>('/reports/dashboard');
    return response.data.data;
  },

  // Get trip performance report
  getTripPerformance: async (startDate?: Date, endDate?: Date) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());

    const response = await api.get(`/reports/trips?${params}`);
    return response.data.data;
  },

  // Get revenue analysis
  getRevenueAnalysis: async (period: 'week' | 'month' | 'year' = 'month') => {
    const response = await api.get(`/reports/revenue?period=${period}`);
    return response.data.data;
  },
};

// Price calculation utility
export const calculateTripPrice = (
  trip: Trip,
  adultsCount: number,
  children0to4: number,
  children4to6: number,
  children6to12: number,
  roomType: 'Single' | 'Double' | 'Triple'
): number => {
  const basePrice = 
    (adultsCount * trip.priceAdult) +
    (children0to4 * trip.priceChild0to4) +
    (children4to6 * trip.priceChild4to6) +
    (children6to12 * trip.priceChild6to12);

  const roomTypeExtra = trip.roomTypes.find(rt => rt.type === roomType)?.extraCost || 0;
  
  return basePrice + roomTypeExtra;
};

// Helper function to create FormData for booking
export const createBookingFormData = (booking: BookingForm, tripId: string): FormData => {
  const formData = new FormData();
  
  formData.append('tripId', tripId);
  formData.append('clientName', booking.clientName);
  formData.append('adultsCount', booking.adultsCount.toString());
  formData.append('children0to4', booking.children0to4.toString());
  formData.append('children4to6', booking.children4to6.toString());
  formData.append('children6to12', booking.children6to12.toString());
  formData.append('phone', booking.phone);
  formData.append('whatsApp', booking.whatsApp);
  formData.append('roomType', booking.roomType);
  
  if (booking.specialRequests) {
    formData.append('specialRequests', booking.specialRequests);
  }

  // Add ID images if provided
  if (booking.idImages && booking.idImages.length > 0) {
    Array.from(booking.idImages).forEach((file) => {
      formData.append(`idImages`, file);
    });
  }

  return formData;
};

export default api;

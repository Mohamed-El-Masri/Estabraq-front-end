import { useState } from 'react';
import { bookingsAPI, BookingRequest, Booking, PaginatedApiResponse } from '../services/estabraqAPI';

export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: BookingRequest): Promise<{ success: boolean; message: string; booking?: Booking }> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await bookingsAPI.create(bookingData);
      
      if (response.success) {
        return { 
          success: true, 
          message: 'تم إنشاء الحجز بنجاح', 
          booking: response.data 
        };
      } else {
        setError(response.message);
        return { success: false, message: response.message || 'فشل في إنشاء الحجز' };
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'حدث خطأ أثناء إنشاء الحجز';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    loading,
    error,
  };
};

export const useMyBookings = (page = 1, pageSize = 10, status?: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: PaginatedApiResponse<Booking> = await bookingsAPI.getMyBookings(
        page,
        pageSize,
        status
      );

      if (response.success) {
        setBookings(response.data.items);
        setTotalCount(response.data.totalCount);
        setTotalPages(Math.ceil(response.data.totalCount / pageSize));
      } else {
        setError(response.message || 'Failed to fetch bookings');
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await bookingsAPI.cancel(id);
      
      if (response.success) {
        // Refresh bookings after cancellation
        await fetchBookings();
        return { success: true, message: 'تم إلغاء الحجز بنجاح' };
      } else {
        return { success: false, message: response.message || 'فشل في إلغاء الحجز' };
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'حدث خطأ أثناء إلغاء الحجز';
      return { success: false, message: errorMessage };
    }
  };

  return {
    bookings,
    loading,
    error,
    totalCount,
    totalPages,
    fetchBookings,
    cancelBooking,
  };
};

export const useBooking = (id: number) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await bookingsAPI.getById(id);

      if (response.success) {
        setBooking(response.data);
      } else {
        setError(response.message || 'Booking not found');
      }
    } catch (err: any) {
      console.error('Error fetching booking:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch booking');
    } finally {
      setLoading(false);
    }
  };

  return {
    booking,
    loading,
    error,
    refetch: fetchBooking,
  };
};

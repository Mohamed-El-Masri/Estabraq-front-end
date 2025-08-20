// Trip related types
export interface Trip {
  id: number;
  titleAr: string;
  titleEn: string;
  mainImageUrl: string;
  deadline: Date;
  startDate: Date;
  startLocation: string;
  descriptionAr: string;
  descriptionEn: string;
  accommodation: string;
  gallery: string[];
  youtubeVideoUrl?: string;
  requiredCount: number;
  remainingCount: number;
  priceAdult: number;
  priceChild0to4: number;
  priceChild4to6: number;
  priceChild6to12: number;
  mealsIncluded: boolean;
  categoryId: number;
  category: Category;
  roomTypes: RoomType[];
  program: TripProgram[];
  status: TripStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  nameAr: string;
  nameEn: string;
  colorTheme: string;
  icon: string;
  description?: string;
}

export interface RoomType {
  id: string;
  type: 'Single' | 'Double' | 'Triple';
  extraCost: number;
}

export interface TripProgram {
  id: string;
  day: number;
  fromTime: string;
  toTime: string;
  descriptionAr: string;
  descriptionEn: string;
}

export enum TripStatus {
  Active = 'Active',
  FullyBooked = 'FullyBooked',
  Cancelled = 'Cancelled',
  Completed = 'Completed'
}

// Booking related types
export interface Booking {
  id: string;
  tripId: string;
  trip?: Trip;
  clientName: string;
  adultsCount: number;
  children0to4: number;
  children4to6: number;
  children6to12: number;
  phone: string;
  whatsApp: string;
  idImages: string[];
  roomType: 'Single' | 'Double' | 'Triple';
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled'
}

// Form types
export interface BookingForm {
  clientName: string;
  adultsCount: number;
  children0to4: number;
  children4to6: number;
  children6to12: number;
  phone: string;
  whatsApp: string;
  roomType: 'Single' | 'Double' | 'Triple';
  specialRequests?: string;
  idImages?: FileList;
}

export interface TripFilters {
  categoryId?: number | null;
  minPrice?: number;
  maxPrice?: number;
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Language and UI types
export type Language = 'ar' | 'en';

export interface UIState {
  language: Language;
  theme: 'light' | 'dark';
  isLoading: boolean;
}

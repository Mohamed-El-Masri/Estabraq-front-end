import { 
  Trip as APITrip, 
  Category as APICategory 
} from '../services/estabraqAPI';
import { 
  Trip as LocalTrip, 
  Category as LocalCategory,
  TripStatus 
} from '../types';

// Map API Category to Local Category
export const mapAPICategory = (apiCategory: APICategory): LocalCategory => {
  return {
    id: apiCategory.id,
    nameAr: apiCategory.nameAr || apiCategory.name || 'غير محدد',
    nameEn: apiCategory.name || apiCategory.nameAr || 'Not specified',
    colorTheme: '#007bff', // Default blue color
    icon: 'fa-map-marker-alt', // Default icon
    description: apiCategory.description,
  };
};

// Map API Trip to Local Trip
export const mapAPITrip = (apiTrip: APITrip): LocalTrip => {
  return {
    id: apiTrip.id,
    titleAr: apiTrip.titleAr || apiTrip.title || 'غير محدد',
    titleEn: apiTrip.title || apiTrip.titleAr || 'Not specified',
    mainImageUrl: apiTrip.imageUrl || '/images/default-trip.jpg',
    deadline: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)), // 30 days from now as default
    startDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)), // 7 days from now as default
    startLocation: apiTrip.locationAr || apiTrip.location || 'غير محدد',
    descriptionAr: apiTrip.descriptionAr || apiTrip.description || 'لا يوجد وصف',
    descriptionEn: apiTrip.description || apiTrip.descriptionAr || 'No description',
    accommodation: 'غير محدد', // Default accommodation
    gallery: apiTrip.images || [], // Use images array if available
    youtubeVideoUrl: undefined,
    requiredCount: apiTrip.maxParticipants || 0,
    remainingCount: apiTrip.maxParticipants || 0, // Since we don't have current participants
    priceAdult: apiTrip.price || 0,
    priceChild0to4: 0, // Default child prices
    priceChild4to6: 0,
    priceChild6to12: 0,
    mealsIncluded: false, // Default meals
    categoryId: apiTrip.category?.id || 0,
    category: apiTrip.category ? {
      id: apiTrip.category.id,
      nameAr: apiTrip.category.nameAr || apiTrip.category.name || 'غير محدد',
      nameEn: apiTrip.category.name || apiTrip.category.nameAr || 'Not specified',
      colorTheme: '#007bff', // Default blue color
      icon: 'fa-map-marker-alt', // Default icon
    } : {
      id: 0,
      nameAr: 'غير محدد',
      nameEn: 'Not specified',
      colorTheme: '#007bff',
      icon: 'fa-map-marker-alt',
    },
    roomTypes: [], // Empty room types for now
    program: [], // Empty program for now
    status: 'Active' as TripStatus, // Default status
    createdAt: new Date(apiTrip.createdAt || Date.now()),
    updatedAt: new Date(apiTrip.createdAt || Date.now()), // Use createdAt as fallback
  };
};

// Map array of API trips to local trips
export const mapAPITrips = (apiTrips: APITrip[]): LocalTrip[] => {
  return apiTrips.map(mapAPITrip);
};

// Map array of API categories to local categories
export const mapAPICategories = (apiCategories: APICategory[]): LocalCategory[] => {
  return apiCategories.map(mapAPICategory);
};

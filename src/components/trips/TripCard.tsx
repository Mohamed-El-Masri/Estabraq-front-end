import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Trip } from '../../types';
import './TripCard.css';

interface TripCardProps {
  trip: Trip;
  onViewDetails: (tripId: number) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onViewDetails }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Safety check
  if (!trip) {
    return null;
  }

  // Get category badge class
  const getCategoryBadgeClass = (categoryName: string): string => {
    const name = categoryName.toLowerCase();
    if (name.includes('beach') || name.includes('بحر')) return 'badge-beach';
    if (name.includes('nile') || name.includes('نيل')) return 'badge-nile';
    if (name.includes('desert') || name.includes('صحرا')) return 'badge-desert';
    if (name.includes('cultural') || name.includes('ثقاف')) return 'badge-cultural';
    if (name.includes('day') || name.includes('يوم')) return 'badge-day';
    if (name.includes('festival') || name.includes('مهرجان')) return 'badge-festival';
    return 'badge-beach'; // default
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get trip status
  const getStatusBadge = () => {
    if (trip.remainingCount <= 0) {
      return (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          {t('trip.fullyBooked')}
        </Badge>
      );
    }
    
    if (trip.status === 'Cancelled') {
      return (
        <Badge bg="secondary" className="position-absolute top-0 end-0 m-2">
          {t('trip.cancelled')}
        </Badge>
      );
    }

    return null;
  };

  // Default image data URL for when imageUrl is missing or fails to load
  const defaultImageUrl = "data:image/svg+xml,%3Csvg width='400' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial, sans-serif' font-size='16' text-anchor='middle' fill='%236c757d'%3E%D8%B5%D9%88%D8%B1%D8%A9 %D8%A7%D9%84%D8%B1%D8%AD%D9%84%D8%A9%3C/text%3E%3Ctext x='50%25' y='60%25' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='%23adb5bd'%3ETrip Image%3C/text%3E%3C/svg%3E";

  const tripTitle = isArabic ? trip.titleAr : trip.titleEn;
  const categoryName = isArabic ? trip.category.nameAr : trip.category.nameEn;

  return (
    <Card className="h-100 trip-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={trip.mainImageUrl || defaultImageUrl} 
          alt={tripTitle}
          className="card-img-top"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImageUrl;
          }}
        />
        {getStatusBadge()}
      </div>
      
      <Card.Body className="d-flex flex-column">
        {/* Category Badge */}
        <div className="mb-2">
          <Badge className={`${getCategoryBadgeClass(categoryName)} me-2`}>
            {categoryName}
        </Badge>
        <Badge className="remaining-seats">
          {t('trip.remaining')}: {trip.remainingCount}
          </Badge>
        </div>

        {/* Trip Title */}
        <Card.Title className="h5 mb-2">
          {tripTitle}
        </Card.Title>

        {/* Start Location & Date */}
        <Card.Text className="trip-location mb-2">
          <i className="bi bi-geo-alt me-1"></i>
          {trip.startLocation}
        </Card.Text>

        <Card.Text className="small text-muted mb-2">
          <i className="bi bi-calendar-event me-1"></i>
          {formatDate(trip.startDate)}
        </Card.Text>

        {/* Deadline warning */}
        {new Date(trip.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
          <Card.Text className="small text-warning mb-2">
            <i className="bi bi-exclamation-triangle me-1"></i>
            {t('trip.deadline')}: {formatDate(trip.deadline)}
          </Card.Text>
        )}

        {/* Price */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="trip-price">
                {trip.priceAdult} {t('pricing.egp')}
              </span>
              <br />
              <small className="text-muted">{t('pricing.adult')}</small>
            </div>
            
            {trip.mealsIncluded && (
              <Badge bg="success" className="ms-2">
                <i className="bi bi-check-circle me-1"></i>
                {t('trip.mealsIncluded')}
              </Badge>
            )}
          </div>

          {/* Action Button */}
          <Button 
            variant="primary" 
            className="w-100"
            onClick={() => onViewDetails(trip.id)}
            disabled={trip.remainingCount <= 0 || trip.status === 'Cancelled'}
          >
            {trip.remainingCount <= 0 ? 
              t('trip.fullyBooked') : 
              t('trip.viewDetails')
            }
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TripCard;

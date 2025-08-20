import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Trip } from '../../types';
import './TripStats.css';

interface TripStatsProps {
  trip: Trip;
  className?: string;
}

const TripStats: React.FC<TripStatsProps> = ({ trip, className = '' }) => {
  const { t } = useTranslation();

  const calculateDaysLeft = () => {
    const now = new Date();
    const deadline = new Date(trip.deadline);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getAvailabilityPercentage = () => {
    if (trip.requiredCount === 0) return 0;
    return ((trip.requiredCount - trip.remainingCount) / trip.requiredCount) * 100;
  };

  const getAvailabilityStatus = () => {
    const percentage = getAvailabilityPercentage();
    if (percentage >= 90) return { variant: 'danger', text: t('trip.almostFull', 'ممتلئة تقريباً') };
    if (percentage >= 70) return { variant: 'warning', text: t('trip.fillingFast', 'تمتلئ بسرعة') };
    if (percentage >= 50) return { variant: 'info', text: t('trip.halfFull', 'نصف ممتلئة') };
    return { variant: 'success', text: t('trip.available', 'متاحة') };
  };

  const daysLeft = calculateDaysLeft();
  const availabilityStatus = getAvailabilityStatus();

  return (
    <div className={`trip-stats ${className}`}>
      <Card className="stats-card">
        <Card.Header className="stats-header">
          <h5 className="mb-0">
            <i className="bi bi-graph-up me-2"></i>
            {t('trip.statistics', 'إحصائيات الرحلة')}
          </h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {/* الأماكن المتاحة */}
            <Col md={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="stat-content">
                  <h6 className="stat-title">
                    {t('trip.availableSpots', 'الأماكن المتاحة')}
                  </h6>
                  <div className="stat-value">
                    <span className="remaining">{trip.remainingCount}</span>
                    <span className="total"> / {trip.requiredCount}</span>
                  </div>
                  <Badge bg={availabilityStatus.variant} className="mt-1">
                    {availabilityStatus.text}
                  </Badge>
                </div>
              </div>
            </Col>

            {/* الأيام المتبقية */}
            <Col md={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div className="stat-content">
                  <h6 className="stat-title">
                    {t('trip.daysLeft', 'الأيام المتبقية للحجز')}
                  </h6>
                  <div className="stat-value">
                    <span className={`days ${daysLeft <= 7 ? 'urgent' : ''}`}>
                      {daysLeft}
                    </span>
                    <span className="unit"> {t('common.days', 'يوم')}</span>
                  </div>
                  {daysLeft <= 7 && daysLeft > 0 && (
                    <Badge bg="danger" className="mt-1">
                      {t('trip.hurryUp', 'أسرع!')}
                    </Badge>
                  )}
                  {daysLeft === 0 && (
                    <Badge bg="dark" className="mt-1">
                      {t('trip.closed', 'مغلق')}
                    </Badge>
                  )}
                </div>
              </div>
            </Col>

            {/* تاريخ الرحلة */}
            <Col md={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-calendar-event"></i>
                </div>
                <div className="stat-content">
                  <h6 className="stat-title">
                    {t('trip.startDate', 'تاريخ بداية الرحلة')}
                  </h6>
                  <div className="stat-value">
                    {new Intl.DateTimeFormat('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(new Date(trip.startDate))}
                  </div>
                </div>
              </div>
            </Col>

            {/* السعر */}
            <Col md={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-currency-exchange"></i>
                </div>
                <div className="stat-content">
                  <h6 className="stat-title">
                    {t('trip.priceAdult', 'سعر البالغين')}
                  </h6>
                  <div className="stat-value price">
                    <span className="amount">{trip.priceAdult.toLocaleString()}</span>
                    <span className="currency"> {t('common.currency', 'ج.م')}</span>
                  </div>
                </div>
              </div>
            </Col>

            {/* حالة الوجبات */}
            <Col md={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-cup-hot"></i>
                </div>
                <div className="stat-content">
                  <h6 className="stat-title">
                    {t('trip.meals', 'الوجبات')}
                  </h6>
                  <div className="stat-value">
                    <Badge bg={trip.mealsIncluded ? 'success' : 'secondary'}>
                      {trip.mealsIncluded 
                        ? t('trip.mealsIncluded', 'مشمولة') 
                        : t('trip.mealsNotIncluded', 'غير مشمولة')
                      }
                    </Badge>
                  </div>
                </div>
              </div>
            </Col>

            {/* المكان */}
            <Col md={6}>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div className="stat-content">
                  <h6 className="stat-title">
                    {t('trip.startLocation', 'نقطة الانطلاق')}
                  </h6>
                  <div className="stat-value location">
                    {trip.startLocation}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TripStats;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TripStats from '../components/trips/TripStats';
import TripReviews from '../components/trips/TripReviews';
import { TripStatus } from '../types';
import './TripDetails.css';

const TripDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const trip = {
    id: parseInt(id || '1'),
    titleAr: 'رحلة إلى الأهرامات والمتحف المصري',
    titleEn: 'Pyramids and Egyptian Museum Trip',
    mainImageUrl: 'https://via.placeholder.com/800x400/1ABC9C/FFFFFF?text=Pyramids+Trip',
    deadline: new Date('2024-12-31'),
    startDate: new Date('2024-01-15'),
    startLocation: 'القاهرة - فندق رمسيس هيلتون',
    descriptionAr: 'استكشف عجائب مصر القديمة في رحلة مذهلة إلى أهرامات الجيزة والمتحف المصري. تشمل الرحلة زيارة الهرم الأكبر وأبو الهول والمتحف المصري مع مرشد سياحي متخصص.',
    descriptionEn: 'Explore the wonders of ancient Egypt on an amazing trip to the Giza Pyramids and Egyptian Museum. The trip includes visits to the Great Pyramid, Sphinx, and Egyptian Museum with a specialized tour guide.',
    accommodation: 'غير مطلوب - رحلة يوم واحد',
    gallery: ['image1.jpg', 'image2.jpg'],
    youtubeVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    requiredCount: 15,
    remainingCount: 7,
    priceAdult: 1200,
    priceChild0to4: 0,
    priceChild4to6: 600,
    priceChild6to12: 900,
    mealsIncluded: true,
    categoryId: 1,
    category: { 
      id: 1, 
      nameAr: 'التاريخ والأثار', 
      nameEn: 'History & Archaeology',
      descriptionAr: 'رحلات تاريخية وأثرية',
      descriptionEn: 'Historical and archaeological trips',
      colorTheme: '#1ABC9C',
      iconName: 'building',
      icon: 'bi-building',
      isActive: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    roomTypes: [],
    program: [],
    status: TripStatus.Active,
    createdAt: new Date(),
    updatedAt: new Date(),
    // Additional legacy properties for compatibility
    price: 1200,
    duration: 8,
    maxParticipants: 15,
    currentParticipants: 8,
    imageUrl: 'https://via.placeholder.com/800x400/1ABC9C/FFFFFF?text=Pyramids+Trip',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    included: [
      'النقل من وإلى الفندق',
      'مرشد سياحي متخصص',
      'رسوم دخول المواقع',
      'وجبة غداء',
      'مياه معدنية'
    ],
    notIncluded: [
      'المشروبات الإضافية',
      'التسوق الشخصي',
      'البقشيش'
    ],
    itinerary: [
      { time: '08:00', activity: 'الانطلاق من الفندق' },
      { time: '09:30', activity: 'الوصول إلى أهرامات الجيزة' },
      { time: '12:00', activity: 'زيارة أبو الهول' },
      { time: '13:30', activity: 'وجبة الغداء' },
      { time: '15:00', activity: 'زيارة المتحف المصري' },
      { time: '17:00', activity: 'العودة إلى الفندق' }
    ]
  };

  const handleBookNow = () => {
    navigate(`/booking/${trip.id}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: 'أحمد محمد',
      rating: 5,
      comment: 'رحلة رائعة ومنظمة بشكل ممتاز! المرشد السياحي كان محترف جداً والمعلومات التاريخية مفيدة. أنصح الجميع بتجربة هذه الرحلة.',
      date: new Date('2024-11-15'),
      tripId: trip.id
    },
    {
      id: 2,
      userName: 'فاطمة علي',
      rating: 4,
      comment: 'تجربة جميلة جداً، الأهرامات مذهلة والمتحف المصري غني بالآثار. فقط أتمنى لو كان الوقت أطول قليلاً.',
      date: new Date('2024-10-28'),
      tripId: trip.id
    }
  ];

  return (
    <div className="trip-details-page">
      {/* Hero Section */}
      <section className="trip-hero">
        <div className="trip-hero-image">
          <img src={trip.imageUrl} alt={trip.titleAr} />
          <div className="trip-hero-overlay">
            <Container>
              <Row>
                <Col>
                  <div className="trip-hero-content">
                    <Button 
                      variant="outline-light" 
                      className="back-button mb-3"
                      onClick={handleGoBack}
                    >
                      <i className="bi bi-arrow-right me-2"></i>
                      {t('common.back', 'رجوع')}
                    </Button>
                    <h1 className="trip-title">
                      {t('lang') === 'ar' ? trip.titleAr : trip.titleEn}
                    </h1>
                    <div className="trip-meta">
                      <Badge bg="primary" className="me-2">
                        {t('lang') === 'ar' ? trip.category.nameAr : trip.category.nameEn}
                      </Badge>
                      <span className="trip-duration">
                        <i className="bi bi-clock me-1"></i>
                        {trip.duration} {t('trip.hours', 'ساعات')}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="trip-content">
        <Container>
          <Row>
            {/* Left Column - Details */}
            <Col lg={8}>
              {/* Description */}
              <Card className="mb-4">
                <Card.Body>
                  <h3 className="section-title mb-3">
                    {t('trip.description', 'وصف الرحلة')}
                  </h3>
                  <p className="trip-description">
                    {t('lang') === 'ar' ? trip.descriptionAr : trip.descriptionEn}
                  </p>
                </Card.Body>
              </Card>

              {/* Video */}
              {trip.videoUrl && (
                <Card className="mb-4">
                  <Card.Body>
                    <h3 className="section-title mb-3">
                      {t('trip.preview', 'معاينة الرحلة')}
                    </h3>
                    <div className="video-container">
                      <iframe
                        src={trip.videoUrl}
                        title="Trip Preview"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Card.Body>
                </Card>
              )}

              {/* What's Included */}
              <Card className="mb-4">
                <Card.Body>
                  <h3 className="section-title mb-3">
                    {t('trip.included', 'ما هو مشمول')}
                  </h3>
                  <Row>
                    <Col md={6}>
                      <h5 className="text-success mb-3">
                        <i className="bi bi-check-circle me-2"></i>
                        {t('trip.included', 'مشمول')}
                      </h5>
                      <ul className="included-list">
                        {trip.included.map((item, index) => (
                          <li key={index}>
                            <i className="bi bi-check text-success me-2"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h5 className="text-danger mb-3">
                        <i className="bi bi-x-circle me-2"></i>
                        {t('trip.notIncluded', 'غير مشمول')}
                      </h5>
                      <ul className="not-included-list">
                        {trip.notIncluded.map((item, index) => (
                          <li key={index}>
                            <i className="bi bi-x text-danger me-2"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Itinerary */}
              <Card className="mb-4">
                <Card.Body>
                  <h3 className="section-title mb-3">
                    {t('trip.itinerary', 'جدول الرحلة')}
                  </h3>
                  <div className="itinerary-list">
                    {trip.itinerary.map((item, index) => (
                      <div key={index} className="itinerary-item">
                        <div className="itinerary-time">
                          <Badge bg="outline-primary">{item.time}</Badge>
                        </div>
                        <div className="itinerary-activity">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column - Booking */}
            <Col lg={4}>
              <div className="booking-sidebar">
                <Card className="booking-card">
                  <Card.Body>
                    <div className="price-section mb-4">
                      <div className="price">
                        <span className="currency">EGP</span>
                        <span className="amount">{trip.price.toLocaleString()}</span>
                        <span className="period">/{t('trip.perPerson', 'للشخص')}</span>
                      </div>
                    </div>

                    <div className="trip-stats mb-4">
                      <div className="stat-item">
                        <div className="stat-label">
                          {t('trip.duration', 'المدة')}
                        </div>
                        <div className="stat-value">
                          {trip.duration} {t('trip.hours', 'ساعات')}
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">
                          {t('trip.participants', 'المشاركين')}
                        </div>
                        <div className="stat-value">
                          {trip.currentParticipants}/{trip.maxParticipants}
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">
                          {t('trip.availability', 'التوفر')}
                        </div>
                        <div className="stat-value">
                          <Badge 
                            bg={trip.status === TripStatus.Active ? 'success' : 'danger'}
                          >
                            {trip.status === TripStatus.Active 
                              ? t('trip.available', 'متاح') 
                              : t('trip.full', 'مكتمل')
                            }
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="book-button w-100"
                      onClick={handleBookNow}
                      disabled={trip.status !== TripStatus.Active}
                    >
                      {trip.status === TripStatus.Active 
                        ? t('trip.bookNow', 'احجز الآن') 
                        : t('trip.fullyBooked', 'مكتمل الحجز')
                      }
                    </Button>

                    <div className="booking-notes mt-3">
                      <small className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        {t('booking.note', 'يمكنك إلغاء الحجز مجاناً حتى 24 ساعة قبل الرحلة')}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trip Statistics */}
      <TripStats trip={trip} />

      {/* Trip Reviews */}
      <TripReviews
        reviews={mockReviews}
        averageRating={4.5}
        totalReviews={mockReviews.length}
      />
    </div>
  );
};

export default TripDetailsPage;

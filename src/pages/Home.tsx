import React, { useState } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Components
import TripCard from '../components/trips/TripCard';
import CategoryFilter from '../components/trips/CategoryFilter';
import HeroSection from '../components/common/HeroSection';
import SiteStats from '../components/common/SiteStats';
import Testimonials from '../components/common/Testimonials';
import QuickContact from '../components/common/QuickContact';

// Styles
import './Home.css';

// Hooks
import { useFeaturedTrips } from '../hooks/useTrips';
import { useActiveCategories } from '../hooks/useCategories';

// Utils for mapping API data to local types
import { mapAPITrips, mapAPICategories } from '../utils/apiMappers';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch featured trips and categories using React Query
  const { data: featuredTripsData, isLoading: tripsLoading, error: tripsError } = useFeaturedTrips(6);
  const { data: categoriesData, isLoading: categoriesLoading } = useActiveCategories();

  // Extract and map data from React Query response
  const featuredTrips = featuredTripsData ? mapAPITrips(featuredTripsData) : [];
  const categories = categoriesData?.categories ? mapAPICategories(categoriesData.categories) : [];

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      navigate(`/trips?category=${categoryId}`);
    } else {
      navigate('/trips');
    }
  };

  const handleViewDetails = (tripId: number) => {
    navigate(`/trips/${tripId}`);
  };

  const handleViewAllTrips = () => {
    navigate('/trips');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-5 categories-section" id="categories">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 fade-in">
                <h2 className="display-5 fw-bold text-turquoise mb-3">
                  {t('navigation.categories')}
                </h2>
                <p className="lead text-muted">
                  {t('categories.description', 'اختر نوع الرحلة المناسبة لك')}
                </p>
              </div>

              {categoriesLoading ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <div className="fade-in">
                  <CategoryFilter
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                    showAll={true}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Trips Section */}
      <section className="py-5 featured-trips-section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 fade-in">
                <h2 className="display-5 fw-bold text-orange mb-3">
                  {t('trip.featured', 'الرحلات المميزة')}
                </h2>
                <p className="lead text-muted">
                  {t('trip.featuredDescription', 'اكتشف أجمل الوجهات السياحية في مصر')}
                </p>
              </div>
            </Col>
          </Row>

          {tripsLoading ? (
            <Row>
              <Col lg={12} className="text-center">
                <div className="loading-spinner">
                  <Spinner animation="border" className="spinner-border-custom" />
                  <p className="mt-3">{t('common.loading')}</p>
                </div>
              </Col>
            </Row>
          ) : tripsError ? (
            <Row>
              <Col lg={12}>
                <Alert variant="danger" className="text-center">
                  <h5>{t('errors.loadingError', 'خطأ في تحميل الرحلات')}</h5>
                  <p>{t('errors.tryAgain', 'يرجى المحاولة مرة أخرى')}</p>
                  <Button variant="outline-danger" onClick={() => window.location.reload()}>
                    {t('common.retry', 'إعادة المحاولة')}
                  </Button>
                </Alert>
              </Col>
            </Row>
          ) : featuredTrips && featuredTrips.length > 0 ? (
            <>
              <Row className="g-4 featured-trips-grid">
                {featuredTrips.map((trip) => (
                  <Col key={trip.id} lg={4} md={6} className="trip-card-wrapper">
                    <TripCard
                      trip={trip}
                      onViewDetails={handleViewDetails}
                    />
                  </Col>
                ))}
              </Row>

              {/* View All Trips Button */}
              <div className="view-all-section">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleViewAllTrips}
                  className="view-all-btn"
                >
                  {t('trip.viewAllTrips', 'عرض جميع الرحلات')}
                  <i className="bi bi-arrow-left ms-2"></i>
                </Button>
              </div>
            </>
          ) : (
            <Row>
              <Col lg={12} className="text-center">
                <Alert variant="info">
                  <i className="bi bi-info-circle me-2"></i>
                  {t('trip.noTripsAvailable', 'لا توجد رحلات متاحة حالياً')}
                </Alert>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="cta-content">
                <h3 className="mb-3">
                  {t('cta.title', 'جاهز لخوض مغامرتك القادمة؟')}
                </h3>
                <p className="mb-0">
                  {t('cta.description', 'اكتشف أجمل الوجهات السياحية في مصر واحجز رحلتك اليوم')}
                </p>
              </div>
            </Col>
            <Col lg={4} className="text-end">
              <Button
                variant="light"
                size="lg"
                onClick={handleViewAllTrips}
                className="cta-button"
              >
                {t('cta.bookNow', 'احجز الآن')}
                <i className="bi bi-arrow-left ms-2"></i>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col lg={12} className="mb-5">
              <h2 className="display-6 fw-bold text-navy mb-3">
                {t('features.title', 'لماذا تختار استبرق للسياحة؟')}
              </h2>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-shield-check display-4 text-turquoise"></i>
                </div>
                <h5 className="fw-bold mb-3">
                  {t('features.safety', 'الأمان والموثوقية')}
                </h5>
                <p className="text-muted">
                  {t('features.safetyDesc', 'نضمن لك رحلة آمنة ومريحة مع أفضل الخدمات')}
                </p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-currency-dollar display-4 text-orange"></i>
                </div>
                <h5 className="fw-bold mb-3">
                  {t('features.pricing', 'أسعار تنافسية')}
                </h5>
                <p className="text-muted">
                  {t('features.pricingDesc', 'أفضل الأسعار في السوق مع خدمات عالية الجودة')}
                </p>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-headset display-4 text-yellow"></i>
                </div>
                <h5 className="fw-bold mb-3">
                  {t('features.support', 'دعم على مدار الساعة')}
                </h5>
                <p className="text-muted">
                  {t('features.supportDesc', 'فريق دعم متاح لمساعدتك في أي وقت')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Site Statistics */}
      <SiteStats />

      {/* Testimonials */}
      <Testimonials />

      {/* Quick Contact */}
      <QuickContact />
    </div>
  );
};

export default HomePage;

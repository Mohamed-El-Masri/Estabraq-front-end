import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

interface HeroSectionProps {
  variant?: 'home' | 'page';
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  variant = 'home',
  title,
  subtitle,
  showSearch = true,
  backgroundImage
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero background images for slideshow
  const heroImages = [
    'https://images.unsplash.com/photo-1539650116574-75c0c6d0bf12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Pyramids
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Red Sea
    'https://images.unsplash.com/photo-1631004709812-db90cb1c3999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Aswan
    'https://images.unsplash.com/photo-1571591992961-d2b2aa7a8bb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Luxor
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'  // White Desert
  ];

  // Auto-slide effect for home hero
  useEffect(() => {
    if (variant === 'home') {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [variant, heroImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/trips?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleExploreTrips = () => {
    navigate('/trips');
  };

  const currentBackgroundImage = backgroundImage || heroImages[currentImageIndex];

  if (variant === 'page') {
    return (
      <section 
        className="hero-section hero-page"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentBackgroundImage})`
        }}
      >
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={12} className="text-center">
              <div className="hero-content fade-in">
                <h1 className="hero-title">
                  {title || t('hero.defaultPageTitle', 'استبرق للسياحة')}
                </h1>
                {subtitle && (
                  <p className="hero-subtitle">
                    {subtitle}
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section 
      className="hero-section hero-home"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${currentBackgroundImage})`
      }}
    >
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={12} className="text-center">
            <div className="hero-content">
              <h1 className="hero-title slide-up">
                {title || t('hero.title', 'اكتشف جمال مصر مع استبرق للسياحة')}
              </h1>
              
              <p className="hero-subtitle slide-up">
                {subtitle || t('hero.subtitle', 'أفضل الرحلات السياحية في مصر بأسعار تنافسية وخدمة متميزة')}
              </p>

              {showSearch && (
                <div className="hero-search slide-up">
                  <Form onSubmit={handleSearch} className="search-form">
                    <InputGroup size="lg" className="search-input-group">
                      <Form.Control
                        type="text"
                        placeholder={t('hero.searchPlaceholder', 'ابحث عن رحلتك المفضلة...')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                      <Button 
                        variant="primary" 
                        type="submit"
                        className="search-btn"
                      >
                        <i className="bi bi-search"></i>
                        <span className="d-none d-md-inline ms-2">
                          {t('common.search', 'بحث')}
                        </span>
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              )}

              <div className="hero-actions slide-up">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleExploreTrips}
                  className="hero-btn me-3"
                >
                  {t('hero.exploreTrips', 'استكشف الرحلات')}
                  <i className="bi bi-arrow-left ms-2"></i>
                </Button>

                <Button 
                  variant="outline-light" 
                  size="lg"
                  href="#features"
                  className="hero-btn-secondary"
                >
                  {t('hero.learnMore', 'اعرف أكثر')}
                  <i className="bi bi-chevron-down ms-2"></i>
                </Button>
              </div>

              {/* Stats Section */}
              <div className="hero-stats slide-up">
                <Row className="text-center">
                  <Col md={3} sm={6} xs={6}>
                    <div className="stat-item">
                      <h3 className="stat-number">500+</h3>
                      <p className="stat-label">{t('hero.stats.trips', 'رحلة منظمة')}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6} xs={6}>
                    <div className="stat-item">
                      <h3 className="stat-number">2000+</h3>
                      <p className="stat-label">{t('hero.stats.customers', 'عميل سعيد')}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6} xs={6}>
                    <div className="stat-item">
                      <h3 className="stat-number">15+</h3>
                      <p className="stat-label">{t('hero.stats.destinations', 'وجهة سياحية')}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6} xs={6}>
                    <div className="stat-item">
                      <h3 className="stat-number">5</h3>
                      <p className="stat-label">{t('hero.stats.years', 'سنوات خبرة')}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Image Indicators */}
      <div className="hero-indicators">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Arrow */}
      <div className="scroll-indicator">
        <a href="#categories" className="scroll-arrow">
          <i className="bi bi-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

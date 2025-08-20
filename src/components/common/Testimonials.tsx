import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
  tripName: string;
  date: string;
}

interface TestimonialsProps {
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'أحمد محمد',
      location: 'القاهرة',
      rating: 5,
      comment: 'رحلة رائعة ومنظمة بشكل ممتاز. الفريق محترف جداً والأماكن التي زرناها كانت مذهلة. أنصح الجميع بتجربة خدمات أسطبرق للسياحة.',
      tripName: 'رحلة الأهرامات والمتحف المصري',
      date: '2024-12-15'
    },
    {
      id: 2,
      name: 'فاطمة علي',
      location: 'الإسكندرية',
      rating: 5,
      comment: 'تجربة لا تُنسى! الإرشاد السياحي كان ممتازاً والمعلومات التاريخية مفيدة جداً. سأحجز رحلة أخرى قريباً بإذن الله.',
      tripName: 'رحلة الأقصر وأسوان',
      date: '2024-11-28'
    },
    {
      id: 3,
      name: 'عمر حسن',
      location: 'المنصورة',
      rating: 4,
      comment: 'خدمة ممتازة وأسعار معقولة. الرحلة كانت مليئة بالمعلومات المفيدة والأنشطة الممتعة. فقط أتمنى لو كانت مدة الرحلة أطول قليلاً.',
      tripName: 'رحلة سيناء والدير',
      date: '2024-10-20'
    },
    {
      id: 4,
      name: 'مريم أحمد',
      location: 'طنطا',
      rating: 5,
      comment: 'أفضل شركة سياحة تعاملت معها! الاهتمام بالتفاصيل والحرص على راحة العملاء شيء مميز. شكراً لكم على هذه التجربة الرائعة.',
      tripName: 'رحلة الساحل الشمالي',
      date: '2024-09-10'
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
        ></i>
      );
    }
    return stars;
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long'
    }).format(new Date(dateString));
  };

  return (
    <section className={`testimonials ${className}`}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="testimonials-title">
              {t('testimonials.title', 'آراء عملائنا')}
            </h2>
            <p className="testimonials-subtitle text-muted">
              {t('testimonials.subtitle', 'تجارب حقيقية من عملائنا الكرام')}
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="testimonial-slider">
              <Card className="testimonial-card">
                <Card.Body className="text-center p-5">
                  {/* Quote Icon */}
                  <div className="quote-icon mb-4">
                    <i className="bi bi-quote"></i>
                  </div>

                  {/* Comment */}
                  <p className="testimonial-comment mb-4">
                    "{testimonials[currentIndex].comment}"
                  </p>

                  {/* Rating */}
                  <div className="testimonial-rating mb-3">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Customer Info */}
                  <div className="customer-info">
                    <div className="customer-avatar mb-3">
                      {testimonials[currentIndex].avatar ? (
                        <img 
                          src={testimonials[currentIndex].avatar} 
                          alt={testimonials[currentIndex].name}
                          className="avatar-img"
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          <i className="bi bi-person-fill"></i>
                        </div>
                      )}
                    </div>
                    <h5 className="customer-name mb-1">
                      {testimonials[currentIndex].name}
                    </h5>
                    <p className="customer-location text-muted mb-2">
                      {testimonials[currentIndex].location}
                    </p>
                    <p className="trip-info">
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {testimonials[currentIndex].tripName}
                        <span className="mx-2">•</span>
                        {formatDate(testimonials[currentIndex].date)}
                      </small>
                    </p>
                  </div>
                </Card.Body>
              </Card>

              {/* Navigation Buttons */}
              <div className="testimonial-nav">
                <Button
                  variant="outline-primary"
                  className="nav-btn prev-btn"
                  onClick={prevTestimonial}
                >
                  <i className="bi bi-chevron-right"></i>
                </Button>
                
                {/* Dots Indicator */}
                <div className="dots-indicator">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => goToTestimonial(index)}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline-primary"
                  className="nav-btn next-btn"
                  onClick={nextTestimonial}
                >
                  <i className="bi bi-chevron-left"></i>
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="mt-5">
          <Col className="text-center">
            <p className="cta-text mb-3">
              {t('testimonials.cta', 'هل تريد أن تكون جزءاً من قصص النجاح؟')}
            </p>
            <Button variant="primary" size="lg" className="cta-button">
              <i className="bi bi-calendar-plus me-2"></i>
              {t('testimonials.ctaButton', 'احجز رحلتك الآن')}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;

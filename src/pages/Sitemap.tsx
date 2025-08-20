import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Sitemap.css';

interface SiteSection {
  title: string;
  icon: string;
  color: string;
  links: {
    label: string;
    path: string;
  }[];
}

const SitemapPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sections: SiteSection[] = [
    {
      title: t('sitemap.main', 'الصفحات الرئيسية'),
      icon: 'bi-house-fill',
      color: '#1ABC9C',
      links: [
        { label: t('navigation.home', 'الرئيسية'), path: '/' },
        { label: t('navigation.trips', 'الرحلات'), path: '/trips' },
        { label: t('navigation.about', 'من نحن'), path: '/about' },
        { label: t('navigation.contact', 'اتصل بنا'), path: '/contact' }
      ]
    },
    {
      title: t('sitemap.trips', 'الرحلات والجولات'),
      icon: 'bi-geo-alt-fill',
      color: '#3498DB',
      links: [
        { label: t('categories.historical', 'الرحلات التاريخية'), path: '/trips?category=1' },
        { label: t('categories.beach', 'رحلات الشواطئ'), path: '/trips?category=2' },
        { label: t('categories.adventure', 'رحلات المغامرة'), path: '/trips?category=3' },
        { label: t('categories.cultural', 'الرحلات الثقافية'), path: '/trips?category=4' },
        { label: t('categories.religious', 'الرحلات الدينية'), path: '/trips?category=5' }
      ]
    },
    {
      title: t('sitemap.services', 'الخدمات'),
      icon: 'bi-gear-fill',
      color: '#E67E22',
      links: [
        { label: t('services.booking', 'حجز الرحلات'), path: '/booking' },
        { label: t('services.customTrips', 'رحلات مخصصة'), path: '/custom-trips' },
        { label: t('services.groupBooking', 'حجز جماعي'), path: '/group-booking' },
        { label: t('services.corporate', 'الرحلات المؤسسية'), path: '/corporate' }
      ]
    },
    {
      title: t('sitemap.support', 'الدعم والمساعدة'),
      icon: 'bi-headset',
      color: '#9B59B6',
      links: [
        { label: t('support.faq', 'الأسئلة الشائعة'), path: '/faq' },
        { label: t('support.terms', 'الشروط والأحكام'), path: '/terms' },
        { label: t('support.privacy', 'سياسة الخصوصية'), path: '/privacy' },
        { label: t('support.cancellation', 'سياسة الإلغاء'), path: '/cancellation' }
      ]
    }
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sitemap-page">
      {/* Page Header */}
      <section className="sitemap-header">
        <Container>
          <Row>
            <Col>
              <div className="header-content text-center">
                <h1 className="page-title">
                  {t('sitemap.title', 'خريطة الموقع')}
                </h1>
                <p className="page-subtitle">
                  {t('sitemap.subtitle', 'استكشف جميع صفحات وخدمات موقعنا')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sitemap Content */}
      <section className="sitemap-content">
        <Container>
          <Row className="g-4">
            {sections.map((section, index) => (
              <Col key={index} lg={6}>
                <Card className="sitemap-card h-100">
                  <Card.Header 
                    className="sitemap-card-header"
                    style={{ backgroundColor: section.color }}
                  >
                    <div className="d-flex align-items-center">
                      <i className={`${section.icon} me-3`} style={{ fontSize: '1.5rem' }}></i>
                      <h5 className="mb-0 text-white">{section.title}</h5>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <ListGroup variant="flush">
                      {section.links.map((link, linkIndex) => (
                        <ListGroup.Item
                          key={linkIndex}
                          action
                          onClick={() => handleLinkClick(link.path)}
                          className="sitemap-link"
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <span>{link.label}</span>
                            <i className="bi bi-arrow-left text-muted"></i>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Additional Info */}
          <Row className="mt-5">
            <Col lg={8} className="mx-auto">
              <Card className="info-card">
                <Card.Body className="text-center p-4">
                  <div className="info-icon mb-3">
                    <i className="bi bi-info-circle-fill"></i>
                  </div>
                  <h5 className="info-title mb-3">
                    {t('sitemap.needHelp', 'تحتاج مساعدة؟')}
                  </h5>
                  <p className="info-text mb-4">
                    {t('sitemap.helpText', 'إذا لم تجد ما تبحث عنه، لا تتردد في التواصل معنا')}
                  </p>
                  <div className="contact-options">
                    <a 
                      href="tel:+201234567890" 
                      className="contact-option me-3"
                    >
                      <i className="bi bi-telephone-fill me-2"></i>
                      {t('contact.phone', 'اتصل بنا')}
                    </a>
                    <a 
                      href="mailto:info@estabraq-tourism.com" 
                      className="contact-option"
                    >
                      <i className="bi bi-envelope-fill me-2"></i>
                      {t('contact.email', 'راسلنا')}
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default SitemapPage;

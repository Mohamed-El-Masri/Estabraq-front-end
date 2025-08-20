import React from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <Container>
          <Row className="g-4">
            {/* Company Info */}
            <Col lg={4} md={6}>
              <div className="footer-section">
                <div className="footer-logo mb-3">
                  <h4 className="fw-bold text-white">
                    <i className="bi bi-compass me-2"></i>
                    استبرق للسياحة
                  </h4>
                  <span className="footer-tagline">
                    {t('footer.tagline', 'رحلات استثنائية في قلب مصر')}
                  </span>
                </div>
                
                <p className="footer-description">
                  {t('footer.description', 
                    'نحن شركة رائدة في تنظيم الرحلات السياحية داخل مصر، نوفر تجارب سياحية لا تُنسى بأعلى معايير الجودة والأمان.'
                  )}
                </p>

                {/* Social Media Links */}
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="YouTube">
                    <i className="bi bi-youtube"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="WhatsApp">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-title">
                  {t('footer.quickLinks', 'روابط سريعة')}
                </h6>
                <ul className="footer-links">
                  <li><a href="/">{t('common.home')}</a></li>
                  <li><a href="/trips">{t('navigation.trips')}</a></li>
                  <li><a href="/categories">{t('navigation.categories')}</a></li>
                  <li><a href="/about">{t('common.about')}</a></li>
                  <li><a href="/contact">{t('common.contact')}</a></li>
                  <li><a href="/sitemap">{t('footer.sitemap', 'خريطة الموقع')}</a></li>
                </ul>
              </div>
            </Col>

            {/* Trip Categories */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-title">
                  {t('footer.categories', 'فئات الرحلات')}
                </h6>
                <ul className="footer-links">
                  <li><a href="/trips?category=beach">{t('categories.beach')}</a></li>
                  <li><a href="/trips?category=nile">{t('categories.nile')}</a></li>
                  <li><a href="/trips?category=desert">{t('categories.desert')}</a></li>
                  <li><a href="/trips?category=cultural">{t('categories.cultural')}</a></li>
                  <li><a href="/trips?category=festivals">{t('categories.festivals')}</a></li>
                </ul>
              </div>
            </Col>

            {/* Contact & Newsletter */}
            <Col lg={4} md={6}>
              <div className="footer-section">
                <h6 className="footer-title">
                  {t('footer.stayConnected', 'ابق على تواصل')}
                </h6>
                
                {/* Contact Info */}
                <div className="contact-info mb-3">
                  <div className="contact-item">
                    <i className="bi bi-telephone-fill me-2"></i>
                    <span dir="ltr">+20 123 456 7890</span>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope-fill me-2"></i>
                    <span>info@estabraq-tourism.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    <span>{t('footer.address', 'القاهرة، مصر')}</span>
                  </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="newsletter">
                  <p className="newsletter-text">
                    {t('footer.newsletterText', 'اشترك للحصول على أحدث العروض')}
                  </p>
                  <Form onSubmit={handleNewsletterSubmit}>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        placeholder={t('footer.emailPlaceholder', 'أدخل بريدك الإلكتروني')}
                        className="newsletter-input"
                        required
                      />
                      <Button 
                        variant="primary" 
                        type="submit"
                        className="newsletter-btn"
                      >
                        <i className="bi bi-send"></i>
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="footer-copyright">
                <p className="mb-0">
                  © {currentYear} {t('footer.copyright', 'استبرق للسياحة. جميع الحقوق محفوظة.')}
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="footer-legal">
                <ul className="legal-links">
                  <li>
                    <a href="/sitemap">
                      {t('footer.sitemap', 'خريطة الموقع')}
                    </a>
                  </li>
                  <li>
                    <a href="/privacy">
                      {t('footer.privacy', 'سياسة الخصوصية')}
                    </a>
                  </li>
                  <li>
                    <a href="/terms">
                      {t('footer.terms', 'الشروط والأحكام')}
                    </a>
                  </li>
                  <li>
                    <a href="/cancellation">
                      {t('footer.cancellation', 'سياسة الإلغاء')}
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="whatsapp-float">
        <a 
          href="https://wa.me/201234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-btn"
          aria-label="Contact WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>

      {/* Back to Top Button */}
      <div className="back-to-top">
        <button 
          className="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;

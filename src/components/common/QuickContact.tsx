import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './QuickContact.css';

interface ContactMethod {
  icon: string;
  title: string;
  subtitle: string;
  action: string;
  href: string;
  color: string;
}

interface QuickContactProps {
  className?: string;
}

const QuickContact: React.FC<QuickContactProps> = ({ className = '' }) => {
  const { t } = useTranslation();

  const contactMethods: ContactMethod[] = [
    {
      icon: 'bi-whatsapp',
      title: t('contact.whatsapp', 'واتساب'),
      subtitle: t('contact.whatsappSubtitle', 'تواصل معنا فوراً'),
      action: t('contact.whatsappAction', 'أرسل رسالة'),
      href: 'https://wa.me/201234567890',
      color: '#25D366'
    },
    {
      icon: 'bi-telephone-fill',
      title: t('contact.phone', 'اتصال مباشر'),
      subtitle: t('contact.phoneSubtitle', 'نحن متاحون 24/7'),
      action: t('contact.phoneAction', 'اتصل الآن'),
      href: 'tel:+201234567890',
      color: '#007bff'
    },
    {
      icon: 'bi-envelope-fill',
      title: t('contact.email', 'البريد الإلكتروني'),
      subtitle: t('contact.emailSubtitle', 'سنرد خلال ساعات'),
      action: t('contact.emailAction', 'أرسل إيميل'),
      href: 'mailto:info@estabraq-tourism.com',
      color: '#dc3545'
    },
    {
      icon: 'bi-geo-alt-fill',
      title: t('contact.location', 'زيارة المكتب'),
      subtitle: t('contact.locationSubtitle', 'نرحب بزيارتكم'),
      action: t('contact.locationAction', 'عرض الخريطة'),
      href: 'https://goo.gl/maps/example',
      color: '#28a745'
    }
  ];

  const handleContactClick = (href: string) => {
    window.open(href, '_blank');
  };

  return (
    <section className={`quick-contact ${className}`}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="contact-title">
              {t('contact.quickTitle', 'تواصل معنا بسهولة')}
            </h2>
            <p className="contact-subtitle text-muted">
              {t('contact.quickSubtitle', 'اختر الطريقة الأنسب لك للتواصل معنا')}
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {contactMethods.map((method, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="contact-card h-100">
                <Card.Body className="text-center">
                  <div 
                    className="contact-icon mb-3"
                    style={{ color: method.color }}
                  >
                    <i className={method.icon}></i>
                  </div>
                  <h5 className="contact-method-title mb-2">
                    {method.title}
                  </h5>
                  <p className="contact-method-subtitle text-muted mb-4">
                    {method.subtitle}
                  </p>
                  <Button
                    variant="outline-primary"
                    className="contact-action-btn"
                    onClick={() => handleContactClick(method.href)}
                    style={{ borderColor: method.color, color: method.color }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = method.color;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = method.color;
                    }}
                  >
                    <i className={method.icon + ' me-2'}></i>
                    {method.action}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Emergency Contact */}
        <Row className="mt-5">
          <Col>
            <Card className="emergency-contact">
              <Card.Body className="text-center">
                <div className="emergency-icon mb-3">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                </div>
                <h5 className="emergency-title">
                  {t('contact.emergency', 'حالات الطوارئ')}
                </h5>
                <p className="emergency-text mb-3">
                  {t('contact.emergencyText', 'في حالة وجود طارئ أثناء الرحلة، تواصل معنا فوراً')}
                </p>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => handleContactClick('tel:+201234567890')}
                >
                  <i className="bi bi-telephone-fill me-2"></i>
                  {t('contact.emergencyCall', 'اتصال طوارئ')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuickContact;

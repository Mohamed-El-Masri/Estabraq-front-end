import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { contactAPI } from '../services/estabraqAPI';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await contactAPI.sendMessage(formData);
      
      if (response.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setError(response.message || 'حدث خطأ أثناء إرسال الرسالة');
      }
    } catch (error: any) {
      console.error('Failed to send message:', error);
      setError(error.response?.data?.message || 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'bi-geo-alt',
      title: 'العنوان',
      titleEn: 'Address',
      content: 'شارع النيل، وسط البلد، القاهرة، مصر',
      contentEn: 'Nile Street, Downtown, Cairo, Egypt'
    },
    {
      icon: 'bi-telephone',
      title: 'الهاتف',
      titleEn: 'Phone',
      content: '+20 2 1234 5678',
      contentEn: '+20 2 1234 5678'
    },
    {
      icon: 'bi-envelope',
      title: 'البريد الإلكتروني',
      titleEn: 'Email',
      content: 'info@estabraq-tourism.com',
      contentEn: 'info@estabraq-tourism.com'
    },
    {
      icon: 'bi-clock',
      title: 'ساعات العمل',
      titleEn: 'Working Hours',
      content: 'السبت - الخميس: 9:00 - 18:00',
      contentEn: 'Saturday - Thursday: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <Container>
          <Row>
            <Col>
              <div className="hero-content text-center">
                <h1 className="hero-title">
                  {t('contact.title', 'تواصل معنا')}
                </h1>
                <p className="hero-subtitle">
                  {t('contact.subtitle', 'نحن هنا لمساعدتك في تخطيط رحلتك المثالية')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-content">
        <Container>
          <Row>
            {/* Contact Form */}
            <Col lg={8}>
              <Card className="contact-form-card">
                <Card.Body>
                  <h3 className="form-title mb-4">
                    {t('contact.form.title', 'أرسل لنا رسالة')}
                  </h3>

                  {showSuccess && (
                    <Alert variant="success" className="mb-4">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <div>
                          <strong>{t('contact.success.title', 'تم إرسال الرسالة بنجاح!')}</strong>
                          <div>{t('contact.success.message', 'شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.')}</div>
                        </div>
                      </div>
                    </Alert>
                  )}

                  {error && (
                    <Alert variant="danger" className="mb-4">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>
                          <strong>{t('contact.error.title', 'خطأ في الإرسال')}</strong>
                          <div>{error}</div>
                        </div>
                      </div>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="required">
                            {t('contact.form.name', 'الاسم الكامل')}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder={t('contact.form.namePlaceholder', 'أدخل اسمك الكامل')}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="required">
                            {t('contact.form.email', 'البريد الإلكتروني')}
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder={t('contact.form.emailPlaceholder', 'أدخل بريدك الإلكتروني')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            {t('contact.form.phone', 'رقم الهاتف')}
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t('contact.form.phonePlaceholder', 'أدخل رقم هاتفك')}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="required">
                            {t('contact.form.subject', 'الموضوع')}
                          </Form.Label>
                          <Form.Select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">
                              {t('contact.form.selectSubject', 'اختر الموضوع')}
                            </option>
                            <option value="booking">
                              {t('contact.subjects.booking', 'استفسار عن حجز')}
                            </option>
                            <option value="complaint">
                              {t('contact.subjects.complaint', 'شكوى')}
                            </option>
                            <option value="suggestion">
                              {t('contact.subjects.suggestion', 'اقتراح')}
                            </option>
                            <option value="general">
                              {t('contact.subjects.general', 'استفسار عام')}
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="required">
                        {t('contact.form.message', 'الرسالة')}
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder={t('contact.form.messagePlaceholder', 'اكتب رسالتك هنا...')}
                      />
                    </Form.Group>

                    <div className="form-actions text-center">
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="send-button"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            {t('contact.form.sending', 'جاري الإرسال...')}
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            {t('contact.form.send', 'إرسال الرسالة')}
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Info */}
            <Col lg={4}>
              <div className="contact-info">
                <h3 className="info-title mb-4">
                  {t('contact.info.title', 'معلومات التواصل')}
                </h3>

                {contactInfo.map((info, index) => (
                  <Card key={index} className="info-card mb-3">
                    <Card.Body>
                      <div className="info-item">
                        <div className="info-icon">
                          <i className={info.icon}></i>
                        </div>
                        <div className="info-content">
                          <h5 className="info-label">
                            {t('lang') === 'ar' ? info.title : info.titleEn}
                          </h5>
                          <p className="info-text">
                            {t('lang') === 'ar' ? info.content : info.contentEn}
                          </p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}

                {/* Social Media */}
                <Card className="social-card">
                  <Card.Body>
                    <h5 className="social-title mb-3">
                      {t('contact.social.title', 'تابعنا على')}
                    </h5>
                    <div className="social-links">
                      <a href="#" className="social-link facebook">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="#" className="social-link twitter">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="#" className="social-link instagram">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="#" className="social-link youtube">
                        <i className="bi bi-youtube"></i>
                      </a>
                      <a href="#" className="social-link whatsapp">
                        <i className="bi bi-whatsapp"></i>
                      </a>
                    </div>
                  </Card.Body>
                </Card>

                {/* Emergency Contact */}
                <Card className="emergency-card">
                  <Card.Body>
                    <div className="emergency-content text-center">
                      <div className="emergency-icon mb-2">
                        <i className="bi bi-telephone-forward"></i>
                      </div>
                      <h5 className="emergency-title">
                        {t('contact.emergency.title', 'للطوارئ')}
                      </h5>
                      <p className="emergency-number">
                        +20 100 123 4567
                      </p>
                      <small className="emergency-note">
                        {t('contact.emergency.note', 'متاح 24/7')}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <Container>
          <Row>
            <Col>
              <Card className="map-card">
                <Card.Body className="p-0">
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.098276267288!2d31.235711315457814!3d30.04441638188251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2s!4v1635959492045!5m2!1sen!2s"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location"
                    ></iframe>
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

export default ContactPage;

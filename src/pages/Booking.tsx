import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Booking.css';

interface BookingForm {
  fullName: string;
  email: string;
  phone: string;
  participants: number;
  specialRequests: string;
}

const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingForm>({
    fullName: '',
    email: '',
    phone: '',
    participants: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock trip data - replace with actual API call
  const trip = {
    id: parseInt(id || '1'),
    titleAr: 'رحلة إلى الأهرامات والمتحف المصري',
    titleEn: 'Pyramids and Egyptian Museum Trip',
    price: 1200,
    duration: 8,
    maxParticipants: 15,
    currentParticipants: 8,
    imageUrl: 'https://via.placeholder.com/400x250/1ABC9C/FFFFFF?text=Pyramids+Trip'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) || 1 : value
    }));
  };

  const calculateTotal = () => {
    return trip.price * formData.participants;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (showSuccess) {
    return (
      <div className="booking-page">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="success-card text-center">
                <Card.Body className="p-5">
                  <div className="success-icon mb-4">
                    <i className="bi bi-check-circle-fill text-success"></i>
                  </div>
                  <h2 className="text-success mb-3">
                    {t('booking.success.title', 'تم الحجز بنجاح!')}
                  </h2>
                  <p className="mb-4">
                    {t('booking.success.message', 'شكراً لك! تم تأكيد حجزك وسنتواصل معك قريباً لتأكيد التفاصيل.')}
                  </p>
                  <div className="booking-details">
                    <p><strong>{t('booking.tripName', 'اسم الرحلة')}:</strong> {t('lang') === 'ar' ? trip.titleAr : trip.titleEn}</p>
                    <p><strong>{t('booking.participants', 'عدد المشاركين')}:</strong> {formData.participants}</p>
                    <p><strong>{t('booking.total', 'المجموع')}:</strong> {calculateTotal().toLocaleString()} EGP</p>
                  </div>
                  <Button variant="primary" onClick={() => navigate('/')}>
                    {t('common.backToHome', 'العودة للرئيسية')}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <Button 
                variant="outline-primary" 
                className="back-button mb-3"
                onClick={handleGoBack}
              >
                <i className="bi bi-arrow-right me-2"></i>
                {t('common.back', 'رجوع')}
              </Button>
              <h1 className="page-title">
                {t('booking.title', 'حجز الرحلة')}
              </h1>
              <p className="page-subtitle">
                {t('booking.subtitle', 'املأ البيانات التالية لتأكيد حجزك')}
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Booking Form */}
          <Col lg={8}>
            <Card className="booking-form-card">
              <Card.Body>
                <h3 className="section-title mb-4">
                  {t('booking.personalInfo', 'البيانات الشخصية')}
                </h3>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required">
                          {t('booking.form.fullName', 'الاسم الكامل')}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder={t('booking.form.fullNamePlaceholder', 'أدخل اسمك الكامل')}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required">
                          {t('booking.form.email', 'البريد الإلكتروني')}
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder={t('booking.form.emailPlaceholder', 'أدخل بريدك الإلكتروني')}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required">
                          {t('booking.form.phone', 'رقم الهاتف')}
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder={t('booking.form.phonePlaceholder', 'أدخل رقم هاتفك')}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="required">
                          {t('booking.form.participants', 'عدد المشاركين')}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="participants"
                          value={formData.participants}
                          onChange={handleInputChange}
                          min={1}
                          max={trip.maxParticipants - trip.currentParticipants}
                          required
                        />
                        <Form.Text className="text-muted">
                          {t('booking.form.participantsNote', 'الحد الأقصى: {{max}} مشارك', {
                            max: trip.maxParticipants - trip.currentParticipants
                          })}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      {t('booking.form.specialRequests', 'طلبات خاصة (اختياري)')}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder={t('booking.form.specialRequestsPlaceholder', 'أي طلبات أو ملاحظات خاصة...')}
                    />
                  </Form.Group>

                  <Alert variant="info" className="booking-terms">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-info-circle me-2 mt-1"></i>
                      <div>
                        <strong>{t('booking.terms.title', 'شروط الحجز:')}</strong>
                        <ul className="mb-0 mt-2">
                          <li>{t('booking.terms.cancellation', 'يمكن إلغاء الحجز مجاناً حتى 24 ساعة قبل الرحلة')}</li>
                          <li>{t('booking.terms.payment', 'الدفع عند بداية الرحلة أو عبر التحويل البنكي')}</li>
                          <li>{t('booking.terms.confirmation', 'سيتم تأكيد الحجز خلال 24 ساعة')}</li>
                        </ul>
                      </div>
                    </div>
                  </Alert>

                  <div className="form-actions">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="confirm-button"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          {t('booking.submitting', 'جاري الحجز...')}
                        </>
                      ) : (
                        t('booking.confirm', 'تأكيد الحجز')
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Booking Summary */}
          <Col lg={4}>
            <div className="booking-summary">
              <Card className="summary-card">
                <Card.Body>
                  <h4 className="summary-title mb-3">
                    {t('booking.summary', 'ملخص الحجز')}
                  </h4>

                  <div className="trip-info">
                    <img 
                      src={trip.imageUrl} 
                      alt={trip.titleAr}
                      className="trip-image mb-3"
                    />
                    <h5 className="trip-name">
                      {t('lang') === 'ar' ? trip.titleAr : trip.titleEn}
                    </h5>
                    <div className="trip-duration">
                      <i className="bi bi-clock me-1"></i>
                      {trip.duration} {t('trip.hours', 'ساعات')}
                    </div>
                  </div>

                  <hr />

                  <div className="price-breakdown">
                    <div className="price-item">
                      <span>{t('booking.pricePerPerson', 'سعر الشخص الواحد')}</span>
                      <span>{trip.price.toLocaleString()} EGP</span>
                    </div>
                    <div className="price-item">
                      <span>{t('booking.participants', 'عدد المشاركين')}</span>
                      <span>×{formData.participants}</span>
                    </div>
                    <hr />
                    <div className="price-total">
                      <span>{t('booking.total', 'المجموع')}</span>
                      <span>{calculateTotal().toLocaleString()} EGP</span>
                    </div>
                  </div>

                  <Alert variant="success" className="mt-3">
                    <small>
                      <i className="bi bi-shield-check me-1"></i>
                      {t('booking.guarantee', 'ضمان أفضل سعر')}
                    </small>
                  </Alert>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookingPage;

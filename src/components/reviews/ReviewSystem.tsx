import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Modal, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './ReviewSystem.css';

interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  tripId: number;
  isVerified: boolean;
}

interface ReviewSystemProps {
  tripId: number;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({
  tripId,
  reviews,
  averageRating,
  totalReviews,
  onAddReview
}) => {
  const { t, i18n } = useTranslation();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  const isArabic = i18n.language === 'ar';

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <i key={i} className={`bi bi-star-fill star-${size} star-filled`}></i>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <i key={i} className={`bi bi-star-half star-${size} star-filled`}></i>
        );
      } else {
        stars.push(
          <i key={i} className={`bi bi-star star-${size} star-empty`}></i>
        );
      }
    }
    return stars;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSubmitReview = () => {
    if (onAddReview && newReview.userName && newReview.comment) {
      onAddReview({
        ...newReview,
        tripId,
        userAvatar: '',
        isVerified: false
      });
      setNewReview({ userName: '', rating: 5, comment: '' });
      setShowReviewModal(false);
    }
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse(); // 5 stars first
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="review-system">
      {/* Overall Rating */}
      <Card className="rating-summary-card mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <div className="overall-rating">
                <h2 className="rating-number">{averageRating.toFixed(1)}</h2>
                <div className="rating-stars mb-2">
                  {renderStars(averageRating, 'lg')}
                </div>
                <p className="text-muted mb-0">
                  {t('reviews.basedOn', 'بناءً على {{count}} تقييم', { count: totalReviews })}
                </p>
              </div>
            </Col>
            
            <Col md={5}>
              <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <div key={star} className="rating-bar-container">
                    <span className="rating-label">{star}</span>
                    <i className="bi bi-star-fill star-sm"></i>
                    <div className="rating-bar">
                      <div 
                        className="rating-fill"
                        style={{ 
                          width: totalReviews > 0 
                            ? `${(ratingDistribution[index] / totalReviews) * 100}%` 
                            : '0%' 
                        }}
                      ></div>
                    </div>
                    <span className="rating-count">{ratingDistribution[index]}</span>
                  </div>
                ))}
              </div>
            </Col>
            
            <Col md={3} className="text-center">
              <Button
                variant="primary"
                onClick={() => setShowReviewModal(true)}
                className="add-review-btn"
              >
                <i className="bi bi-plus-circle me-2"></i>
                {t('reviews.addReview', 'إضافة تقييم')}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Reviews List */}
      <div className="reviews-list">
        <h4 className="mb-4">
          {t('reviews.customerReviews', 'آراء العملاء')}
        </h4>
        
        {reviews.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <i className="bi bi-chat-quote display-4 text-muted mb-3"></i>
              <h5 className="text-muted">
                {t('reviews.noReviews', 'لا توجد تقييمات بعد')}
              </h5>
              <p className="text-muted">
                {t('reviews.beFirst', 'كن أول من يضع تقييمًا لهذه الرحلة')}
              </p>
            </Card.Body>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="review-card mb-3">
              <Card.Body>
                <Row>
                  <Col md={2} className="text-center">
                    <div className="user-avatar">
                      {review.userAvatar ? (
                        <img src={review.userAvatar} alt={review.userName} />
                      ) : (
                        <div className="avatar-placeholder">
                          <i className="bi bi-person-fill"></i>
                        </div>
                      )}
                    </div>
                  </Col>
                  
                  <Col md={10}>
                    <div className="review-header">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="reviewer-name">
                            {review.userName}
                            {review.isVerified && (
                              <Badge bg="success" className="ms-2">
                                <i className="bi bi-check-circle me-1"></i>
                                {t('reviews.verified', 'موثق')}
                              </Badge>
                            )}
                          </h6>
                          <div className="review-rating mb-2">
                            {renderStars(review.rating, 'sm')}
                          </div>
                        </div>
                        <small className="text-muted">
                          {formatDate(review.date)}
                        </small>
                      </div>
                    </div>
                    
                    <p className="review-comment">
                      {review.comment}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      {/* Add Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {t('reviews.addReview', 'إضافة تقييم')}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('reviews.yourName', 'اسمك')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                    placeholder={t('reviews.namePlaceholder', 'أدخل اسمك')}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('reviews.rating', 'التقييم')}</Form.Label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      >
                        <i className="bi bi-star-fill"></i>
                      </button>
                    ))}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>{t('reviews.comment', 'تعليقك')}</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder={t('reviews.commentPlaceholder', 'شاركنا تجربتك مع هذه الرحلة...')}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            {t('common.cancel', 'إلغاء')}
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            <i className="bi bi-send me-2"></i>
            {t('reviews.submitReview', 'إرسال التقييم')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewSystem;

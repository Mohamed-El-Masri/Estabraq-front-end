import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './TripReviews.css';

interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  tripId: number;
}

interface TripReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

const TripReviews: React.FC<TripReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews,
  className = ''
}) => {
  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }

    return stars;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={`trip-reviews ${className}`}>
      <Card className="reviews-card">
        <Card.Header className="reviews-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-chat-dots me-2"></i>
              {t('reviews.title', 'التقييمات والمراجعات')}
            </h5>
            <div className="rating-summary">
              <div className="d-flex align-items-center">
                <span className="average-rating me-2">{averageRating.toFixed(1)}</span>
                <div className="stars me-2">
                  {renderStars(averageRating)}
                </div>
                <Badge bg="secondary">
                  {totalReviews} {t('reviews.count', 'تقييم')}
                </Badge>
              </div>
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          {reviews.length === 0 ? (
            <div className="no-reviews text-center py-4">
              <i className="bi bi-chat-dots display-4 text-muted mb-3"></i>
              <h6 className="text-muted">
                {t('reviews.noReviews', 'لا توجد مراجعات بعد')}
              </h6>
              <p className="text-muted mb-0">
                {t('reviews.beFirst', 'كن أول من يقيم هذه الرحلة')}
              </p>
            </div>
          ) : (
            <Row className="g-3">
              {reviews.map((review) => (
                <Col key={review.id} xs={12}>
                  <Card className="review-item">
                    <Card.Body>
                      <div className="review-header d-flex justify-content-between align-items-start mb-2">
                        <div className="reviewer-info d-flex align-items-center">
                          <div className="avatar me-3">
                            {review.userAvatar ? (
                              <img 
                                src={review.userAvatar} 
                                alt={review.userName}
                                className="avatar-img"
                              />
                            ) : (
                              <div className="avatar-placeholder">
                                <i className="bi bi-person-fill"></i>
                              </div>
                            )}
                          </div>
                          <div>
                            <h6 className="reviewer-name mb-0">{review.userName}</h6>
                            <small className="text-muted">
                              {formatDate(review.date)}
                            </small>
                          </div>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="review-comment mb-0">{review.comment}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TripReviews;

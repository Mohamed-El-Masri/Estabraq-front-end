import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './SiteStats.css';

interface StatItem {
  icon: string;
  count: number;
  label: string;
  color: string;
}

interface SiteStatsProps {
  className?: string;
}

const SiteStats: React.FC<SiteStatsProps> = ({ className = '' }) => {
  const { t } = useTranslation();

  const stats: StatItem[] = [
    {
      icon: 'bi-geo-alt-fill',
      count: 25,
      label: t('stats.destinations', 'وجهة سياحية'),
      color: '#1ABC9C'
    },
    {
      icon: 'bi-people-fill',
      count: 1500,
      label: t('stats.happyCustomers', 'عميل سعيد'),
      color: '#3498DB'
    },
    {
      icon: 'bi-calendar-check',
      count: 200,
      label: t('stats.completedTrips', 'رحلة مكتملة'),
      color: '#E67E22'
    },
    {
      icon: 'bi-star-fill',
      count: 5,
      label: t('stats.rating', 'تقييم العملاء'),
      color: '#F1C40F'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section className={`site-stats ${className}`}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="stats-title">
              {t('stats.title', 'إنجازاتنا في أرقام')}
            </h2>
            <p className="stats-subtitle text-muted">
              {t('stats.subtitle', 'نفخر بما حققناه من نجاحات مع عملائنا الكرام')}
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {stats.map((stat, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="stat-card h-100">
                <Card.Body className="text-center">
                  <div 
                    className="stat-icon mb-3"
                    style={{ color: stat.color }}
                  >
                    <i className={stat.icon}></i>
                  </div>
                  <h3 
                    className="stat-number mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.count === 5 ? '5.0' : formatNumber(stat.count)}
                    {stat.count === 1500 && '+'}
                  </h3>
                  <p className="stat-label mb-0">
                    {stat.label}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SiteStats;

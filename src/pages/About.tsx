import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SiteStats from '../components/common/SiteStats';
import './About.css';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'أحمد محمد',
      nameEn: 'Ahmed Mohamed',
      position: 'المدير العام',
      positionEn: 'General Manager',
      image: 'https://via.placeholder.com/300x300/1ABC9C/FFFFFF?text=AM',
      experience: '15 سنة في السياحة'
    },
    {
      name: 'فاطمة علي',
      nameEn: 'Fatma Ali',
      position: 'مديرة العمليات',
      positionEn: 'Operations Manager',
      image: 'https://via.placeholder.com/300x300/FF7043/FFFFFF?text=FA',
      experience: '12 سنة في تنظيم الرحلات'
    },
    {
      name: 'محمود حسن',
      nameEn: 'Mahmoud Hassan',
      position: 'مرشد سياحي رئيسي',
      positionEn: 'Lead Tour Guide',
      image: 'https://via.placeholder.com/300x300/FFD54F/FFFFFF?text=MH',
      experience: '10 سنوات في الإرشاد السياحي'
    }
  ];

  const values = [
    {
      icon: 'bi-shield-check',
      title: 'الجودة والأمان',
      titleEn: 'Quality & Safety',
      description: 'نضمن أعلى معايير الجودة والأمان في جميع رحلاتنا',
      descriptionEn: 'We guarantee the highest quality and safety standards in all our trips'
    },
    {
      icon: 'bi-people',
      title: 'خدمة العملاء',
      titleEn: 'Customer Service',
      description: 'فريق خدمة عملاء متاح على مدار الساعة لمساعدتك',
      descriptionEn: '24/7 customer service team available to help you'
    },
    {
      icon: 'bi-star',
      title: 'التميز',
      titleEn: 'Excellence',
      description: 'نسعى دائماً لتقديم تجارب سياحية استثنائية ومميزة',
      descriptionEn: 'We always strive to provide exceptional and unique tourism experiences'
    },
    {
      icon: 'bi-heart',
      title: 'الشغف',
      titleEn: 'Passion',
      description: 'شغفنا بالسياحة المصرية يدفعنا لتقديم الأفضل',
      descriptionEn: 'Our passion for Egyptian tourism drives us to provide the best'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row>
            <Col>
              <div className="hero-content text-center">
                <h1 className="hero-title">
                  {t('about.title', 'من نحن')}
                </h1>
                <p className="hero-subtitle">
                  {t('about.subtitle', 'نحن شركة سياحة مصرية متخصصة في تنظيم أفضل الرحلات السياحية')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="story-content">
                <h2 className="section-title">
                  {t('about.story.title', 'قصتنا')}
                </h2>
                <p className="story-text">
                  {t('about.story.text1', 'تأسست شركة استبرق للسياحة عام 2015 بهدف تقديم تجارب سياحية استثنائية في مصر. بدأنا رحلتنا بحلم بسيط: أن نعرّف العالم على جمال مصر وحضارتها العريقة.')}
                </p>
                <p className="story-text">
                  {t('about.story.text2', 'على مدار السنوات، نمت الشركة لتصبح واحدة من أهم شركات السياحة في مصر، حيث خدمنا أكثر من 10,000 زائر من جميع أنحاء العالم.')}
                </p>
                <p className="story-text">
                  {t('about.story.text3', 'نحن نؤمن بأن السياحة ليست مجرد زيارة أماكن، بل تجربة حياة تبقى في الذاكرة للأبد.')}
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="story-image">
                <img 
                  src="https://via.placeholder.com/600x400/1ABC9C/FFFFFF?text=Our+Story" 
                  alt="Our Story"
                  className="img-fluid rounded"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <Container>
          <Row>
            <Col md={6}>
              <Card className="mission-card h-100">
                <Card.Body className="text-center">
                  <div className="mission-icon mb-4">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <h3 className="mission-title">
                    {t('about.mission.title', 'رسالتنا')}
                  </h3>
                  <p className="mission-text">
                    {t('about.mission.text', 'تقديم تجارب سياحية متميزة وآمنة تُظهر جمال مصر وتراثها الحضاري، مع الحفاظ على أعلى معايير الجودة والخدمة.')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="vision-card h-100">
                <Card.Body className="text-center">
                  <div className="vision-icon mb-4">
                    <i className="bi bi-eye"></i>
                  </div>
                  <h3 className="vision-title">
                    {t('about.vision.title', 'رؤيتنا')}
                  </h3>
                  <p className="vision-text">
                    {t('about.vision.text', 'أن نكون الشركة الرائدة في السياحة المصرية، ونساهم في تعزيز مكانة مصر كوجهة سياحية عالمية.')}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title text-center mb-5">
                {t('about.values.title', 'قيمنا')}
              </h2>
            </Col>
          </Row>
          <Row>
            {values.map((value, index) => (
              <Col key={index} md={6} lg={3} className="mb-4">
                <Card className="value-card h-100 text-center">
                  <Card.Body>
                    <div className="value-icon mb-3">
                      <i className={value.icon}></i>
                    </div>
                    <h4 className="value-title">
                      {t('lang') === 'ar' ? value.title : value.titleEn}
                    </h4>
                    <p className="value-description">
                      {t('lang') === 'ar' ? value.description : value.descriptionEn}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title text-center mb-5">
                {t('about.team.title', 'فريق العمل')}
              </h2>
            </Col>
          </Row>
          <Row>
            {teamMembers.map((member, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <Card className="team-card h-100">
                  <div className="team-image-container">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <h4 className="team-name">
                      {t('lang') === 'ar' ? member.name : member.nameEn}
                    </h4>
                    <p className="team-position">
                      {t('lang') === 'ar' ? member.position : member.positionEn}
                    </p>
                    <p className="team-experience text-muted">
                      {member.experience}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title text-center mb-5 text-white">
                {t('about.stats.title', 'إنجازاتنا')}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="text-center mb-4">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">
                  {t('about.stats.visitors', 'زائر راضٍ')}
                </div>
              </div>
            </Col>
            <Col md={3} className="text-center mb-4">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">
                  {t('about.stats.trips', 'رحلة منظمة')}
                </div>
              </div>
            </Col>
            <Col md={3} className="text-center mb-4">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">
                  {t('about.stats.destinations', 'وجهة سياحية')}
                </div>
              </div>
            </Col>
            <Col md={3} className="text-center mb-4">
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">
                  {t('about.stats.satisfaction', 'رضا العملاء')}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Site Statistics */}
      <SiteStats />
    </div>
  );
};

export default AboutPage;

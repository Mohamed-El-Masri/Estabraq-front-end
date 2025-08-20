import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

const AppNavbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lng);
  };

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          <i className="bi bi-compass me-2"></i>
          استبرق للسياحة
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">{t('common.home')}</Nav.Link>
            <Nav.Link href="/trips">{t('navigation.trips')}</Nav.Link>
            <Nav.Link href="/categories">{t('navigation.categories')}</Nav.Link>
            <Nav.Link href="/about">{t('common.about')}</Nav.Link>
            <Nav.Link href="/contact">{t('common.contact')}</Nav.Link>
          </Nav>
          
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="language-dropdown" size="sm">
                <i className="bi bi-globe me-1"></i>
                {i18n.language === 'ar' ? 'العربية' : 'English'}
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={() => changeLanguage('ar')}
                  active={i18n.language === 'ar'}
                >
                  <i className="bi bi-flag me-2"></i>
                  العربية
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => changeLanguage('en')}
                  active={i18n.language === 'en'}
                >
                  <i className="bi bi-flag-fill me-2"></i>
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

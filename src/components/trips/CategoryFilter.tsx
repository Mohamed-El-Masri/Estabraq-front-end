import React from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Category } from '../../types';
import './CategoryFilter.css';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
  showAll?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  showAll = false
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const getCategoryIcon = (categoryName: string): string => {
    const name = categoryName.toLowerCase();
    if (name.includes('beach') || name.includes('بحر')) return 'bi-water';
    if (name.includes('nile') || name.includes('نيل')) return 'bi-water';
    if (name.includes('desert') || name.includes('صحرا')) return 'bi-sun';
    if (name.includes('cultural') || name.includes('ثقاف')) return 'bi-building';
    if (name.includes('day') || name.includes('يوم')) return 'bi-clock';
    if (name.includes('festival') || name.includes('مهرجان')) return 'bi-music-note';
    return 'bi-geo-alt';
  };

  const getCategoryClass = (category: Category): string => {
    const baseClass = 'category-filter-btn';
    const colorClass = category.colorTheme ? `category-${category.colorTheme.replace('#', '')}` : 'category-default';
    const activeClass = selectedCategory === category.id ? 'active' : '';
    return `${baseClass} ${colorClass} ${activeClass}`;
  };

  return (
    <div className="category-filter">
      <Row className="g-3 justify-content-center">
        {showAll && (
          <Col lg={2} md={4} sm={6} xs={12}>
            <Button
              variant={selectedCategory === null ? 'primary' : 'outline-primary'}
              className={`category-filter-btn w-100 ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => onCategorySelect(null)}
            >
              <div className="category-content">
                <i className="bi bi-grid-3x3-gap category-icon"></i>
                <span className="category-name">
                  {t('categories.all', 'جميع الفئات')}
                </span>
              </div>
            </Button>
          </Col>
        )}

        {categories.map((category) => {
          const categoryName = isArabic ? category.nameAr : category.nameEn;
          const iconClass = getCategoryIcon(categoryName);

          return (
            <Col key={category.id} lg={2} md={4} sm={6} xs={12}>
              <Button
                variant="outline-primary"
                className={getCategoryClass(category) + ' w-100'}
                onClick={() => onCategorySelect(category.id)}
                style={{ 
                  borderColor: selectedCategory === category.id ? category.colorTheme : '',
                  backgroundColor: selectedCategory === category.id ? category.colorTheme : 'transparent',
                  color: selectedCategory === category.id ? '#fff' : category.colorTheme
                }}
              >
                <div className="category-content">
                  <i className={`${iconClass} category-icon`}></i>
                  <span className="category-name">
                    {categoryName}
                  </span>
                  {category.description && (
                    <Badge 
                      bg="light" 
                      text="dark" 
                      className="category-badge mt-1"
                    >
                      <i className="bi bi-info-circle"></i>
                    </Badge>
                  )}
                </div>
              </Button>
            </Col>
          );
        })}
      </Row>

      {/* Mobile Horizontal Scroll Alternative */}
      <div className="category-filter-mobile d-md-none">
        <div className="category-scroll">
          {showAll && (
            <Button
              variant={selectedCategory === null ? 'primary' : 'outline-primary'}
              className={`category-mobile-btn ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => onCategorySelect(null)}
            >
              <i className="bi bi-grid-3x3-gap me-2"></i>
              {t('categories.all', 'الكل')}
            </Button>
          )}

          {categories.map((category) => {
            const categoryName = isArabic ? category.nameAr : category.nameEn;
            const iconClass = getCategoryIcon(categoryName);

            return (
              <Button
                key={category.id}
                variant="outline-primary"
                className={`category-mobile-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategorySelect(category.id)}
                style={{ 
                  borderColor: selectedCategory === category.id ? category.colorTheme : '',
                  backgroundColor: selectedCategory === category.id ? category.colorTheme : 'transparent',
                  color: selectedCategory === category.id ? '#fff' : category.colorTheme
                }}
              >
                <i className={`${iconClass} me-1`}></i>
                {categoryName}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;

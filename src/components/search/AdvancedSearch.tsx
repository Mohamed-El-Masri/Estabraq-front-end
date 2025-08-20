import React, { useState } from 'react';
import { Form, Row, Col, Button, Card, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { TripFilters } from '../../types';
import './AdvancedSearch.css';

interface AdvancedSearchProps {
  filters: TripFilters;
  categories: Array<{ id: number; nameAr: string; nameEn: string }>;
  onFiltersChange: (filters: TripFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filters,
  categories,
  onFiltersChange,
  onSearch,
  onReset
}) => {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const isArabic = i18n.language === 'ar';

  const handleFilterChange = (field: keyof TripFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const parseInputDate = (dateString: string): Date | undefined => {
    return dateString ? new Date(dateString) : undefined;
  };

  return (
    <Card className="advanced-search-card">
      <Card.Body>
        {/* Basic Search */}
        <Row className="mb-3">
          <Col md={8}>
            <InputGroup size="lg">
              <Form.Control
                type="text"
                placeholder={t('search.placeholder', 'ابحث عن رحلتك المفضلة...')}
                value={filters.searchTerm || ''}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="search-input"
              />
              <Button 
                variant="primary"
                onClick={onSearch}
                className="search-btn"
              >
                <i className="bi bi-search me-2"></i>
                {t('common.search', 'بحث')}
              </Button>
            </InputGroup>
          </Col>
          <Col md={4}>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-100 advanced-toggle"
            >
              <i className={`bi bi-${isExpanded ? 'chevron-up' : 'chevron-down'} me-2`}></i>
              {t('search.advanced', 'بحث متقدم')}
            </Button>
          </Col>
        </Row>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="advanced-filters">
            <hr className="my-4" />
            
            <Row className="g-3">
              {/* Category Filter */}
              <Col md={6} lg={4}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    <i className="bi bi-tag me-2"></i>
                    {t('filters.category', 'الفئة')}
                  </Form.Label>
                  <Form.Select
                    value={filters.categoryId || ''}
                    onChange={(e) => handleFilterChange('categoryId', 
                      e.target.value ? parseInt(e.target.value) : null
                    )}
                  >
                    <option value="">{t('filters.allCategories', 'جميع الفئات')}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {isArabic ? category.nameAr : category.nameEn}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Price Range */}
              <Col md={6} lg={4}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    <i className="bi bi-currency-dollar me-2"></i>
                    {t('filters.priceRange', 'نطاق السعر')}
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder={t('filters.minPrice', 'أقل سعر')}
                        value={filters.minPrice || ''}
                        onChange={(e) => handleFilterChange('minPrice', 
                          e.target.value ? parseFloat(e.target.value) : undefined
                        )}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder={t('filters.maxPrice', 'أعلى سعر')}
                        value={filters.maxPrice || ''}
                        onChange={(e) => handleFilterChange('maxPrice', 
                          e.target.value ? parseFloat(e.target.value) : undefined
                        )}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>

              {/* Date Range */}
              <Col md={6} lg={4}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    <i className="bi bi-calendar me-2"></i>
                    {t('filters.dateRange', 'تاريخ الرحلة')}
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="date"
                        value={formatDateForInput(filters.startDate)}
                        onChange={(e) => handleFilterChange('startDate', 
                          parseInputDate(e.target.value)
                        )}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="date"
                        value={formatDateForInput(filters.endDate)}
                        onChange={(e) => handleFilterChange('endDate', 
                          parseInputDate(e.target.value)
                        )}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            {/* Action Buttons */}
            <Row className="mt-4">
              <Col>
                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={onReset}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    {t('common.reset', 'إعادة تعيين')}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={onSearch}
                  >
                    <i className="bi bi-search me-2"></i>
                    {t('common.search', 'بحث')}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdvancedSearch;

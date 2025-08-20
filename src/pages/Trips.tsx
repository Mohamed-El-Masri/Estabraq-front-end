import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '../hooks/useTrips';
import { useActiveCategories } from '../hooks/useCategories';
import TripCard from '../components/trips/TripCard';
import CategoryFilter from '../components/trips/CategoryFilter';
import AdvancedSearch from '../components/search/AdvancedSearch';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { TripFilters } from '../types';
import { mapAPITrips, mapAPICategories } from '../utils/apiMappers';
import './Trips.css';

const TripsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState<TripFilters>({});
  const tripsPerPage = 9;

  const { data: categoriesData } = useActiveCategories();
  const { data: tripsData, isLoading, error } = useTrips(
    currentPage,
    tripsPerPage,
    searchFilters.searchTerm,
    selectedCategory || searchFilters.categoryId || undefined,
    searchFilters.minPrice,
    searchFilters.maxPrice,
    undefined, // sortBy - will add later
    false // sortDescending - will add later
  );

  // Map API data to local types
  const categories = categoriesData?.categories ? mapAPICategories(categoriesData.categories) : [];
  const trips = tripsData?.trips ? mapAPITrips(tripsData.trips) : [];
  const totalPages = tripsData?.totalPages || 0;

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleAdvancedSearch = () => {
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleFiltersChange = (filters: TripFilters) => {
    setSearchFilters(filters);
  };

  const handleResetSearch = () => {
    setSearchFilters({});
    setCurrentPage(1);
  };

  const handleViewDetails = (tripId: number) => {
    navigate(`/trips/${tripId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2 className="text-danger">{t('error.title', 'حدث خطأ')}</h2>
          <p>{t('error.loadingTrips', 'فشل في تحميل الرحلات')}</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="trips-page">
      {/* Page Header */}
      <section className="trips-header">
        <Container>
          <Row>
            <Col>
              <div className="header-content text-center">
                <h1 className="page-title">
                  {t('trips.title', 'جميع الرحلات')}
                </h1>
                <p className="page-subtitle">
                  {t('trips.subtitle', 'اكتشف أجمل الوجهات السياحية في مصر')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filters */}
      <section className="trips-filters">
        <Container>
          <Row className="mb-4">
            <Col>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategoryChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <AdvancedSearch
                filters={searchFilters}
                categories={categories}
                onFiltersChange={handleFiltersChange}
                onSearch={handleAdvancedSearch}
                onReset={handleResetSearch}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trips Grid */}
      <section className="trips-content">
        <Container>
          {isLoading ? (
            <LoadingSpinner 
              text={t('loading.trips', 'جاري تحميل الرحلات...')}
              size="lg"
            />
          ) : trips.length === 0 ? (
            <div className="no-trips-container">
              <div className="text-center py-5">
                <div className="no-trips-icon mb-4">
                  <i className="bi bi-search" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                </div>
                <h3 className="text-muted">
                  {t('trips.noResults', 'لا توجد رحلات متاحة')}
                </h3>
                <p className="text-muted">
                  {selectedCategory 
                    ? t('trips.noResultsCategory', 'لا توجد رحلات في هذه الفئة')
                    : t('trips.noResultsGeneral', 'جرب البحث في فئة أخرى')
                  }
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <Row className="mb-4">
                <Col>
                  <div className="results-info">
                    <p className="text-muted mb-0">
                      {t('trips.resultsCount', 'عرض {{showing}} من {{total}} رحلة', {
                        showing: trips.length,
                        total: tripsData?.totalCount || 0
                      })}
                    </p>
                  </div>
                </Col>
              </Row>

              {/* Trips Grid */}
              <Row className="g-4">
                {trips.map((trip) => (
                  <Col key={trip.id} md={6} lg={4}>
                    <TripCard trip={trip} onViewDetails={handleViewDetails} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <Row className="mt-5">
                  <Col>
                    <div className="pagination-container">
                      <Pagination className="justify-content-center">
                        <Pagination.First
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        
                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => {
                          const page = index + 1;
                          const isVisible = Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;
                          
                          if (!isVisible) {
                            if (page === currentPage - 3 || page === currentPage + 3) {
                              return <Pagination.Ellipsis key={page} />;
                            }
                            return null;
                          }
                          
                          return (
                            <Pagination.Item
                              key={page}
                              active={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Pagination.Item>
                          );
                        })}
                        
                        <Pagination.Next
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
};

export default TripsPage;

import React from 'react';
import { useActiveCategories } from '../hooks/useCategories';
import { useFeaturedTrips } from '../hooks/useTrips';
import { usePersistentQueries, useQueryDebugger } from '../hooks/useQueryHelpers';
import { Category, Trip } from '../services/estabraqAPI';

const TestIntegrationPage: React.FC = () => {
  // Use persistent queries helper
  usePersistentQueries();
  
  const categoriesQuery = useActiveCategories();
  const tripsQuery = useFeaturedTrips(8);
  
  // Debug queries
  useQueryDebugger('categories', categoriesQuery);
  useQueryDebugger('trips', tripsQuery);
  
  // Extract data safely with fallbacks
  const categories = categoriesQuery.data?.categories || [];
  const categoriesLoading = categoriesQuery.isLoading || categoriesQuery.isFetching;
  const categoriesError = categoriesQuery.error;
  
  const trips = Array.isArray(tripsQuery.data) ? tripsQuery.data : [];
  const tripsLoading = tripsQuery.isLoading || tripsQuery.isFetching;
  const tripsError = tripsQuery.error;

  // Debug: log the data to see what we're getting
  React.useEffect(() => {
    console.log('Categories Query State:', {
      data: categoriesQuery.data,
      isLoading: categoriesQuery.isLoading,
      isFetching: categoriesQuery.isFetching,
      error: categoriesQuery.error,
      isSuccess: categoriesQuery.isSuccess,
      status: categoriesQuery.status
    });
  }, [categoriesQuery]);

  React.useEffect(() => {
    console.log('Trips Query State:', {
      data: tripsQuery.data,
      isLoading: tripsQuery.isLoading,
      isFetching: tripsQuery.isFetching,
      error: tripsQuery.error,
      isSuccess: tripsQuery.isSuccess,
      status: tripsQuery.status
    });
  }, [tripsQuery]);

  React.useEffect(() => {
    console.log('Processed Categories:', categories);
    console.log('Processed Trips:', trips);
  }, [categories, trips]);

  return (
    <div className="container py-5" dir="rtl">
      <h1 className="text-center mb-5">اختبار التكامل مع Backend</h1>
      
      {/* API Base URL Info */}
      <div className="alert alert-info mb-4">
        <h5>معلومات الاتصال:</h5>
        <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'https://estabraq.runasp.net/api'}</p>
        <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
      </div>

      {/* Categories Section */}
      <section className="mb-5">
        <h2 className="mb-4">الفئات النشطة</h2>
        {categoriesLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">جاري التحميل...</span>
            </div>
          </div>
        )}
        
        {!!categoriesError && (
          <div className="alert alert-danger">
            <h5>خطأ في تحميل الفئات:</h5>
            <p>فشل في تحميل الفئات من الخادم</p>
          </div>
        )}
        
        {!categoriesLoading && !categoriesError && categories && categories.length === 0 && (
          <div className="alert alert-warning">لا توجد فئات متاحة</div>
        )}
        
        {categories && categories.length > 0 && (
          <div className="row g-3">
            {categories.map((category: Category) => (
              <div key={category.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  {category.imageUrl && (
                    <img 
                      src={category.imageUrl} 
                      className="card-img-top" 
                      alt={category.nameAr}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{category.nameAr || category.name || 'بدون اسم'}</h5>
                    <p className="card-text text-muted small">{category.name}</p>
                    <p className="card-text">{category.descriptionAr || category.description || 'بدون وصف'}</p>
                    <small className="text-success">
                      <i className="fas fa-map-marker-alt"></i> عدد الرحلات: {category.tripCount || 0}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Trips Section */}
      <section>
        <h2 className="mb-4">الرحلات المميزة</h2>
        {tripsLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">جاري التحميل...</span>
            </div>
          </div>
        )}
        
        {!!tripsError && (
          <div className="alert alert-danger">
            <h5>خطأ في تحميل الرحلات:</h5>
            <p>فشل في تحميل الرحلات من الخادم</p>
          </div>
        )}
        
        {!tripsLoading && !tripsError && trips && trips.length === 0 && (
          <div className="alert alert-warning">لا توجد رحلات مميزة متاحة</div>
        )}
        
        {trips && trips.length > 0 && (
          <div className="row g-4">
            {trips.map((trip: Trip) => (
              <div key={trip.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  {trip.imageUrl && (
                    <img 
                      src={trip.imageUrl} 
                      className="card-img-top" 
                      alt={trip.titleAr}
                      style={{ height: '250px', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg width='400' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial, sans-serif' font-size='16' text-anchor='middle' fill='%236c757d'%3E%D8%B5%D9%88%D8%B1%D8%A9 %D8%A7%D9%84%D8%B1%D8%AD%D9%84%D8%A9%3C/text%3E%3Ctext x='50%25' y='60%25' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='%23adb5bd'%3ETrip Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{trip.titleAr || trip.title}</h5>
                    <p className="card-text text-muted small">{trip.title}</p>
                    <p className="card-text">{trip.descriptionAr || trip.description}</p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-primary">
                        {trip.category?.nameAr || trip.category?.name || 'غير محدد'}
                      </span>
                      <span className="text-warning">
                        <i className="fas fa-star"></i>
                        {trip.isFeatured && <span className="ms-1">مميز</span>}
                      </span>
                    </div>
                    
                    <div className="row g-2 text-sm mb-2">
                      <div className="col-6">
                        <i className="fas fa-map-marker-alt text-danger"></i>
                        <span className="ms-1">{trip.locationAr || trip.location || 'غير محدد'}</span>
                      </div>
                      <div className="col-6">
                        <i className="fas fa-clock text-info"></i>
                        <span className="ms-1">{trip.duration || 0} أيام</span>
                      </div>
                      <div className="col-6">
                        <i className="fas fa-users text-success"></i>
                        <span className="ms-1">حتى {trip.maxParticipants || 0} أشخاص</span>
                      </div>
                      <div className="col-6">
                        <i className="fas fa-level-up-alt text-warning"></i>
                        <span className="ms-1">{trip.difficultyAr || trip.difficulty || 'غير محدد'}</span>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary mb-0">{trip.price || 0} جنيه</span>
                      <button className="btn btn-outline-primary btn-sm">
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Test Results Summary */}
      <div className="mt-5 p-4 bg-light rounded">
        <h3>ملخص نتائج الاختبار:</h3>
        <ul className="list-unstyled mb-0">
          <li>
            <i className={`fas ${categoriesError ? 'fa-times text-danger' : 'fa-check text-success'}`}></i>
            <span className="ms-2">
              الفئات: {categoriesError ? 'فشل' : `نجح (${categories ? categories.length : 0} فئة)`}
            </span>
            {categoriesLoading && <span className="ms-2 text-info">(جاري التحميل...)</span>}
          </li>
          <li>
            <i className={`fas ${tripsError ? 'fa-times text-danger' : 'fa-check text-success'}`}></i>
            <span className="ms-2">
              الرحلات المميزة: {tripsError ? 'فشل' : `نجح (${trips ? trips.length : 0} رحلة)`}
            </span>
            {tripsLoading && <span className="ms-2 text-info">(جاري التحميل...)</span>}
          </li>
        </ul>
        
        {/* Debug Information */}
        <details className="mt-3">
          <summary className="text-muted">معلومات التشخيص</summary>
          <div className="mt-2 small">
            <p><strong>Categories Query Status:</strong> {categoriesQuery.status}</p>
            <p><strong>Trips Query Status:</strong> {tripsQuery.status}</p>
            <p><strong>Categories Loading:</strong> {categoriesLoading ? 'نعم' : 'لا'}</p>
            <p><strong>Trips Loading:</strong> {tripsLoading ? 'نعم' : 'لا'}</p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default TestIntegrationPage;

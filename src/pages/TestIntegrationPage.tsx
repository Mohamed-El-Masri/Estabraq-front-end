import React from 'react';
import { useActiveCategories } from '../hooks/useCategories';
import { useFeaturedTrips } from '../hooks/useTrips';

const TestIntegrationPage: React.FC = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useActiveCategories();
  const { trips, loading: tripsLoading, error: tripsError } = useFeaturedTrips(8);

  // Debug: log the data to see what we're getting
  React.useEffect(() => {
    if (categories.length > 0) {
      console.log('Categories data:', categories);
    }
    if (trips.length > 0) {
      console.log('Trips data:', trips);
    }
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
        
        {categoriesError && (
          <div className="alert alert-danger">
            <h5>خطأ في تحميل الفئات:</h5>
            <p>{categoriesError}</p>
          </div>
        )}
        
        {!categoriesLoading && !categoriesError && categories.length === 0 && (
          <div className="alert alert-warning">لا توجد فئات متاحة</div>
        )}
        
        {categories.length > 0 && (
          <div className="row g-3">
            {categories.map((category) => (
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
        
        {tripsError && (
          <div className="alert alert-danger">
            <h5>خطأ في تحميل الرحلات:</h5>
            <p>{tripsError}</p>
          </div>
        )}
        
        {!tripsLoading && !tripsError && trips.length === 0 && (
          <div className="alert alert-warning">لا توجد رحلات مميزة متاحة</div>
        )}
        
        {trips.length > 0 && (
          <div className="row g-4">
            {trips.map((trip) => (
              <div key={trip.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  {trip.imageUrl && (
                    <img 
                      src={trip.imageUrl} 
                      className="card-img-top" 
                      alt={trip.titleAr}
                      style={{ height: '250px', objectFit: 'cover' }}
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
              الفئات: {categoriesError ? 'فشل' : `نجح (${categories.length} فئة)`}
            </span>
          </li>
          <li>
            <i className={`fas ${tripsError ? 'fa-times text-danger' : 'fa-check text-success'}`}></i>
            <span className="ms-2">
              الرحلات المميزة: {tripsError ? 'فشل' : `نجح (${trips.length} رحلة)`}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestIntegrationPage;

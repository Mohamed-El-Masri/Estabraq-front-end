import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { CategoriesQueryParams } from '../services/estabraqAPI';

const CategoriesTestPage: React.FC = () => {
  const [queryParams, setQueryParams] = useState<CategoriesQueryParams>({
    page: 1,
    pageSize: 10,
    isActive: true,
    sortBy: 'nameAr',
    sortDescending: false,
  });

  const { categories, loading, error, totalCount, totalPages, refetch } = useCategories(queryParams);

  const handleParamChange = (key: keyof CategoriesQueryParams, value: any) => {
    setQueryParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = (searchTerm: string) => {
    setQueryParams(prev => ({
      ...prev,
      search: searchTerm || undefined,
      page: 1 // Reset to first page when searching
    }));
  };

  return (
    <div className="container py-5" dir="rtl">
      <h1 className="text-center mb-5">اختبار API الفئات مع المعاملات الجديدة</h1>
      
      {/* API Info */}
      <div className="alert alert-info mb-4">
        <h5>معلومات الـ API:</h5>
        <p><strong>المسار:</strong> /Categories</p>
        <p><strong>المعاملات المدعومة:</strong> IsActive, SortBy, IsDescending, Page, PageSize, Search, SortDescending</p>
      </div>

      {/* Controls Panel */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">إعدادات البحث والترتيب</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {/* Search */}
            <div className="col-md-6">
              <label className="form-label">البحث:</label>
              <input
                type="text"
                className="form-control"
                placeholder="البحث في الفئات..."
                value={queryParams.search || ''}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Is Active */}
            <div className="col-md-6">
              <label className="form-label">حالة النشاط:</label>
              <select
                className="form-select"
                value={queryParams.isActive?.toString() || 'all'}
                onChange={(e) => handleParamChange('isActive', 
                  e.target.value === 'all' ? undefined : e.target.value === 'true'
                )}
              >
                <option value="all">الكل</option>
                <option value="true">نشط فقط</option>
                <option value="false">غير نشط فقط</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="col-md-4">
              <label className="form-label">ترتيب حسب:</label>
              <select
                className="form-select"
                value={queryParams.sortBy || ''}
                onChange={(e) => handleParamChange('sortBy', e.target.value || undefined)}
              >
                <option value="">بدون ترتيب</option>
                <option value="name">الاسم الإنجليزي</option>
                <option value="nameAr">الاسم العربي</option>
                <option value="tripCount">عدد الرحلات</option>
                <option value="createdAt">تاريخ الإنشاء</option>
              </select>
            </div>

            {/* Sort Direction */}
            <div className="col-md-4">
              <label className="form-label">اتجاه الترتيب:</label>
              <select
                className="form-select"
                value={queryParams.sortDescending ? 'desc' : 'asc'}
                onChange={(e) => handleParamChange('sortDescending', e.target.value === 'desc')}
              >
                <option value="asc">تصاعدي</option>
                <option value="desc">تنازلي</option>
              </select>
            </div>

            {/* Page Size */}
            <div className="col-md-4">
              <label className="form-label">عدد العناصر في الصفحة:</label>
              <select
                className="form-select"
                value={queryParams.pageSize || 10}
                onChange={(e) => handleParamChange('pageSize', parseInt(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <button 
              className="btn btn-primary me-2" 
              onClick={refetch}
              disabled={loading}
            >
              {loading ? 'جاري التحديث...' : 'تحديث النتائج'}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setQueryParams({
                page: 1,
                pageSize: 10,
                isActive: true,
                sortBy: 'nameAr',
                sortDescending: false,
              })}
            >
              إعادة تعيين
            </button>
          </div>
        </div>
      </div>

      {/* Current Query Display */}
      <div className="card mb-4">
        <div className="card-header">
          <h6 className="mb-0">المعاملات الحالية:</h6>
        </div>
        <div className="card-body">
          <pre className="bg-light p-2 rounded">
            {JSON.stringify(queryParams, null, 2)}
          </pre>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">النتائج</h5>
          <div>
            <span className="badge bg-primary me-2">
              إجمالي: {totalCount}
            </span>
            <span className="badge bg-secondary">
              صفحة {queryParams.page || 1} من {totalPages}
            </span>
          </div>
        </div>
        <div className="card-body">
          {loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger">
              <h6>خطأ في تحميل البيانات:</h6>
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && categories.length === 0 && (
            <div className="alert alert-warning">لا توجد فئات تطابق المعايير المحددة</div>
          )}
          
          {categories.length > 0 && (
            <>
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
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-title">{category.nameAr || category.name}</h6>
                          <span className={`badge ${category.isActive ? 'bg-success' : 'bg-secondary'}`}>
                            {category.isActive ? 'نشط' : 'غير نشط'}
                          </span>
                        </div>
                        <p className="card-text text-muted small">{category.name}</p>
                        <p className="card-text">{category.descriptionAr || category.description}</p>
                        <small className="text-primary">
                          <i className="fas fa-map-marker-alt"></i> عدد الرحلات: {category.tripCount || 0}
                        </small>
                        <br />
                        <small className="text-muted">
                          <i className="fas fa-calendar"></i> {new Date(category.createdAt).toLocaleDateString('ar-SA')}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${(queryParams.page || 1) === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handleParamChange('page', (queryParams.page || 1) - 1)}
                        disabled={(queryParams.page || 1) === 1}
                      >
                        السابق
                      </button>
                    </li>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <li key={page} className={`page-item ${(queryParams.page || 1) === page ? 'active' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => handleParamChange('page', page)}
                          >
                            {page}
                          </button>
                        </li>
                      );
                    })}
                    
                    <li className={`page-item ${(queryParams.page || 1) === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handleParamChange('page', (queryParams.page || 1) + 1)}
                        disabled={(queryParams.page || 1) === totalPages}
                      >
                        التالي
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesTestPage;

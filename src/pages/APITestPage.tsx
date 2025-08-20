import React from 'react';
import { useAPITest } from '../hooks/useAPITest';
import { useActiveCategories } from '../hooks/useCategories';
import { useFeaturedTrips } from '../hooks/useTrips';

const APITestPage: React.FC = () => {
  const { apiStatus, dbStatus, error, details, refetch } = useAPITest();
  const { categories, loading: categoriesLoading, error: categoriesError } = useActiveCategories();
  const { trips, loading: tripsLoading, error: tripsError } = useFeaturedTrips();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'متصل ✅';
      case 'error': return 'خطأ ❌';
      default: return 'جاري التحميل ⏳';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">اختبار الاتصال بالـ API</h1>
        
        {/* API Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">حالة الخادم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold">API Server</h3>
              <p className={getStatusColor(apiStatus)}>{getStatusText(apiStatus)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold">Database</h3>
              <p className={getStatusColor(dbStatus)}>{getStatusText(dbStatus)}</p>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 font-semibold">خطأ:</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {details && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="font-semibold">تفاصيل قاعدة البيانات:</p>
              <pre className="text-sm mt-2 bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(details, null, 2)}
              </pre>
            </div>
          )}
          
          <button 
            onClick={refetch}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            إعادة الاختبار
          </button>
        </div>

        {/* Categories Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">اختبار الفئات</h2>
          {categoriesLoading && <p>جاري تحميل الفئات...</p>}
          {categoriesError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">خطأ في تحميل الفئات: {categoriesError}</p>
            </div>
          )}
          {categories.length > 0 && (
            <div>
              <p className="text-green-600 font-semibold">تم تحميل {categories.length} فئة بنجاح ✅</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold">{category.nameAr || category.name || 'بدون اسم'}</h3>
                    <p className="text-sm text-gray-600">{category.name}</p>
                    <p className="text-xs text-gray-500">عدد الرحلات: {category.tripCount || 0}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trips Test */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">اختبار الرحلات المميزة</h2>
          {tripsLoading && <p>جاري تحميل الرحلات...</p>}
          {tripsError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">خطأ في تحميل الرحلات: {tripsError}</p>
            </div>
          )}
          {trips.length > 0 && (
            <div>
              <p className="text-green-600 font-semibold">تم تحميل {trips.length} رحلة مميزة بنجاح ✅</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trips.map((trip) => (
                  <div key={trip.id} className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold">{trip.titleAr || trip.title || 'بدون عنوان'}</h3>
                    <p className="text-sm text-gray-600">{trip.title}</p>
                    <p className="text-sm font-semibold text-blue-600">{trip.price || 0} جنيه</p>
                    <p className="text-xs text-gray-500">المدة: {trip.duration || 0} أيام</p>
                    <p className="text-xs text-gray-500">الفئة: {trip.category?.nameAr || trip.category?.name || 'غير محدد'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APITestPage;

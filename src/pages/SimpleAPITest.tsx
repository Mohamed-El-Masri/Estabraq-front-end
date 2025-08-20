import React, { useState } from 'react';
import { categoriesAPI, tripsAPI, healthAPI } from '../services/estabraqAPI';

const SimpleAPITest: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test: string, success: boolean, data: any, error?: string) => {
    setResults(prev => [...prev, {
      test,
      success,
      data,
      error,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testHealthAPI = async () => {
    try {
      const response = await healthAPI.checkAPI();
      addResult('Health Check', true, response);
    } catch (error: any) {
      addResult('Health Check', false, null, error.message);
    }
  };

  const testDatabaseAPI = async () => {
    try {
      const response = await healthAPI.checkDatabase();
      addResult('Database Check', true, response);
    } catch (error: any) {
      addResult('Database Check', false, null, error.message);
    }
  };

  const testCategoriesAPI = async () => {
    try {
      const response = await categoriesAPI.getActive();
      addResult('Categories API', response.success, response.data, response.message);
    } catch (error: any) {
      addResult('Categories API', false, null, error.message);
    }
  };

  const testTripsAPI = async () => {
    try {
      const response = await tripsAPI.getFeatured(3);
      addResult('Featured Trips API', response.success, response.data, response.message);
    } catch (error: any) {
      addResult('Featured Trips API', false, null, error.message);
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setResults([]);
    
    await testHealthAPI();
    await testDatabaseAPI();
    await testCategoriesAPI();
    await testTripsAPI();
    
    setLoading(false);
  };

  return (
    <div className="container py-5" dir="rtl">
      <h1 className="text-center mb-4">اختبار الـ API البسيط</h1>
      
      <div className="text-center mb-4">
        <button 
          className="btn btn-primary btn-lg"
          onClick={runAllTests}
          disabled={loading}
        >
          {loading ? 'جاري التشغيل...' : 'تشغيل جميع الاختبارات'}
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h3>اختبارات فردية</h3>
          <div className="d-grid gap-2">
            <button className="btn btn-outline-primary" onClick={testHealthAPI}>
              اختبار Health API
            </button>
            <button className="btn btn-outline-info" onClick={testDatabaseAPI}>
              اختبار Database
            </button>
            <button className="btn btn-outline-success" onClick={testCategoriesAPI}>
              اختبار Categories API
            </button>
            <button className="btn btn-outline-warning" onClick={testTripsAPI}>
              اختبار Trips API
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <h3>النتائج</h3>
          {results.length === 0 ? (
            <p className="text-muted">لم يتم تشغيل أي اختبار بعد</p>
          ) : (
            <div className="list-group">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className={`list-group-item ${result.success ? 'list-group-item-success' : 'list-group-item-danger'}`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-1">
                      {result.success ? '✅' : '❌'} {result.test}
                    </h6>
                    <small>{result.timestamp}</small>
                  </div>
                  
                  {result.error && (
                    <p className="mb-1 text-danger small">
                      <strong>خطأ:</strong> {result.error}
                    </p>
                  )}
                  
                  {result.data && (
                    <details>
                      <summary className="small text-muted">عرض البيانات</summary>
                      <pre className="small mt-2 bg-light p-2 rounded">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 p-4 bg-light rounded">
        <h4>معلومات الإعداد</h4>
        <ul className="list-unstyled">
          <li><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'https://estabraq.runasp.net/api'}</li>
          <li><strong>Environment:</strong> {import.meta.env.MODE}</li>
          <li><strong>Production:</strong> {import.meta.env.PROD ? 'نعم' : 'لا'}</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleAPITest;

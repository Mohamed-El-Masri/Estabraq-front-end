import { useState, useEffect } from 'react';
import { healthAPI } from '../services/estabraqAPI';

export const useAPITest = () => {
  const [apiStatus, setAPIStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [dbStatus, setDbStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);

  const testAPI = async () => {
    try {
      // Test API health
      const apiResponse = await healthAPI.checkAPI();
      console.log('API Health:', apiResponse);
      setAPIStatus('connected');
    } catch (err: any) {
      console.error('API Test failed:', err);
      setAPIStatus('error');
      setError(err.message);
    }
  };

  const testDatabase = async () => {
    try {
      // Test database health
      const dbResponse = await healthAPI.checkDatabase();
      console.log('Database Health:', dbResponse);
      setDbStatus('connected');
      setDetails(dbResponse);
    } catch (err: any) {
      console.error('Database Test failed:', err);
      setDbStatus('error');
      setError(err.message);
    }
  };

  useEffect(() => {
    testAPI();
    testDatabase();
  }, []);

  return {
    apiStatus,
    dbStatus,
    error,
    details,
    refetch: () => {
      setAPIStatus('loading');
      setDbStatus('loading');
      setError(null);
      testAPI();
      testDatabase();
    }
  };
};

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Import global styles
import './styles/variables.css';

// Import components
import AppNavbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Import pages
import HomePage from './pages/Home';
import TripsPage from './pages/Trips';
import TripDetailsPage from './pages/TripDetails';
import BookingPage from './pages/Booking';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import SitemapPage from './pages/Sitemap';
import APITestPage from './pages/APITestPage';
import TestIntegrationPage from './pages/TestIntegrationPage';
import SimpleAPITest from './pages/SimpleAPITest';
import CategoriesTestPage from './pages/CategoriesTestPage';

// Import styles and i18n
import './styles/global.css';
import './i18n';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnMount: true, // Always refetch on mount
      refetchOnReconnect: true,
      keepPreviousData: true,
      refetchInterval: false, // Disable automatic refetching
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    // Set initial direction and language
    const savedLanguage = localStorage.getItem('i18nextLng') || 'ar';
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', savedLanguage);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App min-vh-100 d-flex flex-column">
          {/* Navigation */}
          <AppNavbar />
          
          {/* Main Content */}
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/trips/:id" element={<TripDetailsPage />} />
              <Route path="/trips/:id/book" element={<BookingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/api-test" element={<APITestPage />} />
              <Route path="/test-integration" element={<TestIntegrationPage />} />
              <Route path="/simple-api-test" element={<SimpleAPITest />} />
              <Route path="/categories-test" element={<CategoriesTestPage />} />
              
              {/* 404 Page */}
              <Route path="*" element={
                <div className="container text-center py-5">
                  <h1 className="display-1">404</h1>
                  <p className="lead">الصفحة غير موجودة</p>
                  <a href="/" className="btn btn-primary">العودة للرئيسية</a>
                </div>
              } />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#2C3E50',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
              success: {
                style: {
                  background: '#1ABC9C',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#1ABC9C',
                },
              },
              error: {
                style: {
                  background: '#E74C3C',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#E74C3C',
                },
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

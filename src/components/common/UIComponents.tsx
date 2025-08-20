import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'جاري التحميل...' 
}) => (
  <div className="d-flex justify-content-center align-items-center py-5">
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-2 text-muted">{message}</p>
    </div>
  </div>
);

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  title = 'حدث خطأ',
  message, 
  onRetry 
}) => (
  <div className="alert alert-danger" role="alert">
    <h5 className="alert-heading">
      <i className="fas fa-exclamation-triangle me-2"></i>
      {title}
    </h5>
    <p className="mb-0">{message}</p>
    {onRetry && (
      <>
        <hr />
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={onRetry}
        >
          <i className="fas fa-redo me-1"></i>
          إعادة المحاولة
        </button>
      </>
    )}
  </div>
);

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  icon = 'fas fa-inbox' 
}) => (
  <div className="text-center py-5">
    <i className={`${icon} fa-3x text-muted mb-3`}></i>
    <h5 className="text-muted">{title}</h5>
    <p className="text-muted">{message}</p>
  </div>
);

import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'primary' | 'secondary' | 'light';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  variant = 'primary',
  fullScreen = false
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'sm': return { width: '1.5rem', height: '1.5rem' };
      case 'lg': return { width: '4rem', height: '4rem' };
      default: return { width: '2.5rem', height: '2.5rem' };
    }
  };

  const content = (
    <div className={`loading-spinner ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner-content">
        <Spinner
          animation="border"
          variant={variant}
          style={getSpinnerSize()}
          className="estabraq-spinner"
        />
        {text && (
          <p className="spinner-text mt-3 mb-0">
            {text}
          </p>
        )}
      </div>
    </div>
  );

  return content;
};

export default LoadingSpinner;

import React, { useState } from 'react';
import BaseButton from './BaseButton/BaseButton.tsx';

const ErrorButton: React.FC = () => {
  const [error, setError] = useState('');
  const handleClick = () => {
    setError('This is the Error for testing ErrorBoundary');
  };

  if (error) throw new Error(error);
  return (
    <BaseButton data-testid="error-button" type="button" onClick={handleClick}>
      Emit an error
    </BaseButton>
  );
};

export default ErrorButton;

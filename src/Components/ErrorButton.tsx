import React, { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [error, setError] = useState('');
  const handleClick = () => {
    setError('This is the Error for testing ErrorBoundary');
  };

  if (error) throw new Error(error);
  return (
    <button
      data-testid="error-button"
      type="button"
      onClick={handleClick}
      className="cursor-pointer w-full rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      Emit an error
    </button>
  );
};

export default ErrorButton;

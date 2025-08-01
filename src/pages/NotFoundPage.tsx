import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 gap-2">
      <h2 className="text-6xl font-bold text-red-600 mb-4">404</h2>
      <p className="text-2xl mb-2">Page Not Found</p>
      <button
        className="cursor-pointer w-full max-w-xs rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        onClick={() => navigate('/')}
      >
        Go to the home page
      </button>
    </div>
  );
};

export default NotFoundPage;

import React from 'react';

interface ILoaderProps {
  className?: string;
}

const Loader: React.FC<ILoaderProps> = ({ className }) => {
  return (
    <div
      className={
        'backdrop-blur-xs absolute z-50 contain-layout flex flex-col justify-center items-center w-full h-full' +
        ` ${className}`
      }
    >
      <img
        data-testid="loader-image"
        className="animate-pulse z-200"
        src="/loader.svg"
        alt="loader"
      />
    </div>
  );
};
export default Loader;

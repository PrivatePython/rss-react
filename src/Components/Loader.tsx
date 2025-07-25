import React from 'react';

const Loader: React.FC = () => {
  return (
    <>
      <div className=" backdrop-blur-xs absolute z-50 contain-layout flex flex-col justify-center items-center w-full h-full">
        <img
          data-testid="loader-image"
          className="animate-pulse z-200"
          src="/loader.svg"
          alt="loader"
        />
      </div>
    </>
  );
};
export default Loader;

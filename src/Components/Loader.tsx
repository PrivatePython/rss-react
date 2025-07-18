import React from 'react';

class Loader extends React.Component<React.PropsWithChildren> {
  render() {
    return (
      <>
        <div className=" backdrop-blur-xs absolute z-50 contain-layout flex flex-col justify-center items-center w-full h-full">
          <img className="animate-pulse z-200 " src="/loader.svg" alt="loader" />
        </div>
      </>
    );
  }
}
export default Loader;

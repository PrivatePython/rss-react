import React from 'react';
import Header from './Header.tsx';
import Main from './Main.tsx';
import Loader from '../Loader.tsx';

const Layout: React.FC<React.PropsWithChildren<{ isLoading: boolean }>> = ({
  isLoading,
  children,
}) => {
  return (
    <div className="contain-layout flex flex-col h-screen">
      {isLoading && <Loader />}
      <Header />
      <Main>{children}</Main>
    </div>
  );
};
export default Layout;

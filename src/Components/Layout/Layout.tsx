import React from 'react';
import Header from './Header.tsx';
import Main from './Main.tsx';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="contain-layout flex flex-col h-screen">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};
export default Layout;

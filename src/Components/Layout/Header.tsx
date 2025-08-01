import React from 'react';
import NavBar from '../NavBar.tsx';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="shadow-xl mx-auto h-12 w-full p-1">
      <div className="mx-auto h-full w-full max-w-2xl flex justify-between items-center">
        <img
          onClick={() => {
            navigate('/');
          }}
          src="/logo.png"
          alt={'logo'}
          className="h-full cursor-pointer"
        />
        <NavBar />
      </div>
    </header>
  );
};

export default Header;

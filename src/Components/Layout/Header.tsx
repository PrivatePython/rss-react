import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-10 w-full flex justify-center items-center">
      <img src="/logo.png" alt={'logo'} className="h-full" />
    </header>
  );
};

export default Header;

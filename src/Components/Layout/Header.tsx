import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="h-10 w-full flex justify-center items-center">
        <img src="/src/assets/logo.png" alt={'logo'} className="h-full" />
      </header>
    );
  }
}

export default Header;

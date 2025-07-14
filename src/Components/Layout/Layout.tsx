import React from 'react';
import Header from './Header.tsx';
import Main from './Main.tsx';

class Layout extends React.Component<React.PropsWithChildren> {
  render() {
    return (
      <div className="contain-layout flex flex-col h-screen">
        <Header />
        <Main>{this.props.children}</Main>
      </div>
    );
  }
}
export default Layout;

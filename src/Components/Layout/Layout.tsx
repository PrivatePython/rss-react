import React from 'react';
import Header from './Header.tsx';
import Main from './Main.tsx';
import Loader from '../Loader.tsx';

class Layout extends React.Component<React.PropsWithChildren<{ isLoading: boolean }>> {
  render() {
    return (
      <div className="contain-layout flex flex-col h-screen">
        {this.props.isLoading && <Loader />}
        <Header />
        <Main>{this.props.children}</Main>
      </div>
    );
  }
}
export default Layout;

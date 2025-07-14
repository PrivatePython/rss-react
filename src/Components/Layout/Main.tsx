import React from 'react';

class Main extends React.Component<React.PropsWithChildren> {
  render() {
    return (
      <main className="grow overflow-y-auto flex flex-col items-center gap-2">
        {this.props.children}
      </main>
    );
  }
}
export default Main;

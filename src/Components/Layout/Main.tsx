import React from 'react';

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className="grow overflow-y-auto flex flex-col items-center gap-2">{children}</main>;
};
export default Main;

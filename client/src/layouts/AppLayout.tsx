import React from "react";
import Header from "../components/Header";

type ChildProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: ChildProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-1">{children}</div>
    </div>
  );
};

export default AppLayout;

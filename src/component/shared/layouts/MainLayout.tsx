import React from "react";
import Footer from "../footer";
import MainHeader from "../header/DashboardHeader";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const MainLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col">
      <MainHeader />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

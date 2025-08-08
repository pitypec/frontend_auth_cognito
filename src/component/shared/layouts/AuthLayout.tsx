import React from "react";
// import Footer from "../footer";
// import AuthHeader from "../header/AuthHeader";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen w-[100%] flex items-center justify-center relative">
      {/* <AuthHeader /> */}
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default AuthLayout;

// import DashboardHeader from "../header/DashboardHeader";
// import Footer from "../footer";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../header/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col">
      <main>
        <DashboardHeader />
        <Outlet />
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default DashboardLayout;

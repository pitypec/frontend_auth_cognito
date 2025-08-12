import { FaBell, FaSearch } from "react-icons/fa";
import Logo from "../../../assets/react.svg";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-6 py-3">
      {/* Left: Logo / Title */}
      <div className="flex items-center gap-3">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
      </div>

      {/* Middle: Search */}
      <div className="flex-1 max-w-md mx-6 relative">
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell className="text-gray-600" size={20} />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 focus:outline-none">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              {"Emmanuel"[0].toUpperCase()}
            </div>
            <span className="text-sm font-medium">{"Emmanuel"}</span>
          </button>

          {/* Dropdown */}
        </div>
        <div className="mt-2 w-40 bg-white border border-gray-200 rounded-lg">
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

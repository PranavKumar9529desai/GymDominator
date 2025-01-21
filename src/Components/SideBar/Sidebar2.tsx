import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserDetailsAtom } from "@state/Atom/userDeatilsAtom";
import { FetchUserData } from "@hooks/FetchUserData";
import { coustomLogoutAlert } from "@components/customAlerts";
import { ChevronRight, ChevronDown, User, LogOut } from "lucide-react";
import { routes } from "@components/Dashboard/PremiumUsersBNC";
import { Route } from "@components/Dashboard/PremiumUsersBNC";
import { FiHeart, FiUser, FiCreditCard } from "react-icons/fi";
import { GiGymBag } from "react-icons/gi";
export const Sidebar2 = () => {
  const { isloading, userdata } = FetchUserData();
  const UserDetails = useRecoilValue(UserDetailsAtom);
  const [activeRoute, setActiveRoute] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveRoute(currentPath);
    setExpandedItems(() =>
      routes
        .filter((item) => item.subRoutes && currentPath.startsWith(item.path))
        .map((item) => item.name)
    );
  }, [location]);

  const handleItemClick = (item: Route) => {
    if (item.subRoutes) {
      setExpandedItems((prevItems) =>
        prevItems.includes(item.name)
          ? prevItems.filter((i) => i !== item.name)
          : [...prevItems, item.name]
      );
    } else {
      navigate(item.path);
    }
  };

  const isActive = (item: Route) =>
    activeRoute === item.path ||
    (item.subRoutes &&
      item.subRoutes.some((subItem) => activeRoute === subItem.path));

  return (
    <div className="flex flex-col bg-slate-900 text-white w-64 h-screen ">
      {/* Logo Section */}
      <div className=" flex items-center justify-start py-6 px-4  w-fit  mx-auto space-x-2">
        <img
          src="/favicon.ico"
          alt="Gymnavigator Logo"
          className="rounded-full w-10 h-10"
        />
        <h1 className="ml-2 text-xl font-bold text-white">GymNavigator</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow px-4 py-2">
        <ul className="space-y-2">
          {routes.map((item) => (
            <li key={item.name} className="whitespace-nowrap">
              <button
                onClick={() => handleItemClick(item)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 
                  ${
                    isActive(item)
                      ? "bg-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
                {item.subRoutes &&
                  (expandedItems.includes(item.name) ? (
                    <ChevronDown className="w-5 h-5 ml-auto" />
                  ) : (
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  ))}
              </button>
              {item.subRoutes && expandedItems.includes(item.name) && (
                <ul className="ml-6 mt-2 space-y-2">
                  {item.subRoutes.map((subItem) => (
                    <li key={subItem.name}>
                      <button
                        onClick={() => navigate(subItem.path)}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 
                          ${
                            activeRoute === subItem.path
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                      >
                        <span>{subItem.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout Section */}
      <div className="p-4 border-t border-gray-800 relative group">
        {/* Profile Dropdown Menu - Shows on hover */}
        <div className="absolute bottom-full left-0 w-full p-4 bg-slate-900 rounded-t-lg border-t border-x border-gray-800 shadow-lg 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 
          group-hover:translate-y-0">
          <div className="space-y-2">
            <button
              onClick={() => navigate("/dashboard/health-profile")}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <FiHeart className="w-5 h-5 mr-3" />
              <span>Health Profile</span>
            </button>
            <button
              onClick={() => navigate("/dashboard/gym")}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <GiGymBag className="w-5 h-5 mr-3" />
              <span>My Gym</span>
            </button>
            <button
              onClick={() => navigate("/dashboard/trainer")}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <FiUser className="w-5 h-5 mr-3" />
              <span>About Trainer</span>
            </button>
            <button
              onClick={() => navigate("/dashboard/wallet")}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <FiCreditCard className="w-5 h-5 mr-3" />
              <span>Wallet</span>
            </button>
            <div className="pt-2 border-t border-gray-800">
              <button
                onClick={() => coustomLogoutAlert(navigate)}
                className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Button */}
        <div className="p-3 bg-gray-800/50 rounded-lg flex items-center w-full hover:bg-gray-700/50 transition-colors duration-200">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-gray-300" />
          </div>
          <div className="flex-grow text-left">
            {isloading ? (
              <>
                <p className="font-medium text-white">{UserDetails.name}</p>
                <p className="text-sm text-gray-400">Premium Member</p>
              </>
            ) : (
              <>
                <p className="font-medium text-white">
                  {userdata?.name ?? "Guest"}
                </p>
                <p className="text-sm text-gray-400">GymNavigator</p>
              </>
            )}
          </div>
          <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:rotate-180" />
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserDetailsAtom } from "@state/Atom/userDeatilsAtom";
import { FetchUserData } from "@hooks/FetchUserData";
import { coustomLogoutAlert } from "@components/customAlerts";
import Gymdominator from "@assets/Gymdominator.ico";
import { ChevronRight, ChevronDown, User, LogOut } from "lucide-react";
import { routes } from "@components/Dashboard/PremiumUsersBNC";
import { Route } from "@components/Dashboard/PremiumUsersBNC";

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
    <div className="flex flex-col bg-slate-900 text-white w-64 h-screen">
      {/* Logo Section */}
      <div className="px-4 w-full flex items-center justify-center">
        <img
          src={Gymdominator}
          alt="GymDominator Logo"
          className="rounded-full w-32 h-32 p-6"
        />
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
                {item.subRoutes && (
                  expandedItems.includes(item.name) ? (
                    <ChevronDown className="w-5 h-5 ml-auto" />
                  ) : (
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  )
                )}
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
      <div className="p-4 border-t border-gray-800">
        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            {isloading ? (
              <>
                <p className="font-medium text-white">{UserDetails.name}</p>
                <p className="text-sm text-gray-400">Premium Member</p>
              </>
            ) : (
              <>
                <p className="font-medium text-white">{userdata?.name ?? 'Guest'}</p>
                <p className="text-sm text-gray-400">GymNavigator</p>
              </>
            )}
          </div>
        </div>
        <button 
          onClick={() => coustomLogoutAlert(navigate)}
          className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

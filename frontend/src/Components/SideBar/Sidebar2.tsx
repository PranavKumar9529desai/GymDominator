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

  const renderRoute = (item: Route) => (
    <li key={item.name}>
      <button
        onClick={() => handleItemClick(item)}
        className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
          isActive(item)
            ? "bg-blue-600 text-white"
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
          {item.subRoutes.map((subItem) => renderRoute(subItem))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="flex flex-col bg-gray-900 text-white w-full py-8 h-dvh">
      <div className="flex items-center mb-8 px-2 relative left-1">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
          <img src={Gymdominator} alt="GymDominator Logo" className="cover" />
        </div>
        <h1 className="text-2xl font-bold">GymDominator</h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-3">{routes.map(renderRoute)}</ul>
      </nav>

      <div className="mt-auto">
        <div className="flex items-center px-4 py-2 mb-4 bg-gray-800 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
            <User className="w-6 h-6" />
          </div>
          <div>
            {isloading ? (
              <>
                <p className="font-medium">{UserDetails.name}</p>
                <p className="text-sm text-gray-400">Premium Member</p>
              </>
            ) : (
              <>
                <p className="font-medium">{userdata.name}</p>
                <p className="text-sm text-gray-400">Gymdominator</p>
              </>
            )}
          </div>
        </div>
        <button
          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          onClick={() => coustomLogoutAlert(navigate)}
        >
          <LogOut className="w-5 h-5 mr-3 text-red-400" />
          <span className="text-red-400">Logout</span>
        </button>
      </div>
    </div>
  );
};

import { coustomLogoutAlert } from "@components/customAlerts";
import Gymdominator from "@assets/Gymdominator.ico";
// import { UserDetailsAtom } from "@state/Atom/userDeatilsAtom";
import {
  ChevronRight,
  ChevronDown,
  BarChart2,
  Dumbbell,
  Utensils,
  Book,
  Calendar,
  User,
  LogOut,
  TrendingUp,
  LineChart,
  LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserDetailsAtom } from "@state/Atom/userDeatilsAtom";

// interface UserDeatailsFromStrorageType {
//   id: number;
//   userid: number;
//   fullname: string;
//   diet: string;
//   height: number;
//   weight: number;
//   contact: string;
// }

export const Sidebar2 = () => {
  
  let UserDetails : { name : string } = useRecoilValue(UserDetailsAtom);
  const [activePage, setActivePage] = useState("My Progress");
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const navigate = useNavigate();
  const url = useLocation();
  const urlRoute = url.pathname.split("/");

  const acRoute = urlRoute[urlRoute.length - 1];
  interface SubItmestype {
    name: string;
    link: string;
  }

  interface menuItem {
    name: string;
    icon: LucideIcon;
    label: string;
    subItems?: SubItmestype[];
    link?: string;
  }

  const SubItems = [
    {
      name: "Week Progress",
      link: "/dashboard/myprogress/week",
      label: "week",
    },
    {
      name: "Month Progress",
      link: "/dashboard/myprogress/month",
      label: "month",
    },
  ];

  const menuItems = [
    {
      name: "My Progress",
      icon: BarChart2,
      subItems: SubItems,
      label: "myprogress",
    },
    {
      name: "Workouts",
      icon: Dumbbell,
      link: "/dashboard/workouts",
      label: "workouts",
    },
    { name: "Diet", icon: Utensils, link: "/dashboard/diet", label: "Diet" },
    {
      name: "Recipes",
      icon: Book,
      link: "/dashboard/recipes",
      label: "Recipes",
    },
    {
      name: "Today's plan",
      icon: Calendar,
      link: "/dashboard/today'splan",
      label: "today'splan",
    },
  ];

  const handleItemClick = (item: menuItem) => {
    // @ts-ignore
    navigate(item.link);
    if (item.name === "My Progress") {
      setIsProgressOpen(!isProgressOpen);
    } else {
      setIsProgressOpen(false);
    }
  };
  useEffect(() => {
    if (acRoute == "week" || acRoute == "month") {
      setActivePage("myprogress");
    } else {
      setActivePage(acRoute);
    }
  }, [acRoute]);


  return (
    <div className="flex flex-col  bg-gray-900 text-white w-full py-8 h-dvh">
      <div className="flex items-center mb-8 px-2 relative left-1">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
          {/* <Dumbbell className="w-6 h-6" /> */}
          <img src={Gymdominator} alt="" className="cover" />
        </div>
        <h1 className="text-2xl font-bold">GymDominator</h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleItemClick(item)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activePage === item.label?.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                aria-expanded={
                  item.name === "My Progress" ? isProgressOpen : undefined
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
                {item.name === "My Progress" &&
                  (isProgressOpen ? (
                    <ChevronDown className="w-5 h-5 ml-auto" />
                  ) : (
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  ))}
              </button>
              {item.name === "My Progress" && isProgressOpen && (
                <ul className="ml-6 mt-2 space-y-2 transition-all duration-200 ease-in-out">
                  {/* @ts-ignore */}
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <button
                        onClick={() => {
                          setActivePage(subItem.name);
                          navigate(subItem.link);
                        }}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                          activePage === subItem.name
                            ? "bg-blue-700 text-white"
                            : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        {subItem.name === "Week Progress" ? (
                          <TrendingUp className="w-4 h-4 mr-3" />
                        ) : (
                          <LineChart className="w-4 h-4 mr-3" />
                        )}
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

      <div className="mt-auto">
        <div className="flex items-center px-4 py-2 mb-4 bg-gray-800 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="font-medium">{UserDetails.name}</p>
            <p className="text-sm text-gray-400">Premium Member</p>
          </div>
        </div>
        <button
          className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          onClick={() => {
            coustomLogoutAlert(navigate);
          }}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

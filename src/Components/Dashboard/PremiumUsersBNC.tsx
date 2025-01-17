import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Activity,
  Utensils,
  Dumbbell,
  UserCheck,
  ChevronUp,
  TrendingUp,
  Scan,
  DumbbellIcon,
} from "lucide-react";

export type Route = {
  name: string;
  path: string;
  icon: React.ElementType;
  subRoutes?: { name: string; path: string; icon: React.ElementType }[];
};

export const routes: Route[] = [
  {
    name: "Progress",
    path: "/dashboard/myprogress",
    icon: Activity,
    subRoutes: [
      {
        name: "Monthly Progress",
        path: "/dashboard/myprogress/month",
        icon: TrendingUp,
      },
    ],
  },
  {
    name: "Workout",
    path: "/dashboard/workouts",
    icon: Dumbbell,
    subRoutes: [
      {
        name: "View Workouts",
        path: "/dashboard/workouts/viewworkouts",
        icon: DumbbellIcon,
      },
      {
        name: "Personaliezed Workout",
        path: "/dashboard/workouts/personalizedworkout",
        icon: DumbbellIcon,
      },
    ],
  },
  {
    name: "Diet",
    path: "/dashboard/diet",
    icon: Utensils,
    subRoutes: [
      {
        name: "Personlized Diets",
        icon: Utensils,
        path: "/dashboard/diet/personalizeddiet",
      },
      {
        name: "Grocery List",
        icon: Utensils,
        path: "/dashboard/diet/grocerylist",
      },
    ],
  },
  {
    name: "Attendance",
    path: "/dashboard/attendance",
    icon: UserCheck,
    subRoutes: [
      {
        name: "Attendanc QR Scanner ",
        path: "/dashboard/attendance/qrscanner",
        icon: Scan,
      },
      {
        name: "Today's Attendance",
        path: "/dashboard/attendance/todaysattendance",
        icon: UserCheck,
      },
    ],
  },
];

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      setIsDrawerVisible(true);
    } else {
      const timer = setTimeout(() => setIsDrawerVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  const isActive = (route: Route) => {
    console.log(
      "route.path and location.pahthname is ",
      route.path,
      location.pathname
    );
    return (
      location.pathname === route.path ||
      location.pathname.startsWith(`${route.path}/`)
    );
  };

  const handleNavigation = (route: Route) => {
    if (route.subRoutes) {
      setActiveRoute(route);
      setIsDrawerOpen(true);
    } else {
      navigate(route.path);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-40">
        <div className="grid grid-cols-4 h-16">
          {routes.map((route) => (
            <button
              key={route.name}
              className={`h-full flex flex-col items-center justify-center space-y-1 ${
                isActive(route) ? "bg-gray-100 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleNavigation(route)}
            >
              <route.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{route.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {isDrawerVisible && (
        <div
          className={`fixed inset-0  transition-opacity duration-300 ease-in-out z-50 ${
            isDrawerOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg transform transition-all duration-300 ease-in-out ${
              isDrawerOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="p-4">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-3 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Close drawer"
              >
                <ChevronUp size={24} />
              </button>
              <h2 className="text-2xl font-bold text-center mt-6 mb-4 text-gray-800">
                {activeRoute?.name}
              </h2>
              <div className="space-y-2">
                {activeRoute?.subRoutes?.map((subRoute) => (
                  <button
                    key={subRoute.name}
                    onClick={() => {
                      navigate(subRoute.path);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-left rounded-lg transition duration-200 ease-in-out flex items-center"
                  >
                    <subRoute.icon className="mr-3 text-blue-500" size={20} />
                    <span className="text-lg text-gray-700">
                      {subRoute.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

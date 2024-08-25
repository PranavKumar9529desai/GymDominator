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
} from "lucide-react";
import { useState } from "react";

export const Sidebar3 = () => {
  const [activePage, setActivePage] = useState("My Progress");
  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const menuItems = [
    {
      name: "My Progress",
      icon: BarChart2,
      subItems: ["Week Progress", "Month Progress"],
    },
    { name: "Workouts", icon: Dumbbell },
    { name: "Diet", icon: Utensils },
    { name: "Recipes", icon: Book },
    { name: "Today's plan", icon: Calendar },
  ];

  const handleItemClick = (itemName : string) => {
    if (itemName === "My Progress") {
      setIsProgressOpen(!isProgressOpen);
    } else {
      setActivePage(itemName);
      setIsProgressOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 w-full py-8 px-4 border-r border-gray-200">
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
          <Dumbbell className="w-6 h-6 text-gray-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">GymDominator</h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleItemClick(item.name)}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activePage === item.name ||
                  (item.name === "My Progress" && isProgressOpen)
                    ? "bg-gray-200 text-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
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
                  {item.subItems.map((subItem) => (
                    <li key={subItem}>
                      <button
                        onClick={() => setActivePage(subItem)}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                          activePage === subItem
                            ? "bg-gray-300 text-gray-800"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subItem === "Week Progress" ? (
                          <TrendingUp className="w-4 h-4 mr-3" />
                        ) : (
                          <LineChart className="w-4 h-4 mr-3" />
                        )}
                        <span>{subItem}</span>
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
        <div className="flex items-center px-4 py-2 mb-4 bg-gray-100 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">Premium Member</p>
          </div>
        </div>
        <button className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

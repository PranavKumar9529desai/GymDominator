import React, { useState } from "react";
import { Calendar, Dumbbell, Utensils, Book, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@components/ui/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/ui/sheet";

const routes = [
  { name: "Progress", icon: Calendar },
  { name: "Workouts", icon: Dumbbell },
  { name: "Diet", icon: Utensils },
  { name: "Recipes", icon: Book },
];

export const BottomNavigation2 = () => {
  const [activeRoute, setActiveRoute] = useState("Progress");
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isOpen, setisOpen] = useState<boolean>(false);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <nav className="max-w-md mx-auto">
        <ul className="flex justify-around">
          {routes.map((route) => (
            <li key={route.name} className="flex-1">
              {route.name === "Progress" ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full h-16 flex flex-col items-center justify-center space-y-1 rounded-none transition-colors duration-200 ${
                        activeRoute === route.name
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "text-muted-foreground hover:bg-blue-100"
                      }`}
                      onClick={() => {
                        setActiveRoute(route.name);
                        setIsProgressOpen(!isProgressOpen);
                      }}
                    >
                      <route.icon className="h-6 w-6" />
                      <span className="text-xs">{route.name}</span>
                      <motion.div
                        animate={{ rotate: isProgressOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-56">
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          console.log("Month Progress clicked");
                          // Add your logic here
                        }}
                      >
                        Month Progress
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          console.log("Week Progress clicked");
                          // Add your logic here
                        }}
                      >
                        Week Progress
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Button
                  variant="ghost"
                  className={`w-full h-16 flex flex-col items-center justify-center space-y-1 rounded-none transition-colors duration-200 ${
                    activeRoute === route.name
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "text-muted-foreground hover:bg-blue-100"
                  }`}
                  onClick={() => setActiveRoute(route.name)}
                >
                  <route.icon className="h-6 w-6" />
                  <span className="text-xs">{route.name}</span>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const DrawerForTodaysPlan = () => {
  return (
    <div className="bg-gray-100 space-y-2 w-full text-center ">
      <div>Weekly Progress</div>
      <div>Monthly Progress</div>
    </div>
  );
};

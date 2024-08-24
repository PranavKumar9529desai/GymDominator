import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Dumbbell, Utensils, ChevronRight, Check } from "lucide-react";

export const TodaysPlans2 = () => {
  const [date, setDate] = useState(new Date());

  const workouts = [
    { name: "Push-ups", sets: "3", reps: "10", completed: false },
    { name: "Squats", sets: "3", reps: "10", completed: false },
    { name: "Plank", sets: "3", reps: "30s", completed: false },
  ];

  const meals = [
    { name: "Breakfast", completed: 75 },
    { name: "Lunch", completed: 75 },
    { name: "Dinner", completed: 75 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl mt-10">
      <h1 className="text-4xl font-bold text-white mb-2">Today's Plan</h1>
      <p className="text-gray-400 mb-6">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <Dumbbell className="mr-2" /> Workouts
            </h2>
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center">
              View All <ChevronRight className="ml-1" size={16} />
            </button>
          </div>
          <ul className="space-y-4">
            {workouts.map((workout, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-700 p-[18px] rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {workout.name}
                  </h3>
                  <p className="text-gray-400">
                    {workout.sets} x {workout.reps}
                  </p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200">
                  {workout.completed ? (
                    <Check size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
            Complete Workout
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <Utensils className="mr-2" /> Meals
            </h2>
            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center">
              View All <ChevronRight className="ml-1" size={16} />
            </button>
          </div>
          <ul className="space-y-4">
            {meals.map((meal, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-white">{meal.name}</h3>
                <div className="w-16 h-16">
                    {/* @ts-ignore */}
                  <CircularProgressbar
                    value={meal.completed}
                    text={`${meal.completed}%`}
                    styles={buildStyles({
                      textSize: "24px",
                      pathColor: `rgba(62, 152, 199, ${meal.completed / 100})`,
                      textColor: "#fff",
                      trailColor: "#2D3748",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
            Start Meal Prep
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Dumbbell, Utensils, ChevronRight, Check } from "lucide-react";
import Confetti from "react-confetti";
import axios from "axios";
import WorkoutCompleted from "./CompletedPlans";

export const TodaysPlans = () => {
  const [isCompleted, setisComplted] = useState<boolean>(true);
  async function CompleteTodaysPlan(iscomplete: boolean = false) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/completedtodaysprogress`,
      {
        UserCompletedThePlanInFrontned: iscomplete,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response.data);
    if (response.data.UserCompletedThePlanInFrontned) {
      setisComplted(true);
    }
  }

  {
    const [showConfetti, setShowConfetti] = useState(false);
    const [date, setDate] = useState(new Date());
    const [workouts, setWorkouts] = useState([
      { name: "Push-ups", sets: "3", reps: "10", completed: false },
      { name: "Squats", sets: "3", reps: "10", completed: false },
      { name: "Plank", sets: "3", reps: "30s", completed: false },
    ]);
    const [meals, setMeals] = useState([
      { name: "Breakfast", completed: 0 },
      { name: "Lunch", completed: 0 },
      { name: "Dinner", completed: 0 },
    ]);

    const toggleWorkoutCompletion = (index: number) => {
      const updatedWorkouts = [...workouts];
      updatedWorkouts[index].completed = !updatedWorkouts[index].completed;
      setWorkouts(updatedWorkouts);
    };

    const toggleMealCompletion = (index: number) => {
      const updatedMeals = [...meals];
      updatedMeals[index].completed =
        updatedMeals[index].completed === 100 ? 0 : 100;
      setMeals(updatedMeals);
    };

    const allWorkoutsCompleted = workouts.every((workout) => workout.completed);
    const allMealsCompleted = meals.every((meal) => meal.completed === 100);

    const allTasksCompleted = allWorkoutsCompleted && allMealsCompleted;

    useEffect(() => {
      CompleteTodaysPlan();
      if (allTasksCompleted) {
        CompleteTodaysPlan(true);
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
      }
    }, [allTasksCompleted]);

    return (
      <div className="max-w-4xl mx-auto  rounded-xl mt-8 ">
        {isCompleted ? (
          <div className="lg:mt-20">
            <WorkoutCompleted />
          </div>
        ) : (
          <div>
            {showConfetti && (
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}
            <h1 className="text-4xl font-bold text-black mb-2 text-center lg:text-left">
              Today's Plan
            </h1>
            <p className="text-gray-500 mb-6 text-center lg:text-left">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="grid md:grid-cols-2 gap-6 lg:px-0 px-4 ">
              <div className="bg-white p-6 rounded-lg lg:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold  flex items-center text-black">
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
                      className="flex items-center justify-between bg-slate-200 p-[17px] rounded-lg hover:bg-slate-300 transition-colors duration-200"
                    >
                      <div className="*:text-black">
                        <h3 className="text-lg font-medium text-white">
                          {workout.name}
                        </h3>
                        <p className="text-gray-400">
                          {workout.sets} x {workout.reps}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleWorkoutCompletion(index)}
                        className={`rounded-full p-2 transition-colors duration-200 ${
                          workout.completed
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                        aria-label={
                          workout.completed
                            ? "Mark workout as incomplete"
                            : "Mark workout as complete"
                        }
                      >
                        {workout.completed ? (
                          <Check size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-6 w-full font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                    allWorkoutsCompleted
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {allWorkoutsCompleted
                    ? "Workouts Completed!"
                    : "Complete All Workouts"}
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg lg:shadow-lg mb-40 lg:mb-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold  flex items-center text-black">
                    <Utensils className="mr-2" /> Meals
                  </h2>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center">
                    View All <ChevronRight className="ml-1" size={16} />
                  </button>
                </div>
                <ul className="space-y-4 text-black">
                  {meals.map((meal, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-slate-200 p-3 rounded-lg hover:bg-slate-300 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-medium text-black">
                        {meal.name}
                      </h3>
                      <div className="flex items-center">
                        <div className="w-16 h-16 mr-2">
                          {/* @ts-ignore */}
                          <CircularProgressbar
                            value={meal.completed}
                            text={`${meal.completed}%`}
                            styles={buildStyles({
                              textSize: "24px",
                              pathColor:
                                meal.completed === 100 ? "#10B981" : "#0000FF",
                              textColor: "black",
                              trailColor: "#0000FF",
                              backgroundColor: "#3e98c7",
                            })}
                          />
                        </div>
                        <button
                          onClick={() => toggleMealCompletion(index)}
                          className={`rounded-full p-2 transition-colors duration-200 ${
                            meal.completed === 100
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white`}
                          aria-label={
                            meal.completed === 100
                              ? "Mark meal as incomplete"
                              : "Mark meal as complete"
                          }
                        >
                          {meal.completed === 100 ? (
                            <Check size={20} />
                          ) : (
                            <ChevronRight size={20} />
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-6 w-full font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                    allMealsCompleted
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {allMealsCompleted
                    ? "All Meals Completed!"
                    : "Complete All Meals"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};
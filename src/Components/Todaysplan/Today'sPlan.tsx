import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import axios, { type AxiosResponse } from 'axios';
import { Check, ChevronRight, Dumbbell, Utensils } from 'lucide-react';
import Confetti from 'react-confetti';
import { PropagateLoader } from 'react-spinners';
import WorkoutCompleted from './CompletedPlans';

interface Workout {
  id: string;
  name: string;
  sets: string;
  reps: string;
  description: string;
  completed: boolean;
}

interface Meal {
  id: string;
  name: string;
  completed: number;
}

interface TodayplanPropsType {
  workouts: Workout[];
  meals: Meal[];
  AlreadyCompletedTheplan: boolean;
}

export const TodaysPlans = () => {
  const [isCompleted, setisComplted] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [date] = useState(new Date());
  const [workouts, setWorkouts] = useState([
    { name: 'Push-ups', sets: '3', reps: '10', completed: false },
    { name: 'Squats', sets: '3', reps: '10', completed: false },
    { name: 'Plank', sets: '3', reps: '30s', completed: false },
  ]);
  const [meals, setMeals] = useState([
    { name: 'Breakfast', completed: 0 },
    { name: 'Lunch', completed: 0 },
    { name: 'Dinner', completed: 0 },
  ]);

  const toggleWorkoutCompletion = (index: number) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index].completed = !updatedWorkouts[index].completed;
    setWorkouts(updatedWorkouts);
  };

  const toggleMealCompletion = (index: number) => {
    const updatedMeals = [...meals];
    updatedMeals[index].completed = updatedMeals[index].completed === 100 ? 0 : 100;
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

  async function CompleteTodaysPlan(iscomplete = false) {
    try {
      setisLoading(true);
      const response = await axios.post(
        '/api/todaysplan/complete',
        {
          isComplete: iscomplete,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        }
      );
      console.log(response.data);
      setisComplted(response.data.AlreadyCompletedTheplan);
      console.log('setisComplted', isCompleted);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <div className="w-full h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full text-xl">
          <PropagateLoader color="#81d4fa" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto  rounded-xl lg:bg-inherit lg:mt-10 bg-[#f0f0f0]">
          {isCompleted ? (
            <div className="lg:mt-20 ">
              <WorkoutCompleted />
            </div>
          ) : (
            <div>
              {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
              <h1 className="text-4xl font-bold text-black mb-2 text-center lg:text-left pt-4">
                Today's Plan
              </h1>
              <p className="text-gray-500 mb-6 text-center lg:text-left">
                {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <div className="grid md:grid-cols-2 gap-6 lg:px-0 justify-center lg:justify-normal ">
                <div className="bg-white p-6 rounded-lg lg:shadow-lg min-w-[350px]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold  flex items-center text-black">
                      <Dumbbell className="mr-2" /> Workouts
                    </h2>
                    <button
                      type="button"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                    >
                      View All <ChevronRight className="ml-1" size={16} />
                    </button>
                  </div>
                  <ul className="space-y-4">
                    {workouts.map((workout) => (
                      <li
                        key={workout.id || `workout-${workout.name}`}
                        className="flex items-center justify-between bg-slate-200 p-[17px] rounded-lg hover:bg-slate-300 transition-colors duration-200"
                      >
                        <div>
                          <h3 className="font-semibold">{workout.name}</h3>
                          <p className="text-sm text-gray-600">{workout.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWorkoutCompletion(workout.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            workout.completed
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                          }`}
                        >
                          {workout.completed ? <Check size={20} /> : <ChevronRight size={20} />}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`mt-6 w-full font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                      allWorkoutsCompleted
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {allWorkoutsCompleted ? 'Workouts Completed!' : 'Complete All Workouts'}
                  </button>
                </div>

                <div className="bg-white p-6 rounded-lg lg:shadow-lg mb-40 lg:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold  flex items-center text-black">
                      <Utensils className="mr-2" /> Meals
                    </h2>
                    <button
                      type="button"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
                    >
                      View All <ChevronRight className="ml-1" size={16} />
                    </button>
                  </div>
                  <ul className="space-y-4 text-black">
                    {meals.map((meal) => (
                      <li
                        key={meal.id || `meal-${meal.name}`}
                        className="flex items-center justify-between bg-slate-200 p-3 rounded-lg hover:bg-slate-300 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-medium text-black">{meal.name}</h3>
                        <div className="flex items-center">
                          <div className="w-16 h-16 mr-2">
                            {/* @ts-ignore */}
                            <CircularProgressbar
                              value={meal.completed}
                              text={`${meal.completed}%`}
                              styles={buildStyles({
                                textSize: '24px',
                                pathColor: meal.completed === 100 ? '#10B981' : '#0000FF',
                                textColor: 'black',
                                trailColor: '#0000FF',
                                backgroundColor: '#3e98c7',
                              })}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleMealCompletion(meal.id)}
                            className={`rounded-full p-2 transition-colors duration-200 ${
                              meal.completed === 100
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-blue-500 hover:bg-blue-600'
                            } text-white`}
                          >
                            {meal.completed === 100 ? <Check size={20} /> : <ChevronRight size={20} />}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`mt-6 w-full font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                      allMealsCompleted
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {allMealsCompleted ? 'Meals Completed!' : 'Complete All Meals'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

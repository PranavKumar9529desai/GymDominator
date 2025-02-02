import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
import { SingleWorkout } from "@components/Singleworkout/singleworkout";
export const SingleWorkoutRoute = () => {
  return (
    <div>
      <div className="lg:pt-20 ">
        <SingleWorkout />
      </div>
      <div className="lg:hidden block">
        <BottomNavigation />
      </div>
    </div>
  );
};

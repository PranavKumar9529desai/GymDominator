import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
import { Navbar2 } from "@components/Navbar/Navbar2";
import { SingleWorkout } from "@components/Singleworkout/singleworkout";
export const SingleWorkoutRoute = () => {
  return (
    <div>
      <div className="lg:block hidden">
        <Navbar2 TextColor="black" />
      </div>
      <div className="lg:pt-20 ">
        <SingleWorkout />
      </div>
      <div className="lg:hidden block">
        <BottomNavigation />
      </div>
    </div>
  );
};

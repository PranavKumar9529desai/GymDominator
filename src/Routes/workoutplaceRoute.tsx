import { Navbar2 } from "@components/Navbar/Navbar2";
import { Workoutplace } from "@components/Workoutplace/Workoutplace";

export const WorkoutplaceRoute = () => {
  return (
    <div className="h-screen bg-[#f0f0f0]">
      <div>
        <Navbar2 TextColor="black" />
      </div>
      <div className="relative lg:top-20 top-24">
        <Workoutplace />
      </div>
    </div>
  );
};

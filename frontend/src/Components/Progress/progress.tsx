import { WeekButton } from "./weekbutton";

export const Progress = () => {
  return (
    <div className="w-11/12 ml-8">
      <Weekcomponent />
    </div>
  );
};

// const WeekComponent = () => {
//   return (
//     <div className="">
//       <div className="w-full text-center">
//         <span className="lg:text-4xl font-extrabold text-3xl">
//           Welcome to 24 weeks challenge
//         </span>
//       </div>
//       <div className="h-fit lg:ml-10 mt-8  mb-[500px] ml-8 ">
//         <div className="flex flex-col lg:gap-96 gap-[450px]">
//           <WeekButton weeknu={1} />
//           <WeekButton weeknu={2} />
//         </div>
//       </div>
//     </div>
//   );
// };

export const Weekcomponent = () => {
  return (
    <div className="border border-gray-200 ">
      <div className="*:block text-center p-4 *:m-3">
        <span className=" text-4xl font-extrabold">Weekly Workout Planner</span>
        <span className="text-gray-400 text-lg">
          plan your workouts for the week with a focus on different muscle
          groups.
        </span>
      </div>
      
      <div className="flex flex-wrap gap-10 justify-center pb-8">
        <DayCard day="Monday" />
        <DayCard day="Monday" />
        <DayCard day="Monday" />
        <DayCard day="Monday" />
        <DayCard day="Monday" />
      </div>
    </div>
  );
};

const DayCard = ({ day }: { day: string }) => {
  return (
    <div className="border border-gray-200 w-80 text-center justify-center pt-3 ">
      <div className="text-center text-2xl font-semibold text-blue-400">
        {day}
      </div>
      <div className="text-gray-400 text-lg">Chest</div>

      <div className="mx-auto py-4">
        <img
          src="https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/chest_0.jpg"
          alt="muscle image "
        />
      </div>

      <div>
        <div className="text-left text-lg text-gray-500 ml-2">Excercises:</div>
        <div className="text-left ml-24 space-y-3">
          <div>Dumbell Pres</div>
          <div>Beneh Press</div>
          <div>Push ups</div>
        </div>
      </div>
    </div>
  );
};

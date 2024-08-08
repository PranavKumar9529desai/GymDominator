import { WeekButton } from "./weekbutton";

export const Progress = () => {
  return (
    <div className="w-full">
      <WeekComponent />
    </div>
  );
};

const WeekComponent = () => {
  return (
    <div className="">
      <div className="w-full text-center">
        <span className="lg:text-4xl font-extrabold text-3xl">
          Welcome to 24 weeks challenge
        </span>
      </div>
      <div className="h-fit lg:ml-10 mt-8  mb-[500px] ml-8 ">
        <div className="flex flex-col lg:gap-96 gap-[450px]">
          <WeekButton weeknu={1} />
          <WeekButton weeknu={2} />
        </div>
      </div>
    </div>
  );
};

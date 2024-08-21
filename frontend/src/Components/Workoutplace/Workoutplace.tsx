import { coustomWarningMsg } from "@components/customAlerts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Workoutplace = () => {
  return (
    <div className="">
      <div className="lg:text-4xl text-center font-semibold text-3xl lg:relative top-10 font-overpass">
        WHERE DO YOU PREFER TO WORKOUT?
      </div>
      <div className="h-full lg:flex lg:gap-32 justify-center gap-10 lg:mt-32 flex  lg:flex-row items-center mt-10">
        <WorkoutplaceCard text="IN home" img="/src/assets/inhome.jpeg" />
        <WorkoutplaceCard text="IN the Gym" img="/src/assets/ingym.jpeg" />
      </div>
    </div>
  );
};

type WorkoutplaceType = "IN home" | "IN the Gym";

const WorkoutplaceCard = ({
  text,
  img,
}: {
  text: WorkoutplaceType;
  img: string;
}) => {
  const [workoutplace, setworkoutplace] =
    useState<WorkoutplaceType>("IN the Gym");
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        setworkoutplace(text);
        console.log("user selected", workoutplace);
        coustomWarningMsg(navigate);
      }}
    >
      <div className="lg:w-fit w-[150px] hover:outline-none hover:border-sky-500 hover:ring-2 hover:ring-sky-500 bg-[#f0f0f0] transition-all duration-200 hover:-translate-y-3 hover:scale-105 rounded-b-lg shadow-lg hover:shadow-2xl">
        <div className="w-full">
          <div className="lg:w-60 ">
            <img src={img} alt="" className="" />
          </div>
          <div className="text-center py-4 font-overpass">{text}</div>
        </div>
      </div>
    </button>
  );
};

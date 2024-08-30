import { Navbar2 } from "@components/Navbar/Navbar2";
import { PropagateLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { BottomNavigation } from "../BottomNavigation";
import { FetchExcercise } from "@hooks/FetchExcercise";
import { Excercisetype } from "@state/Selectors/ExcerciseSelectorsfamily";
export const SingleMuscles = () => {
  let { muscle } = useParams<{ muscle: string }>();
  if (muscle == undefined) {
    muscle = "chest";
  }
  let { isLoading, Excercise } = FetchExcercise({ muscle });

  Excercise = Excercise.filter(
    (exercise) =>
      exercise.MuscleGroup &&
      exercise.MuscleGroup.name &&
      exercise.MuscleGroup.name.toLowerCase() === muscle.toLowerCase()
  );
  return (
    <div>
      <div className="lg:block hidden">
        <Navbar2 TextColor="black" />
      </div>
      <div className="md:hidden block ">
        <BottomNavigation />
      </div>
      <div className="w-full text-center lg:pt-20 pt-4">
        <div className="lg:text-5xl font-bold text-3xl  ">
          {muscle.charAt(0).toUpperCase() + muscle.slice(1)} Excercises
        </div>
        <div className="text-xl text-gray-600 mt-5 px-1">
          {muscle.charAt(0).toUpperCase() + muscle.slice(1)} exercises. Learn
          how to build a big, strong and muscular{" "}
          {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
        </div>
      </div>
      <div className="mt-8 ">
        {isLoading ? (
          <div className="flex justify-center items-center relative top-40 text-3xl">
            <PropagateLoader />
          </div>
        ) : (
          <RecommenedExcercise Excercises={Excercise} />
        )}
      </div>
    </div>
  );
};

const RecommenedExcercise = ({
  Excercises,
}: {
  Excercises: Excercisetype[];
}): JSX.Element => {
  let { muscle } = useParams<{ muscle: string }>();

  return (
    <div className="w-full ">
      <div className="lg:bg-gray-200 bg-white px-8 w-10/12 mx-auto border-t-4 border-blue-800 mb-16">
        <div className="text-2xl font-semibold my-5 ">
          Best {muscle?.toLocaleUpperCase()} Exercises{" "}
        </div>
        <div className="">
          <div className="flex lg:gap-10 lg:flex-row flex-col gap-2  ">
            {Excercises.map((excercise) => {
              return (
                <ExcerciseCard name={excercise.name} img={excercise.img} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExcerciseCard = ({
  name,
  img,
}: {
  name: string;
  img: string;
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="">
      <img src={img} alt="" />
      <div className="text-2xl font-semibold mt-4">{name}</div>
      <button
        className="bg-blue-700 text-white text-xl py-2 px-3 rounded-xl inline-flex justify-center items-center my-5 hover:bg-blue-800 shadow-md"
        onClick={() => {
          navigate(`${name}`);
        }}
      >
        View Excercise
      </button>
    </div>
  );
};

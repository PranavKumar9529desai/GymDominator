import { FetchSingleWorkout } from "@hooks/FetchSingleWorkout";
import { useParams } from "react-router-dom";

export const SingleWorkout = () => {
  let { workoutname } = useParams<{ workoutname: string }>();

  if (workoutname == undefined) {
    workoutname = "Dumbbell Bench Press";
  }

  const { excercise, isLoading } = FetchSingleWorkout({ workoutname });

  console.log("excercise are here ", excercise);

  return (
    <div>
      <div className="lg:text-5xl font-extrabold font text-center text-2xl leading-10">
        Lying Floor Leg Raise Video Exercise Guide
      </div>
      <div className="lg:ml-20 lg:mt-10 ml-2 mt-5">
        <div className="inline text-lg">Categories</div>
        <div className="text-gray-600  inline-flex gap-3 *:bg-gray-200 ml-3  *:py-1 *:px-3 *:rounded-2xl">
          <div>Excercise videoes</div>
          <div>Abs</div>
        </div>
      </div>
      <div className="mx-auto">
        <VideoComponent />
      </div>
      <div className="lg:px-10 px-4 mt-10">
        <ExcerciseDescription />
      </div>
    </div>
  );
};

const VideoComponent = () => {
  return (
    <div className="">
      <iframe
        className="lg:h-screen lg:w-full lg:px-20 lg:py-10 w-11/12 h-11/12 mx-auto mt-6 lg:mt-4"
        width=""
        height=""
        src="https://www.youtube.com/embed/r24ntO4IvKc?start=103"
        title="YouTube video player"
        allow="accelerometer;   
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share"
        allowFullScreen
      ></iframe>{" "}
    </div>
  );
};

const ExcerciseDescription = () => {
  const Description =
    "Lay supine in a relaxed position with your legs straight and your hands underneath your low back for support. Keep your legs straight and raise them towards your forehead while contracting your abdominals and exhaling. Once your abs are fully contracted and your legs are slightly above parallel, slowly lower your legs back to the starting position. Complete for the assigned number of repetitions";
  return (
    <div className="">
      <div className="flex gap-3 justify-center">
        <div className="lg:ml-20 lg:text-xl text-blue-400 font-bold text-lg  ">
          Target Muscle Group :
        </div>
        <div className="text-xl text-gray-800 font-bold">Abs</div>
      </div>
      <div className="lg:flex mt-10">
        <div className="h-8/12 shadow-gray-400">
          <img
            src="https://cdn.muscleandstrength.com/sites/all/themes/mnsnew/images/taxonomy/exercises/muscle-groups/full/Abs.jpg"
            alt="abs image"
          />
        </div>
        <div className="container w-full ml-4">
          {Description.split(".").map((line, key) => {
            return (
              <div className="lg:text-lg text-gray-800 font-bold h-fit my-10">
                {key + 1}. {line}
              </div>
            );
          })}
          <div className="lg:text-xl text-sm font-semibold text-gray-400 mb-32">
            Subscribe GymDominator for more content
          </div>
        </div>
      </div>
    </div>
  );
};

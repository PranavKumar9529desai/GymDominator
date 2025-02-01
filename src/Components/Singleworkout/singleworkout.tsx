import { FetchSingleWorkout } from "@hooks/FetchSingleWorkout";
import type { ExerciseWithMuscle } from "@state/Selectors/SingleWorkoutSelectorsFamily";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export const SingleWorkout = () => {
  const { workoutname = "", muscle = "" } = useParams<{
    workoutname: string;
    muscle: string;
  }>();

  const { isLoading, exercise, error } = FetchSingleWorkout({ workoutname, muscle });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Error Loading Exercise
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading || !exercise) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  const videoId = exercise.video_url?.split("/").pop() || "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-2"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="lg:text-5xl font-extrabold text-center text-3xl leading-10 px-2"
      >
        {exercise.name}
      </motion.div>

      <div className="lg:ml-20 lg:mt-5 ml-2 mt-5 pl-2 hover:text-blue-800">
        <div className="inline lg:text-lg text-sm">Categories</div>
        <div className="text-gray-600 inline-flex gap-3 *:bg-gray-200 ml-3 *:py-1 *:px-3 *:rounded-2xl lg:text-base text-sm">
          <div className="text-blue-400">Exercise videos</div>
          <div className="text-blue-400">{muscle}</div>
        </div>
      </div>

      <div className="mx-auto">
        <VideoComponent videoId={videoId} />
      </div>

      <div className="lg:px-10 px-4 mt-10">
        <ExerciseDescription
          img={exercise.muscle_image || ""}
          instruction={exercise.instructions}
          muscleName={exercise.muscle_group}
        />
      </div>
    </motion.div>
  );
};

const VideoComponent = ({ videoId }: { videoId: string }) => {
  return (
    <div>
      <iframe
        className="lg:h-screen lg:w-full lg:px-20 lg:py-5 w-full h-[200px] mx-auto mt-6 lg:mt-2 px-3"
        src={`https://www.youtube.com/embed/${videoId}?start=0`}
        title="Exercise demonstration video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

const ExerciseDescription = ({
  instruction,
  muscleName,
  img,
}: {
  instruction: string;
  muscleName: string;
  img: string;
}) => {
  const instructions = instruction.split(".");

  return (
    <div>
      <div className="flex gap-3 lg:justify-center">
        <div className="lg:ml-20 lg:text-3xl text-blue-400 font-bold text-lg font-montserrat">
          Target Muscle Group:
        </div>
        <div className="lg:text-3xl text-blue-400 font-bold text-lg font-montserrat">
          {muscleName.toUpperCase()}
        </div>
      </div>

      <div className="lg:flex mt-10">
        <div className="h-8/12 shadow-gray-400">
          <img src={img} alt={`Diagram showing ${muscleName} muscle group`} />
        </div>
        <div className="container w-full ml-4">
          {instructions.filter(Boolean).map((line, index) => {
            const key = `${muscleName}-instruction-${line.trim().substring(0, 20)}`;
            return (
              <div
                key={key}
                className="lg:text-xl text-gray-800 font-bold h-fit my-10 pr-4 font-overpass"
              >
                {index + 1}. {line.trim()}
              </div>
            );
          })}
          <div className="lg:text-xl text-sm font-semibold text-gray-400 mb-32 font-mono">
            Subscribe GymNavigator for more content ❤️
          </div>
        </div>
      </div>
    </div>
  );
};

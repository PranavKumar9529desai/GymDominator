import { FetchSingleWorkout } from "@hooks/FetchSingleWorkout";
import { useParams } from "react-router-dom";

export const SingleWorkout = () => {
  let { workoutname } = useParams<{ workoutname: string }>();
  let { muscle } = useParams<{ muscle: string }>();
  if (muscle == undefined) muscle = "Chest";

  if (workoutname == undefined) {
    workoutname = "Dumbbell Bench Press";
  }

  let { excercise, isLoading } = FetchSingleWorkout({ workoutname });

  console.log("excercsie from the singleworkout", excercise);
  if (excercise == undefined) {
    excercise = {
      name: "Chest Dip",
      img: "https://cdn.muscleandstrength.com/sites/default/files/chest-dip.jpg",
      videolink: "https://youtu.be/FG1ENBFsdHU",
      MuscleGroup: {
        fullimage:
          "https://cdn.muscleandstrength.com/sites/all/themes/mnsnew/images/taxonomy/exercises/muscle-groups/full/Chest.jpg",
        id: 1,
        img: "https://cdn.muscleandstrength.com/sites/default/files/taxonomy/image/videos/chest_0.jpg",
        name: "CHEST",
      },
      instructions:
        "Step up on the dip station (if possible) and position your hands with a neutral grip.\r\nInitiate the dip by unlocking the elbows and slowly lowering the body until the forearms are almost parallel with the floor.\r\nControl the descent to parallel and then drive back to the starting position by pushing through the palms.\r\nRepeat for the desired number of repetitions.",
    };
  }

  let arr = excercise.videolink.split("/");
  console.log();
  let iframeId = arr[arr.length - 1];
  console.log("iframeid", iframeId);

  return (
    <div className=" mt-2">
      <div className="lg:text-5xl font-extrabold font text-center text-3xl leading-10 px-2">
        {excercise.name}
      </div>
      <div className="lg:ml-20 lg:mt-5  ml-2 mt-5 pl-2 hover:text-blue-800">
        <div className="inline lg:text-lg text-sm ">Categories</div>
        <div className="text-gray-600  inline-flex gap-3 *:bg-gray-200 ml-3  *:py-1 *:px-3 *:rounded-2xl lg:text-base text-sm">
          <div className="text-blue-400">Excercise videoes</div>
          <div className="text-blue-400">{muscle}</div>
        </div>
      </div>
      <div className="mx-auto">
        <VideoComponent iframeId={iframeId} />
      </div>
      <div className="lg:px-10 px-4 mt-10">
        <ExcerciseDescription
          img={excercise.MuscleGroup.fullimage}
          instruction={excercise.instructions}
          muscleName={muscle}
        />
      </div>
    </div>
  );
};

const VideoComponent = ({ iframeId }: { iframeId: string }) => {
  return (
    <div className="">
      <iframe
        className="lg:h-screen lg:w-full lg:px-20 lg:py-5 w-full h-[200px] mx-auto mt-6 lg:mt-2 px-3"
        width=""
        height=""
        src={`https://www.youtube.com/embed/${iframeId}?start=0`}
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

const ExcerciseDescription = ({
  instruction,
  muscleName,
  img,
}: {
  instruction: string;
  muscleName: string;
  img: string;
}) => {
  let Description = instruction;
  return (
    <div className="">
      <div className="flex gap-3 lg:justify-center ">
        <div className="lg:ml-20 lg:text-3xl text-blue-400 font-bold text-lg ">
          Target Muscle Group :
        </div>
        <div className="lg:text-3xl text-blue-400 font-bold text-lg ">
          {muscleName.toUpperCase()}
        </div>
      </div>
      <div className="lg:flex mt-10">
        <div className="h-8/12 shadow-gray-400">
          <img src={img} alt="mucle image" />
        </div>
        <div className="container w-full ml-4">
          {Description.split(".").map((line, key) => {
            return (
              <div
                key={key}
                className="lg:text-lg text-gray-800 font-bold h-fit my-10 pr-4"
              >
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

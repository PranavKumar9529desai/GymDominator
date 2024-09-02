import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { useState, useEffect } from "react";
import { WorkoutModal } from "./WorkoutModel";
import { PropagateLoader } from "react-spinners";

export const Allworkouts = () => {
  const { isLoading, muscles } = FetchMusclesGroups();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true);
    }
  }, [isLoading]);

  const handleMuscleClick = (muscleName: string) => {
    setSelectedMuscle(muscleName);
  };

  const closeModal = () => {
    setSelectedMuscle(null);
  };

  return (
    <>
      <div
        className={`
          duration-500 ease-in-out mb-40
          ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }
        `}
      >
        <div className="-mt-5 h-full">
          <div className="block w-full h-full">
            <div className="h-full">
              <div className="flex w-full h-10 justify-center pt-8 lg:mb-5">
                <span className="font-extrabold lg:text-5xl text-3xl flex text-center font-montserrat">
                  Choose Muscle to Train
                </span>
              </div>
              <div className="lg:mt-16">
                {isLoading ? (
                  <div className="flex justify-center w-full mt-3 relative top-40">
                    <PropagateLoader color="#81d4fa" />
                  </div>
                ) : (
                  <div className="flex flex-wrap lg:gap-10 gap-5 w-full justify-center lg:mb-0 !pb-40 mt-8 lg:mt-10">
                    {muscles.map((muscle) => (
                      <div
                        key={muscle.name}
                        className="relative lg:w-fit w-full lg:ml-0 text-center"
                      >
                        <MuscleGroup
                          name={muscle.name}
                          img={muscle.img}
                          onClick={() => handleMuscleClick(muscle.name)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedMuscle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <WorkoutModal muscleName={selectedMuscle} onClose={closeModal} />
        </div>
      )}
    </>
  );
};

const MuscleGroup = ({
  name,
  img,
  onClick,
}: {
  name: string;
  img: string;
  onClick: () => void;
}) => {
  return (
    <div className="relative">
      <button
        className="lg:w-[300px] w-10/12 bg-gray-300 mt-5 rounded-lg h-fit hover:-translate-y-3 transition-transform duration-500 shadow-lg hover:shadow-2xl group hover:outline hover:outline-blue-400 hover:outline-offset-2"
        onClick={onClick}
      >
        <div className="flex justify-center pt-3">
          <img src={img} alt={name} className="w-9/12 rounded-2xl" />
        </div>
        <div className="flex justify-center items-center h-10 font-montserrat font-bold lg:text-3xl text-4xl">
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </div>
      </button>
    </div>
  );
};

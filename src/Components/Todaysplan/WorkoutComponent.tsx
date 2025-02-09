import { useState } from 'react';
import { ProgressBar } from '@components/progressBar';
export const WorkoutComponent = ({
  name,
  onCompletionChange,
}: {
  name: string;
  onCompletionChange: (iscomplete: boolean) => void;
}) => {
  const [iscomplete, setiscomplete] = useState<boolean>(false);

  const handleChecked = () => {
    const newStatus = !iscomplete;
    setiscomplete(newStatus);
    onCompletionChange(newStatus);
  };

  return (
    <div className="group">
      <div>
        <div className="flex w-full">
          <div className="flex items-center w-full group transition-all duration-500">
            <input
              type="checkbox"
              className="size-4 mr-2 group-hover:bg-blue-400 "
              onClick={handleChecked}
            />
            <div className="w-full  flex  items-center justify-between  ">
              <div className="font-pop  group-has-[:checked]:line-through group-hover:text-blue-400 transition-all duration-200">
                {name}
              </div>
              <div className="lg:w-24 ml-6 mr-2 w-20">
                <ProgressBar width={iscomplete ? 100 : 0} />
              </div>
            </div>
          </div>
        </div>
        <div className={`text-gray-400 ${iscomplete ? 'line-through' : ' '}`} text-sm>
          10 X 3
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { WeekButtonSvg } from "@components/Svg/weekbutton";
import { Week } from "./Week";
export const WeekButton = ({ weeknu }: { weeknu: number }) => {
	const [isactive, setisactive] = useState<boolean>(true);
	return (
		<div>
			<button
				className=" "
				onClick={() => {
					setisactive((prevState) => !prevState);
				}}
			>
				<span className="text-xl font-semibold  bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 ">
					Week {weeknu}
					<WeekButtonSvg />
				</span>
			</button>

			{/* dropdown weeek component */}
			<div className="flex  justify-center w-full relative">
				<Week isactive={isactive} weeknumber={weeknu} muscle="chest" />
			</div>
		</div>
	);
};

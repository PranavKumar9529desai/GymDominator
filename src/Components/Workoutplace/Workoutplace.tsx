import { coustomWarningMsg } from "@components/customAlerts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InHome from "@assets/inhome.jpeg";
import InGym from "@assets/ingym.jpeg";
export const Workoutplace = () => {
	return (
		<div className="">
			<div className="lg:text-4xl text-center font-semibold text-3xl lg:relative top-10 font-overpass">
				WHERE DO YOU PREFER TO WORKOUT?
			</div>
			<div className="h-full lg:flex lg:gap-32 justify-center gap-10 lg:mt-32 flex  lg:flex-row items-center mt-10 ">
				<WorkoutplaceCard text="IN home" img={InHome} />
				<WorkoutplaceCard text="IN the Gym" img={InGym} />
			</div>
		</div>
	);
};

// type WorkoutplaceType = "IN home" | "IN the Gym";

const WorkoutplaceCard = ({ text, img }: { text: string; img: string }) => {
	const [workoutplace, setworkoutplace] = useState<string>("");

	const navigate = useNavigate();
	useEffect(() => {
		setworkoutplace(text);
	}, [workoutplace]);

	async function submitform() {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/workoutplace`,
			{
				workoutplace,
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
				},
			},
		);
		console.log(response);
	}
	return (
		<button
			className={`${text == "IN the Gym" ? "relative top-56 lg:top-0 " : ""}`}
			onClick={() => {
				console.log("text is ", text);
				if (text == "IN home") {
					submitform();
					coustomWarningMsg(navigate);
				} else {
					submitform();
					navigate("/onboarding/healthprofile/workoutplace/choosegym");
				}
			}}
		>
			<div
				className={`lg:w-fit w-[150px] hover:outline-none hover:border-sky-500 hover:ring-2 hover:ring-sky-500 bg-[#f0f0f0] transition-all duration-200 hover:-translate-y-3 hover:scale-105 rounded-b-lg shadow-lg hover:shadow-2xl ${
					text == "IN the Gym"
				} ? "mt-20" : ""`}
			>
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

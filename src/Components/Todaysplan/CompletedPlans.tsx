import { useState, useEffect } from "react";
import { CheckCircle, ChevronRight, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WorkoutCompleted() {
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div
			className={`lg:mt-0  max-w-md mx-auto bg-[#f0f0f0] rounded-xl lg:shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out ${
				isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
			}`}
		>
			<div className="p-6 sm:p-8">
				<div className="flex items-center justify-center mb-6">
					<Award className="w-16 h-16 text-blue-500 animate-pulse" />
				</div>
				<h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
					You have already completed today's workout!
				</h2>
				<div className="bg-white rounded-lg p-4 mb-6 shadow-inner">
					<p className="text-gray-600 text-center text-lg">
						Great job! Your dedication is paying off. Keep up the good work and
						stay consistent!
					</p>
				</div>
				<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 ">
					<button
						className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-1"
						onClick={() => {
							navigate("/dashboard/myprogress/week");
						}}
					>
						View Week's Progress
					</button>
					<button
						className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-1 flex items-center justify-center"
						onClick={() => {
							navigate("/dashboard/myprogress/month");
						}}
					>
						Track my Progress
						<ChevronRight className="ml-1 w-4 h-4" />
					</button>
				</div>
			</div>
			<div className="bg-gray-200 py-3 px-6 flex flex-col sm:flex-row items-center justify-between">
				<div className="flex items-center mb-2 sm:mb-0">
					<CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
					<span className="text-gray-600 text-sm">Completed at 2:30 PM</span>
				</div>
				<span className="text-gray-600 text-sm font-semibold">
					Streak: 5 days
				</span>
			</div>
		</div>
	);
}

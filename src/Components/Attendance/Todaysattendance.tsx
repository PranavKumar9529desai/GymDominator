import React from "react";
import { Flame, Clock, Trophy } from "lucide-react";

type TodayAttendanceProps = {
	streak: number;
	entryTime: string;
};

export const TodayAttendance: React.FC<TodayAttendanceProps> = ({
	streak,
	entryTime,
}) => {
	const maxStreak = 30; // Assuming a monthly streak goal
	const progress = (streak / maxStreak) * 100;

	return (
		<div className=" bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">
				Today's Attendance
			</h2>

			<div className="flex items-center mb-6">
				<div className="relative w-24 h-24">
					<svg className="w-full h-full" viewBox="0 0 100 100">
						<circle
							className="text-gray-200 stroke-current"
							strokeWidth="10"
							cx="50"
							cy="50"
							r="40"
							fill="transparent"
						></circle>
						<circle
							className="text-blue-500 progress-ring stroke-current"
							strokeWidth="10"
							strokeLinecap="round"
							cx="50"
							cy="50"
							r="40"
							fill="transparent"
							strokeDasharray={`${2 * Math.PI * 40}`}
							strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
							style={{
								transition: "stroke-dashoffset 0.5s ease 0s",
							}}
						></circle>
					</svg>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
						<Flame className="w-8 h-8 text-orange-500 mx-auto mb-1" />
						<span className="text-xl font-bold text-gray-700">{streak}</span>
					</div>
				</div>
				<div className="ml-6">
					<h3 className="text-lg font-semibold text-gray-700">Gym Streak</h3>
					<p className="text-sm text-gray-500">Keep it up!</p>
				</div>
			</div>

			<div className="flex items-center mb-6">
				<Clock className="w-6 h-6 text-blue-500 mr-4" />
				<div>
					<h3 className="text-lg font-semibold text-gray-700">Entry Time</h3>
					<p className="text-sm text-gray-500">{entryTime}</p>
				</div>
			</div>

			<div className="bg-gray-100 rounded-lg p-4">
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm font-medium text-gray-500">Progress</span>
					<span className="text-sm font-medium text-blue-500">
						{progress.toFixed(0)}%
					</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2.5">
					<div
						className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>

			<div className="mt-6 text-center">
				<Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
				<p className="text-sm text-gray-600">
					{streak >= maxStreak
						? "Congratulations! You've reached your monthly goal!"
						: `${maxStreak - streak} more days to reach your monthly goal!`}
				</p>
			</div>
		</div>
	);
};

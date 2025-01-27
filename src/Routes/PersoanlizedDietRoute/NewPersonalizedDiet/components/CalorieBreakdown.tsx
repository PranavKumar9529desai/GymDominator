import { useRef, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { HealthData } from "../types/health";
import { DietProgress } from "./DietProgress";

// Register ChartJS components
ChartJS.register(ArcElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
	healthData: HealthData;
	startDate: Date | null;
}
export const CalorieBreakdown = ({ healthData, startDate }: Props) => {
	const pieChartRef = useRef<ChartJS<"pie", number[], string> | null>(null);

	// Cleanup charts on unmount with proper typings
	useEffect(() => {
		const currentPieChart = pieChartRef.current;

		return () => {
			if (currentPieChart) {
				currentPieChart.destroy();
			}
		};
	}, []);

	const calculateDailyCalories = () => {
		const bmr =
			healthData.gender === "male"
				? 88.362 +
					13.397 * healthData.weight +
					4.799 * healthData.height -
					5.677 * healthData.age
				: 447.593 +
					9.247 * healthData.weight +
					3.098 * healthData.height -
					4.33 * healthData.age;

		// Activity multiplier based on goal
		const activityMultiplier = healthData.goal.includes("gain")
			? 1.5
			: healthData.goal.includes("loss")
				? 1.2
				: 1.375;

		return Math.round(bmr * activityMultiplier);
	};

	const dailyCalories = calculateDailyCalories();
	const proteinCalories = Math.round(dailyCalories * 0.3);
	const carbsCalories = Math.round(dailyCalories * 0.5);
	const fatCalories = Math.round(dailyCalories * 0.2);

	const pieOptions: ChartOptions<"pie"> = {
		plugins: {
			legend: { position: "bottom" as const },
			datalabels: {
				formatter: (value: number) =>
					`${Math.round((value / dailyCalories) * 100)}%`,
				color: "#fff",
				font: { weight: "bold" as const },
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	};

	const macroData: ChartData<"pie"> = {
		labels: ["Protein", "Carbs", "Fats"],
		datasets: [
			{
				data: [proteinCalories, carbsCalories, fatCalories],
				backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
				borderWidth: 0,
			},
		],
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 mb-8">
			<div className="grid md:grid-cols-2 gap-8">
				<div>
					<h3 className="text-xl font-semibold mb-6">
						Daily Macro Distribution
					</h3>
					<div className="h-64 relative">
						<Pie ref={pieChartRef} data={macroData} options={pieOptions} />
					</div>
					<div className="mt-4 grid grid-cols-3 gap-4">
						<MacroCard
							title="Protein"
							amount={Math.round(proteinCalories / 4)}
							unit="g"
							color="indigo"
						/>
						<MacroCard
							title="Carbs"
							amount={Math.round(carbsCalories / 4)}
							unit="g"
							color="emerald"
						/>
						<MacroCard
							title="Fats"
							amount={Math.round(fatCalories / 9)}
							unit="g"
							color="amber"
						/>
					</div>
				</div>

				<div>
					<DietProgress startDate={startDate} totalWeeks={4} />
				</div>
			</div>
		</div>
	);
};

const MacroCard = ({
	title,
	amount,
	unit,
	color,
}: {
	title: string;
	amount: number;
	unit: string;
	color: "indigo" | "emerald" | "amber";
}) => (
	<div className={`bg-${color}-50 p-3 rounded-lg text-center`}>
		<p className={`text-${color}-900 font-semibold`}>{title}</p>
		<p className={`text-${color}-700 text-xl font-bold`}>
			{amount}
			<span className="text-sm">{unit}</span>
		</p>
	</div>
);

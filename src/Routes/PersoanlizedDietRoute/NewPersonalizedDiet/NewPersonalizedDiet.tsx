import { useState, useEffect } from "react";
import { GetHealthProfileData } from "../actions/GetHealthProfileData";
import { GetStartDate } from "./hooks/GetStartDate";
import { HealthSummary } from "./components/HealthSummary";
import { WeeklyMealPlan } from "./components/WeeklyMealPlan";
import weeklyDietPlan from "../weekly_diet_plan.json";
import { getBMICategory, DietCategories } from "./types/diet";
import { HealthData } from "./types/health";
import { CalorieBreakdown } from "./components/CalorieBreakdown";
import { BMIVisualizer } from "./components/BMIVisualizer";

export default function NewPersonalizedDiet() {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [healthData, setHealthData] = useState<HealthData | null>(null);
	const [currentWeek, setCurrentWeek] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initialize = async () => {
			try {
				const [date, health] = await Promise.all([
					GetStartDate(),
					GetHealthProfileData(),
				]);

				setStartDate(date);
				if (health.success) {
					// Transform the gender to match our type
					const transformedData: HealthData = {
						...health.data,
						gender: health.data.gender as "male" | "female" | "other",
					};
					setHealthData(transformedData);
				}
			} catch (error) {
				console.error("Initialization error:", error);
			} finally {
				setLoading(false);
			}
		};

		initialize();
	}, []);

	if (loading || !healthData) return <>Loading</>;

	const bmi = healthData.weight / Math.pow(healthData.height / 100, 2);
	// const bmi = 28;
	const category = getBMICategory(bmi);
	const dietPlan = (weeklyDietPlan as DietCategories).categories[category];
	const mealKey = `week_${currentWeek}` as keyof typeof dietPlan;
	const currentMeal = dietPlan[mealKey];

	const calculateWeekLock = (week: number) => {
		if (!startDate) return true;
		const weeksSinceStart = Math.floor(
			(new Date().getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
		);
		return week > weeksSinceStart + 1;
	};

	const handleWeekChange = (direction: "prev" | "next") => {
		setCurrentWeek((prev) => {
			if (direction === "prev") return Math.max(1, prev - 1);
			return Math.min(4, prev + 1);
		});
	};

	return (
		<div className="max-w-7xl mx-auto px-4 ">
			<div className="flex flex-col space-y-8">
				{/* Health Summary - Always at top */}
				<div className="order-1">
					<HealthSummary healthData={healthData} bmi={bmi} />
				</div>

				{/* New BMI Visualizer */}
				<div className="order-2 border">
					<BMIVisualizer bmi={bmi} />
				</div>

				{/* Weekly Meal Plan - Move to order-3 */}
				<div className="order-3 md:order-4">
					<WeeklyMealPlan
						currentWeek={currentWeek}
						mealPlan={currentMeal}
						onWeekChange={handleWeekChange}
						isLocked={calculateWeekLock(currentWeek)}
						totalWeeks={4}
					/>
				</div>

				{/* Calorie Breakdown - Move to order-4 */}
				<div className="order-4 md:order-3">
					<CalorieBreakdown healthData={healthData} startDate={startDate} />
				</div>
			</div>
		</div>
	);
}

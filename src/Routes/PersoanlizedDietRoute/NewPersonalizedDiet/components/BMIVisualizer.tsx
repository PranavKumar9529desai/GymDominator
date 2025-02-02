import { PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type BMIVisualizerProps = {
	bmi: number;
};

const BMI_RANGES = [
	{ min: 0, max: 16, category: "Severe Thinness", color: "#3B82F6" },
	{ min: 16, max: 17, category: "Moderate Thinness", color: "#60A5FA" },
	{ min: 17, max: 18.5, category: "Mild Thinness", color: "#93C5FD" },
	{ min: 18.5, max: 25, category: "Normal", color: "#10B981" },
	{ min: 25, max: 30, category: "Overweight", color: "#F59E0B" },
	{ min: 30, max: 35, category: "Obese Class I", color: "#FB7185" },
	{ min: 35, max: 40, category: "Obese Class II", color: "#EF4444" },
	{ min: 40, max: Infinity, category: "Obese Class III", color: "#B91C1C" },
];

const getBMICategory = (bmi: number) => {
	return (
		BMI_RANGES.find((range) => bmi >= range.min && bmi < range.max) ||
		BMI_RANGES[BMI_RANGES.length - 1]
	);
};

const getNeedleRotation = (bmi: number) => {
	const minBMI = 15;
	const maxBMI = 40;
	const minAngle = -90; // Left side of semicircle
	const maxAngle = 90; // Right side of semicircle

	// Clamp BMI value to our range
	const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);

	// Linear interpolation between angles based on BMI
	const angle =
		minAngle +
		((clampedBMI - minBMI) * (maxAngle - minAngle)) / (maxBMI - minBMI);

	return angle; // return only the numeric angle
};

const calculateLabelPosition = (bmiValue: number) => {
	const minBMI = 15;
	const maxBMI = 40;

	// Reverse the mapping: 15 should be at 180° (left) and 40 at 0° (right)
	const angleInDegrees = 180 - ((bmiValue - minBMI) / (maxBMI - minBMI)) * 180;
	const angleInRadians = angleInDegrees * (Math.PI / 180);

	// Calculate position on the semicircle
	const radius = 160;
	const x = 200 + Math.cos(angleInRadians) * radius;
	const y = 200 - Math.sin(angleInRadians) * radius;

	return { x, y };
};

export const BMIVisualizer = ({ bmi }: BMIVisualizerProps) => {
	const [chartSize, setChartSize] = useState({ width: 400, height: 240 });
	const [centerPoint, setCenterPoint] = useState({ x: 200, y: 200 });

	useEffect(() => {
		const updateDimensions = () => {
			const containerWidth = Math.min(window.innerWidth - 48, 400); // 48px for padding
			const height = containerWidth * 0.6; // maintain aspect ratio
			setChartSize({ width: containerWidth, height });
			setCenterPoint({ x: containerWidth / 2, y: containerWidth / 2 });
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const category = getBMICategory(bmi);
	const data = [
		{ value: 1, color: "#3B82F6" }, // Severe Thinness (0-16)
		{ value: 1, color: "#60A5FA" }, // Moderate Thinness (16-17)
		{ value: 1.5, color: "#93C5FD" }, // Mild Thinness (17-18.5)
		{ value: 6.5, color: "#10B981" }, // Normal (18.5-25)
		{ value: 5, color: "#F59E0B" }, // Overweight (25-30)
		{ value: 5, color: "#FB7185" }, // Obese Class I (30-35)
		{ value: 5, color: "#EF4444" }, // Obese Class II (35-40)
		{ value: 5, color: "#B91C1C" }, // Obese Class III (40+)
	];

	const CustomLabel = () => (
		<g>
			<text
				x={centerPoint.x}
				y={centerPoint.y - 40}
				textAnchor="middle"
				className="text-2xl md:text-3xl font-bold"
			>
				{bmi.toFixed(1)}
			</text>
			<text
				x={centerPoint.x}
				y={centerPoint.y - 10}
				textAnchor="middle"
				className="text-base md:text-lg"
				fill={category.color}
			>
				{category.category}
			</text>
		</g>
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="p-4 md:p-6 rounded-2xl bg-white shadow-lg overflow-hidden"
		>
			<div className="relative w-full mx-auto flex flex-col items-center">
				<PieChart width={chartSize.width} height={chartSize.height}>
					<Pie
						data={data}
						cx={centerPoint.x}
						cy={centerPoint.y}
						startAngle={180}
						endAngle={0}
						innerRadius={chartSize.width * 0.25}
						outerRadius={chartSize.width * 0.35}
						paddingAngle={0}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>

					<g
						transform={`rotate(${getNeedleRotation(bmi)} ${centerPoint.x} ${centerPoint.y})`}
					>
						<motion.path
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							d={`M ${centerPoint.x} ${centerPoint.y} L ${centerPoint.x} ${centerPoint.y - 60} L ${centerPoint.x - 4} ${centerPoint.y} L ${centerPoint.x + 4} ${centerPoint.y} Z`}
							fill={category.color}
						/>
						<circle
							cx={centerPoint.x}
							cy={centerPoint.y}
							r={6}
							fill={category.color}
						/>
					</g>

					<CustomLabel />

					{[15, 20, 25, 30, 35, 40].map((value) => {
						const pos = calculateLabelPosition(value);
						return (
							<text
								key={value}
								x={pos.x * (chartSize.width / 400)}
								y={pos.y * (chartSize.height / 240)}
								textAnchor="middle"
								dominantBaseline="middle"
								className="text-[10px] md:text-xs"
							>
								{value}
							</text>
						);
					})}
				</PieChart>

				{/* Updated BMI Categories Legend */}
				<div className="grid grid-cols-2 md:flex items-center justify-center gap-3 md:gap-6 mt-4 px-2 w-full">
					{BMI_RANGES.map((range) => (
						<div
							key={range.category}
							className="flex flex-col items-center justify-center space-y-1 min-w-[80px]"
						>
							<div className="flex items-center space-x-1.5">
								<div
									className="w-2.5 h-2.5 rounded-full flex-shrink-0"
									style={{ backgroundColor: range.color }}
								/>
								<span className="text-[10px] md:text-xs text-gray-600 whitespace-nowrap">
									{range.category}
								</span>
							</div>
							<span className="text-[9px] md:text-[10px] text-gray-500">
								{range.max === Infinity
									? `>${range.min}`
									: `${range.min} - ${range.max}`}
							</span>
						</div>
					))}
				</div>

				{/* Health Message */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
					className="mt-4 md:mt-6 p-3 md:p-4 rounded-lg text-center w-full"
					style={{ backgroundColor: `${category.color}20` }}
				>
					<p className="text-xs md:text-sm" style={{ color: category.color }}>
						{category.category === "Normal" ? (
							"Great job! You're maintaining a healthy BMI."
						) : (
							<>
								Your BMI of <span className="font-bold">{bmi.toFixed(1)}</span>{" "}
								indicates you're in the{" "}
								<span
									className="font-bold text-[1.1em]"
									style={{ color: category.color }}
								>
									{category.category.toLowerCase()}
								</span>{" "}
								range. Let's work together towards a healthier you!
							</>
						)}
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
};

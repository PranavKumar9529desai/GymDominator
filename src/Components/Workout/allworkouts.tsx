import { Input } from "@components/ui/input";
import { FetchMusclesGroups } from "@hooks/FetchMusclesGroups";
import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowRight, Dumbbell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
};

const categories = [
	{ name: "All", icon: Activity },
	{ name: "Upper Body", icon: Dumbbell },
	{ name: "Lower Body", icon: Dumbbell },
	{ name: "Core", icon: Dumbbell },
];

const upperBodyMuscles = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Traps", "Forearms"];
const lowerBodyMuscles = ["Quads", "Hamstrings", "Calves", "Glutes"];
const coreMuscles = ["Abs", "Obliques", "Lower Back"];

export const Allworkouts = () => {
	const { isLoading, muscles } = FetchMusclesGroups();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [filteredMuscles, setFilteredMuscles] = useState(muscles);
	const navigate = useNavigate();

	useEffect(() => {
		let filtered = muscles;

		// Apply category filter
		if (selectedCategory === "Upper Body") {
			filtered = muscles.filter((m) => upperBodyMuscles.includes(m.name));
		} else if (selectedCategory === "Lower Body") {
			filtered = muscles.filter((m) => lowerBodyMuscles.includes(m.name));
		} else if (selectedCategory === "Core") {
			filtered = muscles.filter((m) => coreMuscles.includes(m.name));
		}

		// Apply search filter
		filtered = filtered.filter((muscle) =>
			muscle.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setFilteredMuscles(filtered);
	}, [searchTerm, muscles, selectedCategory]);

	const handleMuscleClick = (muscleName: string) => {
		navigate(`/dashboard/workouts/${muscleName.toLowerCase()}`);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-4 md:p-6">
			{/* Hero Section with Animated Background */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative text-center mb-12 py-16"
			>
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 animate-gradient-x" />
				</div>
				<div className="relative z-10">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
					>
						Transform Your Training
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
					>
						Discover exercises tailored to your goals and elevate your fitness journey
					</motion.p>
				</div>
			</motion.div>

			{/* Search and Filter Section */}
			<div className="max-w-7xl mx-auto mb-12">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
					{/* Category Filters - Fixed scrollbar issue */}
					<div className="flex gap-2 w-full md:w-auto no-scrollbar">
						<div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
							{categories.map((category) => (
								<motion.button
									key={category.name}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setSelectedCategory(category.name)}
									className={cn(
										"px-6 py-2 rounded-full flex items-center gap-2 transition-all whitespace-nowrap",
										selectedCategory === category.name
											? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
											: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
									)}
									type="button"
								>
									<category.icon className="w-4 h-4" />
									{category.name}
								</motion.button>
							))}
						</div>
					</div>

					{/* Search Bar */}
					<div className="relative w-full md:w-96">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<Input
							type="text"
							placeholder="Search muscle groups..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 bg-white border-gray-200 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>
			</div>

			{/* Loading State */}
			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
						className="relative"
					>
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-30 animate-pulse" />
						<Dumbbell className="w-12 h-12 text-blue-500 relative z-10" />
					</motion.div>
				</div>
			) : (
				// Muscle Grid with AnimatePresence for smooth transitions
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedCategory}
						variants={containerVariants}
						initial="hidden"
						animate="show"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
					>
						{filteredMuscles.map((muscle) => (
							<motion.div
								key={muscle.name}
								variants={itemVariants}
								whileHover={{ y: -10, scale: 1.02 }}
								className="group"
								onClick={() => handleMuscleClick(muscle.name)}
							>
								<div className="relative h-full cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
									{/* Image Container with Overlay */}
									<div className="relative h-48 overflow-hidden">
										<motion.img
											src={muscle.image_url as string}
											alt={muscle.name}
											className="w-full h-full object-cover"
											whileHover={{ scale: 1.1 }}
											transition={{ duration: 0.6 }}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
										
										{/* Floating Stats */}
										<div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
											<span className="px-3 py-1 bg-blue-500 rounded-full text-sm text-white shadow-lg">
												{selectedCategory}
											</span>
											<span className="px-3 py-1 bg-purple-500 rounded-full text-sm text-white shadow-lg">
												{`${Math.floor(Math.random() * 15 + 5)} Exercises`}
											</span>
										</div>
									</div>

									{/* Content Section */}
									<div className="p-6">
										<h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors">
											{muscle.name.charAt(0).toUpperCase() + muscle.name.slice(1).toLowerCase()}
										</h3>
										<p className="text-gray-600 mb-4">
											Master your {muscle.name.toLowerCase()} with our curated collection of exercises
										</p>
										<motion.button
											type="button"
											whileHover={{ x: 5 }}
											className="flex items-center text-blue-500 group-hover:text-blue-600 transition-colors"
										>
											Explore Workouts
											<ArrowRight className="w-4 h-4 ml-2" />
										</motion.button>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
};

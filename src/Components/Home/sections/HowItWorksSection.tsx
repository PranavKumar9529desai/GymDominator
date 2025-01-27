import { motion } from "framer-motion";
import {
	QrCodeIcon,
	ClipboardDocumentCheckIcon,
	ChartBarIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";

const steps = [
	{
		step: 1,
		title: "Scan Onboarding QR",
		description:
			"Scan the QR code provided by your gym owner or trainer to get started with your fitness journey",
		icon: <QrCodeIcon className="w-6 h-6 text-white" />,
	},
	{
		step: 2,
		title: "Health Profile Form",
		description:
			"Complete your health profile by providing essential information about your fitness goals and current status",
		icon: <ClipboardDocumentCheckIcon className="w-6 h-6 text-white" />,
	},
	{
		step: 3,
		title: "View Your Plans",
		description:
			"Access your personalized diet and workout plans created specifically for your goals",
		icon: <ChartBarIcon className="w-6 h-6 text-white" />,
	},
	{
		step: 4,
		title: "Mark Attendance",
		description:
			"Scan the attendance QR code at your gym to track your daily progress",
		icon: <UserCircleIcon className="w-6 h-6 text-white" />,
	},
];

export const HowItWorksSection = () => {
	return (
		<section className="w-full overflow-hidden bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
					How It Works
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
					{steps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="text-center p-4 sm:p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
						>
							<div className="relative w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/50">
								{step.icon}
								<span className="text-sm font-bold absolute -top-2 -right-2 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center">
									{step.step}
								</span>
							</div>
							<h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
								{step.title}
							</h3>
							<p className="text-gray-400 text-sm">{step.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

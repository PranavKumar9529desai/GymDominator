import { FlipCard } from "./Flipcard";
import { motion } from "framer-motion";

interface FeatureType {
	title: string;
	description: string;
}

const features: FeatureType[] = [
	{
		title: "Smart QR Attendance",
		description:
			"Revolutionary QR-based attendance system. Generate daily unique codes for seamless check-ins and automated tracking.",
	},
	{
		title: "Personalized Diet",
		description:
			"Custom nutrition plans tailored to individual goals. Track meals and get real-time recommendations for optimal results.",
	},
	{
		title: "Trainer Assignment Hub",
		description:
			"Effortlessly manage trainer-member relationships. Streamline communications and track progress in real-time.",
	},
	{
		title: "Personalized Fitness Journey",
		description:
			"Custom workout plans and diet charts tailored to each member. Track progress and adjust goals dynamically.",
	},
	{
		title: "Advanced Analytics",
		description:
			"Comprehensive insights into attendance patterns, member engagement, and business performance metrics.",
	},
	{
		title: "Member Portal",
		description:
			"Empower members with easy access to workouts, diet plans, and attendance history through a dedicated portal.",
	},
];

export default function FeaturesSection() {
	return (
		<section className="py-24 bg-gray-900 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

			<div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative">
				{/* Section Header */}
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="text-3xl md:text-4xl font-bold text-white mb-4"
					>
						Powerful Features for Modern Gyms
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="text-gray-400 max-w-2xl mx-auto"
					>
						Transform your gym management with our comprehensive suite of
						digital tools
					</motion.p>
				</div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: idx * 0.1 }}
							viewport={{ once: true }}
						>
							<FlipCard
								title={feature.title}
								description={feature.description}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

import { Card, CardContent } from "@components/ui/card";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function AboutPersonalTrainer() {
	const trainerInfo = {
		name: "John Doe",
		image: "/trainer-image.jpg", // Replace with actual image path
		phone: "+1 (234) 567-8900",
		email: "john.doe@GymNavigator.com",
		location: "Main Gym Floor",
		timings: [
			{ days: "Monday - Friday", hours: "6:00 AM - 9:00 PM" },
			{ days: "Saturday", hours: "7:00 AM - 6:00 PM" },
			{ days: "Sunday", hours: "8:00 AM - 2:00 PM" },
		],
		specializations: [
			"Weight Training",
			"HIIT",
			"Nutrition Planning",
			"Strength & Conditioning",
		],
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<Card className="overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
				<CardContent className="p-0">
					<div className="grid md:grid-cols-2 gap-6">
						{/* Trainer Image Section */}
						<div className="relative h-[400px] md:h-full">
							<img
								src={trainerInfo.image}
								alt={trainerInfo.name}
								className="w-full h-full object-cover"
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
								<h1 className="text-3xl font-bold text-white">
									{trainerInfo.name}
								</h1>
								<p className="text-white/90">Professional Fitness Trainer</p>
							</div>
						</div>

						{/* Information Section */}
						<div className="p-6 space-y-6">
							{/* Contact Information */}
							<div className="space-y-4">
								<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
									Contact Information
								</h2>
								<div className="space-y-3">
									<div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
										<Phone className="h-5 w-5" />
										<span>{trainerInfo.phone}</span>
									</div>
									<div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
										<Mail className="h-5 w-5" />
										<span>{trainerInfo.email}</span>
									</div>
									<div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
										<MapPin className="h-5 w-5" />
										<span>{trainerInfo.location}</span>
									</div>
								</div>
							</div>

							{/* Available Timings */}
							<div className="space-y-4">
								<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
									Available Timings
								</h2>
								<div className="space-y-3">
									{trainerInfo.timings.map((timing, index) => (
										<div
											key={index}
											className="flex items-start space-x-3 text-gray-600 dark:text-gray-300"
										>
											<Clock className="h-5 w-5 mt-0.5" />
											<div>
												<p className="font-medium">{timing.days}</p>
												<p className="text-sm">{timing.hours}</p>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Specializations */}
							<div className="space-y-4">
								<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
									Specializations
								</h2>
								<div className="flex flex-wrap gap-2">
									{trainerInfo.specializations.map((spec, index) => (
										<span
											key={index}
											className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
										>
											{spec}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

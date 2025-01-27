import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	GetHealthProfileInfo,
	HealthProfileInfo,
} from "./GetHealthProfileInfo";

export default function HealthProfileComponent() {
	const navigate = useNavigate();
	const [healthProfile, setHealthProfile] = useState<HealthProfileInfo | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchHealthProfile = async () => {
			try {
				const response = await GetHealthProfileInfo();
				if (response.success) {
					setHealthProfile(response.healthProfile);
				} else {
					setError(response.message || "Health profile not found");
				}
			} catch (err) {
				console.log("Error fetching trainer info:", err);

				setError("Unable to fetch health profile");
			} finally {
				setLoading(false);
			}
		};

		fetchHealthProfile();
	}, []);

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);

	if (error)
		return (
			<div className="p-6">
				<div className="bg-white rounded-lg shadow-lg p-8 text-center">
					<div className="mb-4">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-medium text-gray-900 mb-2">
						Health Profile Not Found
					</h3>
					<p className="text-gray-500 mb-6">
						Please complete your health profile to get personalized fitness
						recommendations and tracking.
					</p>
					<button
						onClick={() => navigate("/onboarding/healthprofile")}
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Create Health Profile
					</button>
				</div>
			</div>
		);

	if (!healthProfile)
		return (
			<div className="p-6">
				<div className="bg-white rounded-lg shadow p-8 text-center">
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						No Health Profile Found
					</h2>
					<p className="text-gray-600 mb-6">
						You haven't set up your health profile yet. Please complete your
						profile to get personalized recommendations.
					</p>
					<button
						onClick={() => navigate("/dashboard/healthprofile")}
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
					>
						Create Health Profile
					</button>
				</div>
			</div>
		);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
				Health Profile
			</h1>
			<div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					<div className="bg-blue-50 p-6 rounded-lg text-center hover:bg-blue-100 transition-colors duration-200">
						<p className="text-gray-600 text-sm uppercase tracking-wide mb-1">
							Height
						</p>
						<p className="text-2xl font-bold text-blue-600">
							{healthProfile.height}
							<span className="text-sm ml-1">cm</span>
						</p>
					</div>
					<div className="bg-green-50 p-6 rounded-lg text-center hover:bg-green-100 transition-colors duration-200">
						<p className="text-gray-600 text-sm uppercase tracking-wide mb-1">
							Weight
						</p>
						<p className="text-2xl font-bold text-green-600">
							{healthProfile.weight}
							<span className="text-sm ml-1">kg</span>
						</p>
					</div>
					<div className="bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors duration-200">
						<p className="text-gray-600 text-sm uppercase tracking-wide mb-1">
							Age
						</p>
						<p className="text-2xl font-bold text-purple-600">
							{healthProfile.age}
							<span className="text-sm ml-1">years</span>
						</p>
					</div>
				</div>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
						<p className="text-gray-600 text-sm uppercase tracking-wide mb-1">
							Gender
						</p>
						<p className="text-xl font-semibold text-gray-800">
							{healthProfile.gender}
						</p>
					</div>
					<div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
						<p className="text-gray-600 text-sm uppercase tracking-wide mb-1">
							Diet Type
						</p>
						<p className="text-xl font-semibold text-gray-800">
							{healthProfile.diet}
						</p>
					</div>
					<div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 md:col-span-2">
						<p className="text-gray-600 text-sm uppercase tracking-wide mb-1">
							Fitness Goal
						</p>
						<p className="text-xl font-semibold text-gray-800">
							{healthProfile.goal}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

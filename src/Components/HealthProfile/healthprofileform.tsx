import { useState } from "react";
import { User, Phone, MapPin, Ruler, Weight, Utensils } from "lucide-react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface UserHealthProfileType {
	adress: string;
	contactNumber: string;
	dietPreference: string;
	fullName: string;
	height: number;
	weight: number;
}

interface UserHealthProfileResponseType {
	smg: string;
	userhealthprofile: UserHealthProfileType;
}

export const HealthProfileForm = () => {
	const [isLoading, setisLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		fullName: "",
		contactNumber: "",
		address: "",
		height: "",
		weight: "",
		dietPreference: "",
	});

	function AddDataToLocalstrorage(response: UserHealthProfileType) {
		const UserHealthProfile = response;
		localStorage.setItem(
			"UserHealthProfile",
			JSON.stringify(UserHealthProfile),
		);
	}

	const SendHealthProfileData = async () => {
		try {
			setisLoading(true);
			const response: AxiosResponse<UserHealthProfileResponseType> =
				await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/userhealthprofile`,
					formData,
					{
						headers: {
							Authorization: "Bearer " + localStorage.getItem("jwt"),
						},
					},
				);
			console.log("response from the", response);
			AddDataToLocalstrorage(response.data.userhealthprofile);
		} catch (error) {
			setisLoading(false);
			console.error("Error sending health profile data:", error);
		} finally {
			setisLoading(false);
			navigate("/onboarding/healthprofile/workoutplace");
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log(name, value);
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		SendHealthProfileData();
		// Handle form submission here
		console.log("Form submitted:", formData);
	};

	return (
		<div>
			{isLoading ? (
				<div className="flex justify-center items-center ">Loading ....</div>
			) : (
				<div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Health Profile
					</h1>
					<p className="text-gray-600 mb-6">
						Fill out the form to create your personalized health profile.
					</p>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label
									htmlFor="fullName"
									className="block text-sm font-medium text-gray-700"
								>
									Full Name
								</label>
								<div className="relative">
									<input
										type="text"
										id="fullName"
										name="fullName"
										value={formData.fullName}
										onChange={handleInputChange}
										className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
										required
									/>
									<User
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="contactNumber"
									className="block text-sm font-medium text-gray-700"
								>
									Contact Number
								</label>
								<div className="relative">
									<input
										type="tel"
										id="contactNumber"
										name="contactNumber"
										value={formData.contactNumber}
										onChange={handleInputChange}
										className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
										required
									/>
									<Phone
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="address"
								className="block text-sm font-medium text-gray-700"
							>
								Address
							</label>
							<div className="relative">
								<input
									type="text"
									id="address"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
									required
								/>
								<MapPin
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={18}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label
									htmlFor="height"
									className="block text-sm font-medium text-gray-700"
								>
									Height (cm)
								</label>
								<div className="relative">
									<input
										type="number"
										id="height"
										name="height"
										value={formData.height}
										onChange={handleInputChange}
										placeholder="Enter your height"
										className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
										required
									/>
									<Ruler
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="weight"
									className="block text-sm font-medium text-gray-700"
								>
									Weight (kg)
								</label>
								<div className="relative">
									<input
										type="number"
										id="weight"
										name="weight"
										value={formData.weight}
										onChange={handleInputChange}
										placeholder="Enter your weight"
										className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
										required
									/>
									<Weight
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="dietPreference"
								className="block text-sm font-medium text-gray-700"
							>
								Diet Preference
							</label>
							<div className="relative">
								<select
									id="dietPreference"
									name="dietPreference"
									value={formData.dietPreference}
									// @ts-ignore
									onChange={handleInputChange}
									className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
									required
								>
									<option value="">Select diet preference</option>
									<option value="vegan">Vegan</option>
									<option value="vegetarian">Vegetarian</option>
									<option value="pescatarian">Pescatarian</option>
									<option value="omnivore">Omnivore</option>
									<option value="keto">Keto</option>
									<option value="paleo">Paleo</option>
								</select>
								<Utensils
									className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
									size={18}
								/>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg
										className="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
									</svg>
								</div>
							</div>
						</div>

						<div className="flex justify-center">
							<button
								type="submit"
								className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-1"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

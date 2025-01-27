import axios from "axios";

interface HealthProfile {
	id: number;
	userid: number;
	fullname: string;
	contact: string;
	weight: number;
	height: number;
	diet: string;
	goal: string;
	age: number;
	gender: string;
}

interface HealthProfileResponse {
	success: boolean;
	data: HealthProfile;
	error?: string;
	details?: string;
}

export const GetHealthProfileData =
	async (): Promise<HealthProfileResponse> => {
		try {
			const response = await axios.get<HealthProfileResponse>(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/gethealthprofile`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				},
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching health profile data:", error);
			throw error;
		}
	};

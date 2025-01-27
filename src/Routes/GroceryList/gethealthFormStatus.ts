import axios from "axios";

export interface HealthProfile {
	id: number;
	userid: number;
	// Add other health profile fields as needed
}

interface HealthFormResponse {
	msg: string;
	healthProfile: HealthProfile | null;
}

export const GetHealthFormStatus = async (): Promise<HealthFormResponse> => {
	try {
		const response = await axios.get<HealthFormResponse>(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/healthformstatus`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching health form status:", error);
		throw error;
	}
};

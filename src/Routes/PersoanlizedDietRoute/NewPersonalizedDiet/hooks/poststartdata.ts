import axios from "axios";

interface StartDateResponse {
	success: boolean;
	data?: {
		startDate: string;
	};
	error?: string;
}

export const postStartDate = async (): Promise<StartDateResponse> => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/track-dietdate`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error posting start date:", error);
		throw error;
	}
};

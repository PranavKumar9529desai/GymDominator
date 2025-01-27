import axios from "axios";

export interface TrainerInfo {
	id: number;
	name: string;
	email: string;
	shift: string;
	rating: number;
	image: string;
}

interface TrainerResponse {
	success: boolean;
	trainerInfo: TrainerInfo;
	message?: string;
	error?: string;
}

export const GetTrainerInfo = async (): Promise<TrainerResponse> => {
	try {
		const response = await axios.get<TrainerResponse>(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/trainerinfo`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching trainer info:", error);
		throw error;
	}
};

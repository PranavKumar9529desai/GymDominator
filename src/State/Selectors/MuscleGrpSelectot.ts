import axios, { type AxiosResponse } from "axios";
import { type RecoilValueReadOnly, selector } from "recoil";

export interface Exercise {
	id: number;
	name: string;
	image_url: string | null;
	type: string | null;
	equipment: string | null;
	mechanics: string | null;
	experience_level: string | null;
	detail_url: string | null;
	video_url: string | null;
	muscle_image: string | null;
	instructions: string;
	muscle_group: string;
}

export interface MuscleGroup {
	img: string;
	id: number;
	name: string;
	image_url: string | null;
	exercises: Exercise[];
}

interface MuscleGroupResponse {
	msg: string;
	muscleGroups: MuscleGroup[];
}

export const MuscleSelector: RecoilValueReadOnly<MuscleGroup[]> = selector({
	key: "MuscleSelector",
	get: async () => {
		// TODO : handle fectching errors
		const response: AxiosResponse<MuscleGroupResponse> = await axios(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/workouts/`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);
		return response.data.muscleGroups;
	},
});

import axios, { AxiosResponse } from "axios";
import { RecoilValueReadOnly, selector } from "recoil";

export interface excercise {
	id: number;
	img: string;
	muscle: string;
	instructions: string;
	videolink: string;
	name: string;
}

export interface MuscleGrp {
	name: string;
	img: string;
	fullimage: string;
	Exercise: excercise[];
}

interface res {
	msg: string;
	muscleGrp: MuscleGrp[];
}

export const MuscleSelector: RecoilValueReadOnly<MuscleGrp[]> = selector({
	key: "MuscleSelector",
	get: async () => {
		// TODO : handle fectching errors
		const response: AxiosResponse<res> = await axios(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/workouts/`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);
		return response.data.muscleGrp;
	},
});

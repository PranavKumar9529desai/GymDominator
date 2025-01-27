import axios, { AxiosResponse } from "axios";
import { selectorFamily } from "recoil";
import { RecoilValueReadOnly } from "recoil";

export interface Excercisetype {
	name: string;
	img: string;
	instructions: string;
	videolink: string;
	MuscleGroup: {
		id: number;
		name: string;
		img: string;
		fullimage: string;
	};
}

interface ResponseType {
	msg: string;
	Excercises: Excercisetype[];
}

export const ExcersiceSelector: (
	muscle: string,
) => RecoilValueReadOnly<Excercisetype[]> = selectorFamily({
	key: "ExcersiceSelector",
	get:
		(muscle: string) =>
		async ({}) => {
			const response: AxiosResponse<ResponseType> = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/workouts/${muscle}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				},
			);
			return response.data.Excercises;
		},
});

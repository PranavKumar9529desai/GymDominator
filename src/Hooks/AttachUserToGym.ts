import axios from "axios";
import { AxiosResponse } from "axios";

export interface AttachUserToGymType {
	msgs: string;
	user: {
		gym_id: string;
		name: string;
		Gym: {
			select: {
				gym_name: string;
				address: string;
				gym_logo: string;
			};
		};
	} | null;
}

export const AttachUserToGym = async (
	gymname: string,
	gymid: string,
	hash: string,
) => {
	try {
		const response: AxiosResponse<AttachUserToGymType> = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/attachtogym`,
			{
				gymname: gymname,
				gymid: gymid,
				hash: hash,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);

		console.log("response from the the getEnrollmentStatus", response.data);
		return response.data;
	} catch (error) {
		console.log("error from the backend", error);
		const msgs = "Failed to attach user to gym";
		return { msgs, user: null };
	}
};

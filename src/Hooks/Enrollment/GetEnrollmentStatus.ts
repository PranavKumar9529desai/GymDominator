import axios from "axios";
import { AxiosResponse } from "axios";
interface GetEnrollmentStatusType {
	msg: string;
	isEnrolled: boolean;
}

export const GetEnrollmentStatus = async () => {
	const response: AxiosResponse<GetEnrollmentStatusType> = await axios(
		`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/gymenrollmentstatus`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		},
	);
	console.log("response from the the getEnrollmentStatus", response.data);
	return response.data;
};

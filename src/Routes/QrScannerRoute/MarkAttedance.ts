import axios from "axios";

interface MarkAttendanceResponse {
	success: boolean;
	data?: {
		id: number;
		userId: number;
		validPeriodId: number;
		date: string;
		scanTime: string;
		attended: boolean;
	};
	error?: string;
	details?: string;
}

export const MarkAttendance = async (): Promise<MarkAttendanceResponse> => {
	try {
		const now = new Date();
		const clientUTC = Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
		);
		const truncatedUtcDate = new Date(clientUTC);
		const response = await axios.post<MarkAttendanceResponse>(
			`${
				import.meta.env.VITE_BACKEND_URL
			}/api/v1/user/protected/mark-attendance`,
			{
				clientDate: truncatedUtcDate.toISOString(),
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data as MarkAttendanceResponse;
		}
		throw error;
	}
};

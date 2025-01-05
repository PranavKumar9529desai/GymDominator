import axios from "axios";

interface AttendanceDaysResponse {
  success: boolean;
  data?: Date[];
  error?: string;
  details?: string;
}

export const GetAttendanceDays = async (): Promise<AttendanceDaysResponse> => {
  try {
    const response = await axios.post<AttendanceDaysResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/userprogress`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log("dates are this", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as AttendanceDaysResponse;
    }
    throw error;
  }
};

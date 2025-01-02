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
    const clientDate = new Date();
    clientDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0
    const response = await axios.post<MarkAttendanceResponse>(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/user/protected/mark-attendance`,
      {
        clientDate: clientDate.toISOString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as MarkAttendanceResponse;
    }
    throw error;
  }
};

import axios from "axios";

interface TodaysAttendanceResponse {
  success: boolean;
  data?: {
    attended: boolean;
    scanTime: string | null;
    userName: string;
  };
  msg?: string;
}

export const GetTodaysAttendance = async (): Promise<TodaysAttendanceResponse> => {
  try {
    const response = await axios.get<TodaysAttendanceResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/gettodaysattendanceinfo`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching today\'s attendance:', error);
    throw error;
  }
};

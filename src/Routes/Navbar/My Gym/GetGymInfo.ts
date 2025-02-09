import axios from 'axios';

export interface GymInfo {
  id?: number;
  name?: string;
  logo?: string;
  address?: string;
  contact?: string;
  email?: string;
}

interface GymInfoResponse {
  success: boolean;
  gymInfo?: GymInfo;
  message?: string;
  error?: string;
}

export const GetGymInfo = async (): Promise<GymInfoResponse> => {
  try {
    const response = await axios.get<GymInfoResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/aboutgym`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'No gym information found');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { success: false, message: 'No gym assigned' };
      }
      throw new Error('Failed to connect to the server');
    }
    throw error;
  }
};

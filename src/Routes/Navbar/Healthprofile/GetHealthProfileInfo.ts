import axios from 'axios';

export interface HealthProfileInfo {
  id: number;
  height: number;
  weight: number;
  age: number;
  gender: string;
  diet: string;
  goal: string;
}

interface HealthProfileResponse {
  success: boolean;
  healthProfile: HealthProfileInfo;
  message?: string;
  error?: string;
}

export const GetHealthProfileInfo = async (): Promise<HealthProfileResponse> => {
  try {
    const response = await axios.get<HealthProfileResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/healthprofile`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching health profile:', error);
    throw error;
  }
};

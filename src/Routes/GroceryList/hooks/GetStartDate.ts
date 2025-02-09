import axios from 'axios';

interface TrackDietResponse {
  success: boolean;
  data: {
    startDate: string;
    endDate: string | null;
  };
}

export const GetStartDate = async (): Promise<Date | null> => {
  try {
    const response = await axios.get<TrackDietResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/track-dietdate`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }
    );

    console.log('date from the backend is ', response.data);
    if (response.data.success && response.data.data.startDate) {
      return new Date(response.data.data.startDate);
    }
    return null;
  } catch (error) {
    console.error('Error fetching diet start date:', error);
    return null;
  }
};

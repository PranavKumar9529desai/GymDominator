import axios from 'axios';
import type { AxiosResponse } from 'axios';

interface GetEnrollmentStatusType {
  msg: string;
  isEnrolled: boolean;
}

export const GetEnrollmentStatus = async () => {
  const response: AxiosResponse<GetEnrollmentStatusType> = await axios.get(
    'http://localhost:3000/api/v1/users/enrollmentstatus',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }
  );
  console.log('response from the the getEnrollmentStatus', response.data);
  return response.data;
};

import axios from 'axios';

export const PostHealthProfile = async (data: any) => {
  const response = await axios.post('/api/healthProfile', {
    data,
  });

  return response;
};

import axios from 'axios';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const PostHealthProfile = async (data: any) => {
  const response = await axios.post('/api/healthProfile', {
    data,
  });

  return response;
};

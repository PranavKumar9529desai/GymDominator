import axios from 'axios';
import { toast } from 'sonner';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or server not responding
      toast.error('Unable to connect to server. Please check your internet connection.');
      throw new Error('Network error: Unable to connect to server');
    }

    if (error.response.status >= 500) {
      toast.error('Server error. Please try again later.');
      throw new Error('Server error');
    }

    return Promise.reject(error);
  }
);

export default instance;

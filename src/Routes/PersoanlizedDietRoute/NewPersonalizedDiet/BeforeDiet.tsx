import { useNavigate } from 'react-router-dom';
import { postStartDate } from './hooks/poststartdata';

export default function BeforeDiet() {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    try {
      const response = await postStartDate();
      if (response.success) {
        navigate('/personalized-diet');
      }
    } catch (error) {
      console.error('Error starting diet:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Begin Your Journey to a Healthier You
          </h1>
          <p className="text-lg text-gray-600">
            "The journey of a thousand miles begins with a single step. Today is your day to take that step towards a healthier lifestyle."
          </p>
        </div>
        
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

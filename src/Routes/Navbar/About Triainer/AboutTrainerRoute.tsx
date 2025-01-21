import { useEffect, useState } from 'react';
import { GetTrainerInfo, TrainerInfo } from './GetTrianerInfo';

export default function AboutTrainerComponent() {
  const [trainerInfo, setTrainerInfo] = useState<TrainerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainerInfo = async () => {
      try {
        const response = await GetTrainerInfo();
        if (response.success) {
          setTrainerInfo(response.trainerInfo);
        } else {
          setError(response.message || 'Trainer not assigned yet');
        }
      } catch (err) {
        console.log('Error fetching trainer info:', err);
        setError('No trainer information available');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerInfo();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Trainer Not Assigned</h3>
        <p className="text-gray-500 mb-6">Your account currently doesn't have a trainer assigned. Please visit the gym reception to get assigned to a personal trainer.</p>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );

  if (!trainerInfo) return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Trainer Assigned</h2>
        <p className="text-gray-600">You currently don't have a trainer assigned. Please contact your gym administrator to get assigned to a trainer.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">Your Trainer</h1>
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="mb-4 md:mb-0 md:mr-8">
            {trainerInfo.image ? (
              <img 
                src={trainerInfo.image} 
                alt={trainerInfo.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 hover:border-blue-200 transition-colors duration-300 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-100 hover:border-blue-200 transition-colors duration-300 shadow-lg">
                <svg 
                  className="w-20 h-20 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{trainerInfo.name}</h2>
            <p className="text-blue-600 font-medium">{trainerInfo.email}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Shift</p>
            <p className="text-xl font-semibold text-gray-800">{trainerInfo.shift}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-1">Rating</p>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-800 mr-2">{trainerInfo.rating}</span>
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

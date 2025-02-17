import { useEffect, useState } from 'react';
import { GetGymInfo } from './GetGymInfo';
import type { GymInfo } from './GetGymInfo';

export default function GymInfoComponent() {
  const [gymInfo, setGymInfo] = useState<GymInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGymInfo = async () => {
      try {
        const response = await GetGymInfo();
        setGymInfo(response.success ? (response.gymInfo ?? null) : null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGymInfo();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );

  if (!gymInfo)
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Gym Assigned</h2>
          <p className="text-gray-600">
            You currently don't have a gym assigned to your profile. Please contact the
            administrator.
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4 text-center">Your Gym </h1>
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
        {gymInfo.logo && (
          <div className="mb-6 flex justify-center transform hover:scale-105 transition-transform duration-300">
            <img
              src={gymInfo.logo}
              alt={gymInfo.name}
              className="h-40 w-40 object-contain rounded-lg"
            />
          </div>
        )}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{gymInfo.name}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Address:</span>
              <br />
              {gymInfo.address}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Contact:</span>
              <br />
              {gymInfo.contact}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 md:col-span-2">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Email:</span>
              <br />
              {gymInfo.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

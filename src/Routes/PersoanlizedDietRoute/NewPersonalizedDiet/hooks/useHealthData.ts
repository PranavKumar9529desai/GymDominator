import { useState, useEffect } from 'react';
import { GetHealthProfileData } from '../../actions/GetHealthProfileData';
import { HealthData } from '../types';

export const useHealthData = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await GetHealthProfileData();
        if (response.success) {
          setHealthData(response.data);
        }
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  return { healthData, isLoading };
};

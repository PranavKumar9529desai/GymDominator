import { useState, useEffect } from 'react';
import { GetHealthProfileData } from '../../PersoanlizedDietRoute/actions/GetHealthProfileData';
import { getBMICategory } from '../../PersoanlizedDietRoute/NewPersonalizedDiet/types/diet';
import { HealthData } from '../../PersoanlizedDietRoute/NewPersonalizedDiet/types/health';

export const useHealthProfile = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const health = await GetHealthProfileData();
        if (health.success) {
          const transformedData: HealthData = {
            ...health.data,
            gender: health.data.gender as 'male' | 'female' | 'other'
          };
          setHealthData(transformedData);
          
          const bmi = transformedData.weight / Math.pow(transformedData.height / 100, 2);
          setCategory(getBMICategory(bmi));
        }
      } catch (error) {
        console.error('Failed to fetch health profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return { healthData, category, loading };
};

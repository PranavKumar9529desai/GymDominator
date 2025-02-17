import { useEffect, useState } from 'react';
import BeforeDiet from './components/BeforeDiet';
import { GroceryList } from './components/GroceryList';
import NoHealthProfile from './components/NoHealthProfile';
import { GetHealthFormStatus } from './gethealthFormStatus';
import type { HealthProfile } from './gethealthFormStatus';
import { GetStartDate } from './hooks/GetStartDate';

export default function GroceryListRoute() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // First check health profile status
        const healthStatus = await GetHealthFormStatus();
        setHealthProfile(healthStatus.healthProfile);

        // Only fetch start date if we have a health profile
        if (healthStatus.healthProfile) {
          const date = await GetStartDate();
          setStartDate(date);
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (startDate) {
      const now = new Date();
      const diffTime = now.getTime() - startDate.getTime();
      const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
      setCurrentWeek(Math.min(Math.max(1, diffWeeks + 1), 4));
    }
  }, [startDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Show NoHealthProfile if health profile is null
  if (!healthProfile) {
    return <NoHealthProfile />;
  }

  // Show BeforeDiet if we have health profile but no start date
  if (!startDate) {
    return <BeforeDiet />;
  }

  // Show GroceryList if we have both health profile and start date
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <GroceryList week={currentWeek} onWeekChange={setCurrentWeek} />
    </div>
  );
}

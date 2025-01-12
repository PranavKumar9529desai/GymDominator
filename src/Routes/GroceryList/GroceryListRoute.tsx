import { useState, useEffect } from 'react';
import { GroceryList } from './components/GroceryList';
import { GetStartDate } from './hooks/GetStartDate';
import { useHealthProfile } from './hooks/useHealthProfile';
import NoHealthProfile from './components/NoHealthProfile';
import BeforeDiet from './components/BeforeDiet';

export default function GroceryListRoute() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const { healthData, loading: healthLoading } = useHealthProfile();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isLoadingDate, setIsLoadingDate] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      if (healthData) {
        try {
          const date = await GetStartDate();
          setStartDate(date);
        } catch (error) {
          console.error('Error fetching start date:', error);
        } finally {
          setIsLoadingDate(false);
        }
      }
    };

    initializeData();
  }, [healthData]);

  useEffect(() => {
    if (startDate) {
      const now = new Date();
      const diffTime = now.getTime() - startDate.getTime();
      const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
      setCurrentWeek(Math.min(Math.max(1, diffWeeks + 1), 4));
    }
  }, [startDate]);

  if (healthLoading || isLoadingDate) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!healthData) {
    return <NoHealthProfile />;
  }

  if (!startDate) {
    return <BeforeDiet />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <GroceryList week={currentWeek} onWeekChange={setCurrentWeek} />
    </div>
  );
}

import { useState, useEffect } from 'react';
import NewPersonalizedDiet from './NewPersonalizedDiet';
import BeforeDiet from './BeforeDiet';
import { GetStartDate } from './hooks/GetStartDate';

export default function NewPersonalizedDietRoute() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartDate = async () => {
      try {
        const date = await GetStartDate();
        setStartDate(date);
      } catch (error) {
        console.error('Error fetching start date:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartDate();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{startDate ? <NewPersonalizedDiet /> : <BeforeDiet />}</div>;
}

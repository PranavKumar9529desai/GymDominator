import { useState, useEffect } from "react";
import { GetStartDate } from "./GetStartDate"; // Fix import path
export const useDietProgress = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartDate = async () => {
      try {
        const date = await GetStartDate();
        setStartDate(date);
      } catch (err) {
        console.error("Error fetching diet start date:", err);
        setError("Failed to fetch diet start date");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartDate();
  }, []);

  return { startDate, isLoading, error };
};

import { useEffect, useState } from "react";
import NoHealthProfile from "./NoHealthProfile";
import { GetHealthFormStatus } from "./actions/gethealthFormStatus";
import { Loader2 } from "lucide-react";
import NewPersonalizedDietRoute from "./NewPersonalizedDiet/NewPersonalizedDietRoute";

export default function PersonalizedDietRoute() {
  const [hasHealthProfile, setHasHealthProfile] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealthProfile = async () => {
      try {
        const response = await GetHealthFormStatus();
        setHasHealthProfile(response.healthProfile !== null);
      } catch (err) {
        setError("Failed to fetch health profile status");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkHealthProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return hasHealthProfile ? <NewPersonalizedDietRoute /> : <NoHealthProfile />;
}
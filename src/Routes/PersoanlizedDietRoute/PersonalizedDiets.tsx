import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ReactCardFlip from 'react-card-flip';
import { GetHealthProfileData } from './GetHealthProfileData';
import { GetHealthFormStatus } from './gethealthFormStatus';
import NoHealthProfile from './NoHealthProfile';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DietPlan {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  meals: Array<{ title: string; ingredients: string[] }>;
}

interface HealthProfile {
  weight: number;
  height: number;
  age: number;
  gender: string;
}

const calculateDietPlan = (weight: number, height: number, age: number, gender: string): DietPlan => {
  // Harris-Benedict BMR Formula
  const bmr = gender === 'male'
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

  // Total daily calories (assuming moderate activity)
  const calories = Math.round(bmr * 1.55);

  // Macronutrient split (40/30/30)
  const protein = Math.round((calories * 0.3) / 4); // 4 calories per gram of protein
  const carbs = Math.round((calories * 0.4) / 4);   // 4 calories per gram of carbs
  const fat = Math.round((calories * 0.3) / 9);     // 9 calories per gram of fat

  // Generate meal plan based on calories
  const meals = [
    {
      title: 'Breakfast',
      ingredients: [
        `Oats (${Math.round(calories * 0.15 / 4)}g)`,
        `Skim Milk (${Math.round(calories * 0.05 / 4)}ml)`,
        'Banana (1 medium)',
      ],
    },
    {
      title: 'Lunch',
      ingredients: [
        `Brown Rice (${Math.round(calories * 0.2 / 4)}g)`,
        `Chicken Breast (${Math.round(calories * 0.15 / 4)}g)`,
        'Mixed Vegetables (1 cup)',
      ],
    },
    {
      title: 'Snack',
      ingredients: [
        'Greek Yogurt (1 cup)',
        'Mixed Berries (1/2 cup)',
        `Nuts (${Math.round(calories * 0.05 / 9)}g)`,
      ],
    },
    {
      title: 'Dinner',
      ingredients: [
        `Salmon (${Math.round(calories * 0.15 / 4)}g)`,
        `Quinoa (${Math.round(calories * 0.1 / 4)}g)`,
        'Mixed Vegetables (1 cup)',
      ],
    },
  ];

  return { calories, carbs, protein, fat, meals };
};

const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export default function PersonalizedDiets() {
  const [data, setData] = useState<DietPlan | null>(null);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [bmi, setBmi] = useState<number | null>(null);
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasHealthProfile, setHasHealthProfile] = useState(false);

  useEffect(() => {
    const checkHealthFormStatus = async () => {
      try {
        const formStatus = await GetHealthFormStatus();
        if (formStatus.healthProfile) {
          setHasHealthProfile(true);
          // Only fetch health profile data if we have a profile
          const healthProfileResponse = await GetHealthProfileData();
          if (healthProfileResponse.success && healthProfileResponse.data) {
            const { weight, height, age, gender } = healthProfileResponse.data;
            const calculatedBMI = calculateBMI(weight, height);
            setBmi(calculatedBMI);
            setHealthProfile(healthProfileResponse.data);
            const dietPlan = calculateDietPlan(weight, height, age, gender);
            setData(dietPlan);
          }
        } else {
          setHasHealthProfile(false);
        }
      } catch (error) {
        console.error('Error checking health form status:', error);
        setHasHealthProfile(false);
      } finally {
        setLoading(false);
      }
    };

    checkHealthFormStatus();
  }, []);

  useEffect(() => {
    if (data?.meals) {
      setFlipped(new Array(data.meals.length).fill(false));
    }
  }, [data]);

  function handleFlip(index: number) {
    setFlipped((prev) => {
      const newFlips = [...prev];
      newFlips[index] = !newFlips[index];
      return newFlips;
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!hasHealthProfile) {
    return <NoHealthProfile />;
  }

  if (!data) {
    // Simple placeholder while fetching
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading personalized diet...</p>
      </div>
    );
  }

  const chartData = {
    labels: ['Carbs', 'Protein', 'Fat'],
    datasets: [
      {
        data: [data.carbs, data.protein, data.fat],
        backgroundColor: ['#FBBF24', '#22C55E', '#EF4444'],
        hoverBackgroundColor: ['#F59E0B', '#16A34A', '#DC2626'],
        borderWidth: 0
      }
    ]
  };


  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 14
          },
          generateLabels: function(chart: any) {
            const data = chart.data;
            const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
            
            return data.labels.map((label: string, i: number) => ({
              text: `${label} ${Math.round((data.datasets[0].data[i] / total) * 100)}%`,
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].backgroundColor[i],
              lineWidth: 0,
              hidden: false,
              index: i
            }));
          }
        }
      },
      datalabels: {
        display: false // Disable the datalabels
      }
    },
    cutout: '65%' // Make the doughnut chart a bit thinner
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Your Personalized Diet Plan
        </h1>
        
        {/* User Profile Summary */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg shadow-inner">
          
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-sm text-gray-600">Age</p>
              <p className="text-lg font-medium text-gray-800">{healthProfile?.age} years</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Height</p>
              <p className="text-lg font-medium text-gray-800">{healthProfile?.height} cm</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-lg font-medium text-gray-800">{healthProfile?.weight} kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">BMI</p>
              <p className="text-lg font-medium text-gray-800">{bmi}</p>
            </div>
          </div>
          <p className="mt-4 text-center text-gray-700">
            Your diet plan is tailored based on your BMI of <span className="font-semibold">{bmi}</span>.
          </p>
        </div>

        {/* Daily Calorie Count */}
        <div className="mb-6 text-center">
          <span className="text-5xl font-extrabold text-blue-600">
            {data.calories}
          </span>
          <span className="text-lg text-gray-700"> kcal</span>
        </div>

        {/* Macro Breakdown */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-64 sm:w-72 mb-6">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <p className="text-sm text-gray-500">
            A quick glance at your daily macronutrient split
          </p>
        </div>

        {/* Meals */}
        <div className="space-y-4">
          {data.meals.map((meal, idx) => (
            <ReactCardFlip key={idx} isFlipped={flipped[idx]} flipDirection="horizontal">
              {/* Front of the card */}
              <div
                onClick={() => handleFlip(idx)}
                className="p-4 border rounded-lg bg-white shadow-sm cursor-pointer"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {meal.title}
                </h3>
                <p className="text-gray-500">
                  Click to see ingredients
                </p>
              </div>

              {/* Back of the card */}
              <div
                onClick={() => handleFlip(idx)}
                className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-white shadow-sm cursor-pointer"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {meal.title} - Ingredients
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  {meal.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  Click to flip back
                </p>
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

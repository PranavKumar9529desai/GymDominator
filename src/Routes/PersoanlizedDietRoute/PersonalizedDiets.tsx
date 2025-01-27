// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ChartOptions,
//   Plugin,
// } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { GetHealthProfileData } from './actions/GetHealthProfileData';
// import { GetHealthFormStatus } from './actions/gethealthFormStatus';
// import NoHealthProfile from './NoHealthProfile';
// import { GetPersonalizedDiets } from './actions/GetPersonalizedDiets';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartDataLabels,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// interface Ingredient {
//   name: string;
//   quantity: number;
//   unit: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fats: number;
// }

// interface Meal {
//   name: string;
//   timeOfDay: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fats: number;
//   ingredients: Ingredient[];
// }

// interface DietPlan {
//   id: number;
//   name: string;
//   description?: string;
//   targetCalories: number;
//   proteinRatio: number;
//   carbsRatio: number;
//   fatsRatio: number;
//   meals: Meal[];
//   progress?: {
//     currentWeight: number | null;
//     targetWeight: number | null;
//     compliance: number;
//     startDate: string;
//     lastTrackedDate: string | null;
//   };
// }

// interface HealthProfile {
//   weight: number;
//   height: number;
//   age: number;
//   gender: string;
//   goal : string
// }

// const calculateBMI = (weight: number, height: number): number => {
//   const heightInMeters = height / 100;
//   return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
// };

// // Add interface for chart context
// // @ts-expect-error - chart
// interface ChartDataContext extends ChartContext {
//   chart: {
//     data: {
//       datasets: Array<{
//         data: number[];
//       }>;
//     };
//   };
// }

// export default function PersonalizedDiets() {
//   const [loading, setLoading] = useState(true);
//   const [hasHealthProfile, setHasHealthProfile] = useState(false);
//   const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
//   const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
//   const [, setBmi] = useState<number | null>(null);

//   const getBMICategory = (bmi: number) => {
//     if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
//     if (bmi < 25) return { category: 'Normal', color: 'text-green-500' };
//     if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
//     return { category: 'Obese', color: 'text-red-500' };
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // First check if health profile exists
//         const formStatus = await GetHealthFormStatus();

//         if (!formStatus.healthProfile) {
//           setHasHealthProfile(false);
//           setLoading(false);
//           return;
//         }

//         // If health profile exists, fetch it along with diet plan
//         setHasHealthProfile(true);

//         const [healthProfileResponse, dietPlanResponse] = await Promise.all([
//           GetHealthProfileData(),
//           GetPersonalizedDiets()
//         ]);

//         if (healthProfileResponse.success && healthProfileResponse.data) {
//           setHealthProfile(healthProfileResponse.data);
//           const calculatedBMI = calculateBMI(
//             healthProfileResponse.data.weight,
//             healthProfileResponse.data.height
//           );
//           setBmi(calculatedBMI);
//         }

//         if (dietPlanResponse.success && dietPlanResponse.data) {
//           const { data } = dietPlanResponse;
//           // Ensure all required DietPlan properties are present
//           if ('id' in data && 'name' in data && 'targetCalories' in data) {
//             setDietPlan(data as DietPlan);
//           } else {
//             console.error('Invalid diet plan data structure:', data);
//           }
//         }

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (!hasHealthProfile) {
//     return <NoHealthProfile />;
//   }

//   if (!dietPlan || !healthProfile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Error loading diet plan. Please try again later.</p>
//       </div>
//     );
//   }

//   const renderCalorieBreakdown = (dietPlan: DietPlan) => {
//     // Convert percentage ratios to decimals (40% -> 0.4)
//     const proteinRatio = dietPlan.proteinRatio / 100;
//     const carbsRatio = dietPlan.carbsRatio / 100;
//     const fatsRatio = dietPlan.fatsRatio / 100;

//     // Calculate calories for each macro
//     const totalCalories = dietPlan.targetCalories;
//     const proteinCalories = Math.round(totalCalories * proteinRatio);
//     const carbsCalories = Math.round(totalCalories * carbsRatio);
//     const fatsCalories = Math.round(totalCalories * fatsRatio);

//     // Calculate grams based on calories
//     const proteinGrams = Math.round(proteinCalories / 4);
//     const carbsGrams = Math.round(carbsCalories / 4);
//     const fatsGrams = Math.round(fatsCalories / 9);

//     const data = {
//       labels: ['Protein', 'Carbs', 'Fats'],
//       datasets: [{
//         data: [proteinRatio * 100, carbsRatio * 100, fatsRatio * 100], // Show as percentages
//         backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
//       }]
//     };

//     const options: ChartOptions<'pie'> = {
//       plugins: {
//         legend: {
//           position: 'bottom' as const,
//         },
//         datalabels: {
//           formatter: (value: number) => {
//             return `${Math.round(value)}%`;
//           },
//           color: '#fff',
//           font: {
//             weight: 'bold',
//             size: 14
//           }
//         }
//       },
//       maintainAspectRatio: false,
//       responsive: true
//     };

//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Daily Calorie Breakdown
//         </h3>
//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           <div className="h-64">
//             <Pie data={data} options={options} />
//           </div>
//           <div className="flex flex-col justify-center">
//             <div className="text-center mb-4">
//               <p className="text-4xl font-bold text-indigo-600">
//                 {dietPlan.targetCalories}
//               </p>
//               <p className="text-gray-600">Total Daily Calories</p>
//             </div>
//             <div className="grid grid-cols-3 gap-4">
//               <MacroCard
//                 title="Protein"
//                 grams={proteinGrams}
//                 calories={proteinCalories}
//                 percentage={Math.round(proteinRatio * 100)}
//                 color="indigo"
//               />
//               <MacroCard
//                 title="Carbs"
//                 grams={carbsGrams}
//                 calories={carbsCalories}
//                 percentage={Math.round(carbsRatio * 100)}
//                 color="green"
//               />
//               <MacroCard
//                 title="Fats"
//                 grams={fatsGrams}
//                 calories={fatsCalories}
//                 percentage={Math.round(fatsRatio * 100)}
//                 color="yellow"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const MacroCard = ({
//     title,
//     grams,
//     calories,
//     percentage,
//     color
//   }: {
//     title: string;
//     grams: number;
//     calories: number;
//     percentage: number;
//     color: 'indigo' | 'green' | 'yellow';
//   }) => (
//     <div className={`bg-${color}-50 p-3 rounded-lg text-center`}>
//       <p className="text-sm text-gray-600">{title}</p>
//       <p className={`text-xl font-bold text-${color}-600`}>
//         {grams}g
//       </p>
//       <p className="text-sm text-gray-500">
//         {calories} cal
//       </p>
//       <p className="text-xs text-gray-400">
//         {percentage}%
//       </p>
//     </div>
//   );

//   const renderMealSchedule = (meals: Meal[]) => (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">Daily Meal Schedule</h3>
//       <div className="space-y-4">
//         {meals.map((meal, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             className="bg-gray-50 rounded-lg p-4"
//           >
//             <div className="flex justify-between items-start mb-2">
//               <div>
//                 <h4 className="font-semibold text-lg text-gray-800">{meal.name}</h4>
//                 <p className="text-sm text-gray-600">{meal.timeOfDay}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-bold text-indigo-600">{meal.calories} cal</p>
//                 <p className="text-sm text-gray-500">
//                   P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
//                 </p>
//               </div>
//             </div>
//             {meal.ingredients && meal.ingredients.length > 0 && (
//               <div className="mt-3 border-t border-gray-200 pt-3">
//                 <p className="text-sm font-medium text-gray-700 mb-2">Ingredients:</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {meal.ingredients.map((ingredient, i) => (
//                     <div key={i} className="text-sm text-gray-600 flex justify-between">
//                       <span>{ingredient.name}</span>
//                       <span>{ingredient.quantity}{ingredient.unit}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto space-y-6"
//       >
//         {/* Profile Stats Card */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 w-full text-center">Your Diet Plan</h2>
//           <div className="text-center mb-6">
//             <p className="text-3xl font-bold text-indigo-600">
//               {dietPlan?.targetCalories} calories
//             </p>
//             <p className="text-gray-600">Daily Target</p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-indigo-50 rounded-lg">
//               <p className="text-sm text-gray-600">Weight</p>
//               <p className="text-xl font-bold text-indigo-600">{healthProfile?.weight} kg</p>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <p className="text-sm text-gray-600">Height</p>
//               <p className="text-xl font-bold text-green-600">{healthProfile?.height} cm</p>
//             </div>
//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <p className="text-sm text-gray-600">BMI</p>
//               <p className={`text-xl font-bold ${getBMICategory(calculateBMI(healthProfile?.weight || 0, healthProfile?.height || 0)).color}`}>
//                 {calculateBMI(healthProfile?.weight || 0, healthProfile?.height || 0)}
//               </p>
//             </div>
//             <div className="text-center p-4 bg-purple-50 rounded-lg">
//               <p className="text-sm text-gray-600">Goal</p>
//               <p className="text-xl font-bold text-purple-600">
//                 {healthProfile?.goal || 'Maintain'}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Calorie Breakdown Chart */}
//         {dietPlan && renderCalorieBreakdown(dietPlan)}

//         {/* Meal Schedule */}
//         {dietPlan?.meals && renderMealSchedule(dietPlan.meals)}
//       </motion.div>
//     </div>
//   );
// }

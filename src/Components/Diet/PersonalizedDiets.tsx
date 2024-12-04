import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/ui/avatar";
import { Badge } from "@components/ui/ui/badge";
import { Progress } from "@components/ui/ui/progress";
import {
  Apple,
  Carrot,
  Egg,
  Fish,
  Utensils,
  Coffee,
  Droplet,
  Scale,
  Flame,
  Award,
} from "lucide-react";

export default function PersonalizedDiet() {
  const trainerName = "Emily Rodriguez";
  const dietitianName = "Dr. Michael Chen";
  const trainerAvatar = "https://i.pravatar.cc/150?img=47";
  const dietitianAvatar = "https://i.pravatar.cc/150?img=68";
  const dietPlan = [
    {
      meal: "Breakfast",
      foods: [
        {
          name: "Oatmeal with berries",
          calories: 300,
          protein: 10,
          carbs: 45,
          fat: 7,
        },
        { name: "Greek yogurt", calories: 150, protein: 15, carbs: 8, fat: 5 },
        { name: "Almonds", calories: 100, protein: 4, carbs: 3, fat: 9 },
      ],
    },
    {
      meal: "Lunch",
      foods: [
        {
          name: "Grilled chicken breast",
          calories: 250,
          protein: 30,
          carbs: 0,
          fat: 8,
        },
        { name: "Quinoa salad", calories: 200, protein: 6, carbs: 35, fat: 4 },
        {
          name: "Steamed vegetables",
          calories: 100,
          protein: 4,
          carbs: 20,
          fat: 1,
        },
      ],
    },
    {
      meal: "Dinner",
      foods: [
        { name: "Baked salmon", calories: 300, protein: 25, carbs: 0, fat: 15 },
        { name: "Sweet potato", calories: 150, protein: 2, carbs: 30, fat: 0 },
        {
          name: "Mixed green salad",
          calories: 50,
          protein: 2,
          carbs: 8,
          fat: 1,
        },
      ],
    },
    {
      meal: "Snacks",
      foods: [
        {
          name: "Apple with peanut butter",
          calories: 200,
          protein: 6,
          carbs: 25,
          fat: 8,
        },
        { name: "Protein shake", calories: 150, protein: 20, carbs: 5, fat: 2 },
      ],
    },
  ];
  const waterIntake = 2.5; // liters
  const calorieGoal = 2200;
  const progress = 75;

  const getMealIcon = (meal: string) => {
    switch (meal.toLowerCase()) {
      case "breakfast":
        return <Coffee className="h-6 w-6 text-yellow-500" />;
      case "lunch":
        return <Utensils className="h-6 w-6 text-green-500" />;
      case "dinner":
        return <Utensils className="h-6 w-6 text-blue-500" />;
      default:
        return <Apple className="h-6 w-6 text-red-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 ">
      <Card className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Your Personalized Diet Plan
          </CardTitle>
          <CardDescription className="text-green-100">
            Crafted with expertise by our trainers and dietitians
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={trainerAvatar} alt={trainerName} />
              <AvatarFallback>
                {trainerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={dietitianAvatar} alt={dietitianName} />
              <AvatarFallback>
                {dietitianName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Plan created by</p>
              <p className="text-lg font-bold">
                {trainerName} & {dietitianName}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {dietPlan.map((meal, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    {getMealIcon(meal.meal)}
                    <span className="ml-2">{meal.meal}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {meal.foods.map((food, foodIndex) => (
                      <li
                        key={foodIndex}
                        className="flex justify-between items-center"
                      >
                        <span className="flex items-center">
                          {food.name.toLowerCase().includes("chicken") ||
                          food.name.toLowerCase().includes("fish") ? (
                            <Fish className="mr-2 h-4 w-4" />
                          ) : food.name.toLowerCase().includes("egg") ? (
                            <Egg className="mr-2 h-4 w-4" />
                          ) : (
                            <Carrot className="mr-2 h-4 w-4" />
                          )}
                          {food.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-green-700 text-white"
                        >
                          {food.calories} cal
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Droplet className="mr-2 h-5 w-5 text-blue-500" />
              Daily Water Intake
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{waterIntake} liters</p>
            <p className="text-sm text-gray-600">
              Stay hydrated for optimal performance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Flame className="mr-2 h-5 w-5 text-orange-500" />
              Calorie Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{calorieGoal} cal</p>
            <p className="text-sm text-gray-600">
              Balanced for your fitness goals
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Scale className="mr-2 h-6 w-6 text-purple-500" />
            Nutritional Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm">
                <span>Protein</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Carbs</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Fats</span>
                <span>25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Award className="mr-2 h-6 w-6 text-yellow-500" />
            Diet Adherence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">
            {progress}% adherence to your personalized diet plan
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

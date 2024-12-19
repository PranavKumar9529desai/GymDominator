import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { Progress } from "@components/ui/progress";
import { Dumbbell, Calendar, Clock, Trophy, User } from "lucide-react";

export default function PersonalizedWorkouts() {
  const trainerName = "Sarah Johnson";
  const trainerAvatar = "https://i.pravatar.cc/150?img=47";
  const workoutPlan = [
    {
      day: "Monday",
      exercises: [
        { name: "Bench Press", sets: 3, reps: 10 },
        { name: "Squats", sets: 4, reps: 12 },
        { name: "Pull-ups", sets: 3, reps: 8 },
      ],
    },
    {
      day: "Wednesday",
      exercises: [
        { name: "Deadlifts", sets: 3, reps: 8 },
        { name: "Shoulder Press", sets: 3, reps: 10 },
        { name: "Leg Press", sets: 3, reps: 12 },
      ],
    },
    {
      day: "Friday",
      exercises: [
        { name: "Barbell Rows", sets: 3, reps: 10 },
        { name: "Lunges", sets: 3, reps: 12 },
        { name: "Tricep Dips", sets: 3, reps: 15 },
      ],
    },
  ];
  const progress = 65;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600  text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Your Personalized Workout Plan
          </CardTitle>
          <CardDescription className="text-purple-100">
            Designed to help you achieve your fitness goals
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
            <div>
              <p className="text-sm font-medium">Your Personal Trainer</p>
              <p className="text-xl font-bold">{trainerName}</p>
            </div>
          </div>
          <div className="space-y-4">
            {workoutPlan.map((day, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    {day.day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {day.exercises.map((exercise, exIndex) => (
                      <li
                        key={exIndex}
                        className="flex justify-between items-center"
                      >
                        <span className="flex items-center">
                          <Dumbbell className="mr-2 h-4 w-4" />
                          {exercise.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-purple-700 text-white"
                        >
                          {exercise.sets} x {exercise.reps}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">
            {progress}% of your goals achieved
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-500" />
              Workout Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">45-60 min</p>
            <p className="text-sm text-gray-600">Recommended per session</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <User className="mr-2 h-5 w-5 text-green-500" />
              Fitness Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Intermediate</p>
            <p className="text-sm text-gray-600">
              Tailored to your current level
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Activity, Utensils, Dumbbell, UserCheck, TrendingUp, Scan, DumbbellIcon } from "lucide-react";
import { WorkoutRoute } from "@routes/workoutRoute";
import PersonalizedDietRoute from "@routes/PersoanlizedDietRoute/PersonalizedDietRoute";
import PersonalizedWorkoutRoute from "@routes/Personalized Workouts/PersonalizedWorkoutRoute";
import { MonthProgressRoute } from "@routes/MonthProgressRoute/MonthProgressRoute";
import { QrScannerRoute } from "@routes/QrScannerRoute/QrScannerRoute";
import { TodaysAttendanceStatusRoute } from "@routes/AttendanceStatusRoute";

export interface RouteConfig {
  name: string;
  path: string;
  icon: any;
  component?: React.ComponentType<any>;
  subRoutes?: Omit<RouteConfig, 'subRoutes'>[];
}

export const dashboardRoutes: RouteConfig[] = [
  {
    name: "Progress",
    path: "/dashboard",
    icon: Activity,
    subRoutes: [
      {
        name: "Monthly Progress",
        path: "/dashboard/myprogress/month",
        icon: TrendingUp,
        component: MonthProgressRoute
      },
    ],
  },
  {
    name: "Workout",
    path: "/dashboard/workouts",
    icon: Dumbbell,
    component: WorkoutRoute,
    subRoutes: [
      {
        name: "View Workouts",
        path: "/dashboard/workout/viewworkouts",
        icon: DumbbellIcon,
        component: WorkoutRoute
      },
      {
        name: "Personalized Workout",
        path: "/dashboard/workouts/personalizedworkout",
        icon: DumbbellIcon,
        component: PersonalizedWorkoutRoute
      },
    ],
  },
  {
    name: "Diet",
    path: "/dashboard/diet",
    icon: Utensils,
    subRoutes: [
      {
        name: "Personalized Diets",
        path: "/dashboard/diet/personalizeddiet",
        icon: Utensils,
        component: PersonalizedDietRoute
      },
    ],
  },
  {
    name: "Attendance",
    path: "/dashboard/attendance",
    icon: UserCheck,
    subRoutes: [
      {
        name: "Attendance QR Scanner",
        path: "/dashboard/attendance/qrscanner",
        icon: Scan,
        component: QrScannerRoute
      },
      {
        name: "Today's Attendance",
        path: "/dashboard/attendance/todaysattendance",
        icon: UserCheck,
        component: TodaysAttendanceStatusRoute
      },
    ],
  },
];

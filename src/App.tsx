import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OnboardingRoute } from "@routes/OnboardingRoute";
import "./App.css";
import { MonthProgressRoute } from "@routes/MonthProgressRoute/MonthProgressRoute";
import { Home } from "@routes/homeRoute";
import { RecoilRoot } from "recoil";
import { SignIn } from "@routes/signinRoute";
import { SignUp } from "@routes/signupRoute";
import { SingleWorkoutRoute } from "@routes/singleworkoutRoute";
import { SingleMusclesRoute } from "@routes/singlemuscleRoutes";
import { MyProgressRoute } from "@routes/myprogressRoute";
import { WorkoutRoute } from "@routes/workoutRoute";
import { RecicpesRoute } from "@routes/RecipesRoute";
import { TodaysPlanRoute } from "@routes/todaysplanRoute";
import { ChooseAccountibilityPartnerRoute } from "@routes/ChooseAccountibilityPartnerRoute";
import { HealthProfileFormRoute } from "@routes/UserHealthProfile/HealthprofileformRoute";
import { WorkoutplaceRoute } from "@routes/workoutplaceRoute";
import { ChooseGymRoute } from "@routes/ChooseGymRoute";
import { ChallengeRoute } from "@routes/ChallengeRoute";
import { QrScannerRoute } from "@routes/QrScannerRoute/QrScannerRoute";
import { TodaysAttendanceStatusRoute } from "@routes/AttendanceStatusRoute";
import PersonalizedWorkoutRoute from "@routes/Personalized Workouts/PersonalizedWorkoutRoute";
import PersonalizedDietRoute from "@routes/PersoanlizedDietRoute/PersonalizedDietRoute";
import BeforeGymEnrollment from "@components/GymEnrollment/BeforeGymEnrollment";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Welcome from "./Components/Welcome/welcome";
import { GeneralQrScannerRoute } from "@routes/GeneralQrScannerRoute";
import AboutPersonalTrainer from "@routes/About Personal Trainer/AboutPersonalTrainer";
import AttendanceSuccess from "@components/Qrcode/AttendanceSuccess";
import AttendanceFailure from "@components/Qrcode/AttendanceFailure";
import DashboardLayout from "./Layouts/DashboardLayout";
import { Toaster } from "sonner";
import GroceryListRoute from "./Routes/GroceryList/GroceryListRoute";
import { ErrorBoundary } from "@components/ErrorBoundary/ErrorBoundary";
import AboutUs from "./Components/Home/pages/AboutUs";
import Pricing from "./Components/Home/pages/Pricing";
import ContactUs from "./Components/Home/pages/ContactUs";
import Features from "./Components/Home/pages/Features";
import HomeLayout from "./Layouts/HomeLayout";

function Main() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Home routes - With Navbar */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/features" element={<Features />} />
        </Route>

        {/* Auth routes - No navbar */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />

        {/* Dashboard routes - No navbar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<WorkoutRoute />} />
          <Route path="workout/viewworkouts" element={<WorkoutRoute />} />
          <Route path="workouts/:muscle" element={<SingleMusclesRoute />} />
          <Route
            path="workouts/:muscle/:workoutname"
            element={<SingleWorkoutRoute />}
          />
          <Route
            path="diet/personalizeddiet"
            element={<PersonalizedDietRoute />}
          />
          <Route
            path="workouts/personalizedworkout"
            element={<PersonalizedWorkoutRoute />}
          />
          <Route path="recipes" element={<RecicpesRoute />} />
          <Route path="diet/grocerylist" element={<GroceryListRoute />} />
          <Route path="myprogress" element={<MyProgressRoute />} />
          <Route path="myprogress/week" element={<MyProgressRoute />} />
          <Route path="myprogress/month" element={<MonthProgressRoute />} />
          <Route path="today'splan" element={<TodaysPlanRoute />} />
          <Route path="challenges" element={<ChallengeRoute />} />
          <Route path="attendance/qrscanner" element={<QrScannerRoute />} />
          <Route
            path="attendance/todaysattendance"
            element={<TodaysAttendanceStatusRoute />}
          />
          <Route path="attendance/success" element={<AttendanceSuccess />} />
          <Route path="attendance/failure" element={<AttendanceFailure />} />
        </Route>

        {/* Other routes - No navbar */}
        <Route path="/onboarding">
          <Route index element={<OnboardingRoute />} />
          <Route path="beforegymenrollment" element={<BeforeGymEnrollment />} />
          <Route
            path="chooseacpartner"
            element={<ChooseAccountibilityPartnerRoute />}
          />
          <Route path="healthprofile">
            <Route index element={<HealthProfileFormRoute />} />
            <Route path="workoutplace">
              <Route index element={<WorkoutplaceRoute />} />
              <Route path="choosegym" element={<ChooseGymRoute />} />
            </Route>
          </Route>
        </Route>

        <Route path="/qr-scanner" element={<GeneralQrScannerRoute />} />
        <Route path="/trainer" element={<AboutPersonalTrainer />} />

        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Toaster richColors position="top-right" />
          <ErrorBoundary>
            <Main />
          </ErrorBoundary>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}
// empty
export default App;

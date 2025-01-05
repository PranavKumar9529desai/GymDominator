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
import { DietRoute } from "@routes/dietRoute";
import { RecicpesRoute } from "@routes/RecipesRoute";
import { TodaysPlanRoute } from "@routes/todaysplanRoute";
import { ChooseAccountibilityPartnerRoute } from "@routes/ChooseAccountibilityPartnerRoute";
import { HealthProfileFormRoute } from "@routes/HealthprofileformRoute";
import { WorkoutplaceRoute } from "@routes/workoutplaceRoute";
import { ChooseGymRoute } from "@routes/ChooseGymRoute";
import { ChallengeRoute } from "@routes/ChallengeRoute";
import { QrScannerRoute } from "@routes/QrScannerRoute/QrScannerRoute";
import { TodaysAttendanceStatusRoute } from "@routes/AttendanceStatusRoute";
import PersonalizedWorkoutRoute from "@routes/PersonalizedWorkoutRoute";
import PersonalizedDietRoute from "@routes/PersonalizedDietRoute";
// import { OnboardingLayout } from "@layout/OnboardingLayout";
import BeforeGymEnrollment from "@components/GymEnrollment/BeforeGymEnrollment";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Welcome from "./Components/Welcome/welcome";
import { GeneralQrScannerRoute } from "@routes/GeneralQrScannerRoute";
import AboutPersonalTrainer from "@routes/About Personal Trainer/AboutPersonalTrainer";
import AttendanceSuccess from "@components/Qrcode/AttendanceSuccess";
import AttendanceFailure from "@components/Qrcode/AttendanceFailure";

function Main() {
  return (
    <Routes>
      {/* Public routes - No navbar */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Dashboard routes - No navbar */}
      <Route path="/dashboard">
        <Route index element={<WorkoutRoute />} />
        <Route path="workout/viewworkouts" element={<WorkoutRoute />} />
        <Route path="workouts/:muscle" element={<SingleMusclesRoute />} />
        <Route
          path="workouts/:muscle/:workoutname"
          element={<SingleWorkoutRoute />}
        />
        <Route path="diet/alldiets" element={<DietRoute />} />
        <Route
          path="diet/personalizeddiet"
          element={<PersonalizedDietRoute />}
        />
        <Route
          path="workouts/personalizedworkout"
          element={<PersonalizedWorkoutRoute />}
        />
        <Route path="recipes" element={<RecicpesRoute />} />
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

      {/* Other routes - With MainLayout navbar */}
      {/* <Route element={<OnboardingLayout />}> */}
      <Route>
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
      </Route>

      {/* QR Scanner route */}
      <Route path="/qr-scanner" element={<GeneralQrScannerRoute />} />

      {/* About Personal Trainer route */}
      <Route path="/trainer" element={<AboutPersonalTrainer />} />

      {/* Fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="347915935220-9kirggi81g89botl2vk8claori5jqb2f.apps.googleusercontent.com">
          <Main />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OnboardingRoute } from "@routes/OnboardingRoute";
import "./App.css";
import { MonthProgressRoute } from "@routes/MonthProgressRoute";
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
import { QrScannerRoute } from "@routes/QrScannerRoute";
import { AttendanceStatus } from "@routes/AttendanceStatusRoute";
function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<WorkoutRoute />} />
      <Route path="/dashboard/workouts" element={<WorkoutRoute />} />
      <Route
        path="/dashboard/workouts/:muscle"
        element={<SingleMusclesRoute />}
      />
      <Route
        path="/dashboard/workouts/:muscle/:workoutname"
        element={<SingleWorkoutRoute />}
      />
      <Route path="/dashboard/diet" element={<DietRoute />} />
      <Route path="/dashboard/recipes" element={<RecicpesRoute />} />
      <Route path="/dashboard/myprogress" element={<MyProgressRoute />} />
      <Route path="/dashboard/myprogress/week" element={<MyProgressRoute />} />
      <Route
        path="/dashboard/myprogress/month"
        element={<MonthProgressRoute />}
      />
      <Route path="/dashboard/today'splan" element={<TodaysPlanRoute />} />
      <Route path="/onboarding" element={<OnboardingRoute />} />
      <Route
        path="/onboarding/chooseacpartner"
        element={<ChooseAccountibilityPartnerRoute />}
      />
      <Route
        path="/onboarding/healthprofile"
        element={<HealthProfileFormRoute />}
      />
      <Route
        path="/onboarding/healthprofile/workoutplace"
        element={<WorkoutplaceRoute />}
      />
      <Route
        path="/onboarding/healthprofile/workoutplace/choosegym"
        element={<ChooseGymRoute />}
      />
      <Route path="/dashboard/challenges" element={<ChallengeRoute />} />
      <Route path="/qrscanner" element={<QrScannerRoute />} />
      <Route path="/attendancestatus" element={<AttendanceStatus />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;

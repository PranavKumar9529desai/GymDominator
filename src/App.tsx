import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import BeforeGymEnrollment from '@components/GymEnrollment/BeforeGymEnrollment';
import { InstallPrompt } from '@components/PWA/InstallPrompt';
import { UpdatePrompt } from '@components/PWA/UpdatePrompt';
import AttendanceFailure from '@components/Qrcode/AttendanceFailure';
import AttendanceSuccess from '@components/Qrcode/AttendanceSuccess';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { TodaysAttendanceStatusRoute } from '@routes/AttendanceStatusRoute';
import { GeneralQrScannerRoute } from '@routes/GeneralQrScannerRoute';
import { QrScannerRoute } from '@routes/QrScannerRoute/QrScannerRoute';
import { HealthProfileFormRoute } from '@routes/UserHealthProfile/HealthprofileformRoute';
import { Home } from '@routes/homeRoute';
import { MyProgressRoute } from '@routes/myprogressRoute';
import { SignIn } from '@routes/signinRoute';
import { SignUp } from '@routes/signupRoute';
import { SingleMusclesRoute } from '@routes/singlemuscleRoutes';
import { SingleWorkoutRoute } from '@routes/singleworkoutRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'sonner';
import AboutUs from './Components/Home/pages/AboutUs';
import ContactUs from './Components/Home/pages/ContactUs';
import Features from './Components/Home/pages/Features';
import Pricing from './Components/Home/pages/Pricing';
import Welcome from './Components/Welcome/welcome';
import DashboardLayout from './Layouts/DashboardLayout';
import HomeLayout from './Layouts/HomeLayout';
import AboutTrainerRoute from './Routes/Navbar/About Triainer/AboutTrainerRoute';
import HealthProfile from './Routes/Navbar/Healthprofile/Healthprofile';
import GymInfo from './Routes/Navbar/My Gym/GymInfo';
import { Wallet } from './Routes/Wallet/Wallet';
import { queryClient } from './util/lib/react-query';

// Lazy load route components
const OnboardingRoute = lazy(() => import('@routes/OnboardingRoute'));
const MonthProgressRoute = lazy(() => import('@routes/MonthProgressRoute/MonthProgressRoute'));
const WorkoutRoute = lazy(() => import('@routes/workoutRoute'));

// Keep the lazy loaded versions
const PersonalizedWorkoutRoute = lazy(
  () => import('@routes/Personalized Workouts/PersonalizedWorkoutRoute')
);
const PersonalizedDietRoute = lazy(
  () => import('@routes/PersoanlizedDietRoute/PersonalizedDietRoute')
);
const GroceryListRoute = lazy(() => import('./Routes/GroceryList/GroceryListRoute'));

function Main() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
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

          {/* Dashboard routes - With navbar */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<WorkoutRoute />} />
            <Route path="workouts/viewworkouts" element={<WorkoutRoute />} />
            <Route path="workouts/:muscle" element={<SingleMusclesRoute />} />
            <Route path="workouts/:muscle/:workoutname" element={<SingleWorkoutRoute />} />
            <Route path="diet/personalizeddiet" element={<PersonalizedDietRoute />} />
            <Route path="workouts/personalizedworkout" element={<PersonalizedWorkoutRoute />} />
            <Route path="diet/grocerylist" element={<GroceryListRoute />} />
            <Route path="myprogress" element={<MyProgressRoute />} />
            <Route path="myprogress/week" element={<MyProgressRoute />} />
            <Route
              path="myprogress/month"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ErrorBoundary>
                    <MonthProgressRoute />
                  </ErrorBoundary>
                </Suspense>
              }
            />
            <Route path="attendance/qrscanner" element={<QrScannerRoute />} />
            <Route path="attendance/todaysattendance" element={<TodaysAttendanceStatusRoute />} />
            <Route path="attendance/success" element={<AttendanceSuccess />} />
            <Route path="attendance/failure" element={<AttendanceFailure />} />

            {/* Added these routes under dashboard */}
            <Route path="gym" element={<GymInfo />} />
            <Route path="trainer" element={<AboutTrainerRoute />} />
            <Route path="health-profile" element={<HealthProfile />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>

          {/* Other routes - No navbar */}
          <Route path="/onboarding">
            <Route index element={<OnboardingRoute />} />
            <Route path="beforegymenrollment" element={<BeforeGymEnrollment />} />

            <Route path="healthprofile">
              <Route index element={<HealthProfileFormRoute />} />
            </Route>
          </Route>

          <Route path="/qr-scanner" element={<GeneralQrScannerRoute />} />

          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Toaster richColors position="top-right" />
            <ErrorBoundary>
              <UpdatePrompt />
              <Main />

              <InstallPrompt />
            </ErrorBoundary>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
export default App;

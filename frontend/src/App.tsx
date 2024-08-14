import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "@routes/dashboard ";
import { Home } from "@routes/homeRoute";
import { RecoilRoot } from "recoil";
import { SignIn } from "@routes/signinRoute";
import { SignUp } from "@routes/signupRoute";
import { Allworkouts } from "@components/Workout/allworkouts";
import { Diet } from "@components/Diet/diet";
import { Recipes } from "@components/Recicpes/recipes";
import { SingleWorkoutRoute } from "@routes/singleworkoutRoute";
import { SingleMusclesRoute } from "@routes/singlemuscleRoutes";
import { MyProgressRoute } from "@routes/myprogressRoute";
import { WorkoutRoute } from "@routes/workoutRoute";
import { DietRoute } from "@routes/dietRoute";
import { RecicpesRoute } from "@routes/RecipesRoute";
function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
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

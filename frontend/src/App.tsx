import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "@routes/dashboard ";
import { Home } from "@routes/home";
import { RecoilRoot } from "recoil";
import { SignIn } from "@routes/signin";
import { SignUp } from "@routes/signup";
import { Allworkouts } from "@components/Workout/allworkouts";
import { Diet } from "@components/Diet/diet";
import { Recipes } from "@components/Recicpes/recipes";
import { SingleWorkoutRoute } from "@routes/singleworkoutRoute";
import { SingleMusclesRoute } from "@routes/singlemuscleRoutes";
import { MyProgressRoute } from "@routes/myprogressRoute";
function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/workouts" element={<Allworkouts />} />
      <Route
        path="/dashboard/workouts/:muscle"
        element={<SingleMusclesRoute />}
      />
      <Route
        path="/dashboard/workouts/:muscle/:workoutname"
        element={<SingleWorkoutRoute />}
      />
      <Route path="/dashboard/diet" element={<Diet />} />
      <Route path="/dashboard/recipes" element={<Recipes />} />
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

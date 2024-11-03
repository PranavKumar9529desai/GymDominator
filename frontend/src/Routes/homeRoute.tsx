import { LadingPage } from "@components/Home/LandingPage";
import { Navbar } from "@components/Navbar/Navbar";

export const Home = () => {
  return (
    <div>
      <div className="w-dvh">
        <Navbar TextColor="white" />
      </div>
      <div>
        <LadingPage />
      </div>
    </div>
  );
};

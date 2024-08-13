import { useNavigate } from "react-router-dom";
import "./main.css";

export const LadingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <section className="container header-section ">
          <div className="header-logo">
            {/* <img className="" src="src/assets/Gym-logo.jpg" alt="" /> */}
          </div>
          <div className="header-title animate-pop-in font-overpass ">
            <p>
              Gymdominator Will Ensure Your{" "}
              <span className="line-break bg-gradient-to-r from-[hsl(193,95%,68%)] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Consistency.
              </span>
            </p>
          </div>
          <div className="header-subtitle animate-pop-in">
            <div className="icon-container my-1 mr-2">
              <img
                src="/src/assets/green-tick-icon.png"
                alt=""
                width={20}
                height={18}
              />
            </div>
            <p>start now and get 50% discount</p>
          </div>
          <div className="button-container w-full flex justify-center items-end h-full">
            <div className="header-button animate-pop-in w-fit bg-blue-600 px-5 py-3 rounded-lg text-white font-bold hover:bg-blue-800 transition-colors ">
              <button
                onClick={() => {
                  if (localStorage.getItem("jwt") === null) {
                    navigate("/signin");
                  } else {
                    navigate("/dashboard/myprogress");
                  }
                }}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="header-down-arrow">
            <img src="/src/assets/downarrow.png" alt="down-arrow" width={40} />
          </div>
        </section>
      </header>
      <section className="testimonials bg-white h-screen w-full"></section>
    </div>
  );
};

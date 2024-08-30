import { coustomWarningMsg } from "@components/customAlerts";
import axios from "axios";
import { StarIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import Gym1 from "@assets/gym1.webp";
import Gym2 from "@assets/gym2.webp";
import Gym3 from "@assets/gym3.webp";
import Gym4 from "@assets/gym4.webp";

// import Gym5 from "@assests/gym1.png";

export const ChooseGym = () => {
  interface gym {
    name: string;
    image: string;
    rating: number;
    location: string;
  }

  const gyms: gym[] = [
    {
      name: "Golds Gym ",
      image: Gym1,
      rating: 4.8,
      location: "Aundh",
    },
    {
      name: "PowerPulse Gym",
      image: Gym2,
      rating: 4.6,
      location: "Westside, Near pimpari",
    },
    {
      name: "FlexFit Studio",
      image: Gym3,
      rating: 4.9,
      location: "Northside, vimanagar",
    },
    {
      name: "IronCore Fitness",
      image: Gym4,
      rating: 4.7,
      location: "Eastside, kothrud",
    },
    {
      name: "Gymdomniator",
      image: Gym1,
      rating: 4.7,
      location: "Eastside, near hadpasar",
    },
    {
      name: "Gymdomniator",
      image: Gym2,
      rating: 4.7,
      location: "Eastside, near hadpasar",
    },
  ];

  return (
    <div className="pb-40">
      <div className=" lg:text-5xl lg:ml-40  font-semibold font-poppins lg:text-left text-4xl text-center ">
        Select your preferred 🏋🏽
      </div>
      <div className="">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 mt-10 px-4 ">
          {gyms.map((gym, index) => {
            return (
              <Gymcard
                index={index}
                name={gym.name}
                img={gym.image}
                rating={gym.rating}
                location={gym.location}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Gymcard = ({
  index,
  name,
  img,
  rating,
  location,
}: {
  index: number;
  name: string;
  img: string;
  rating: number;
  location: string;
}) => {
  const [gymname, setgymname] = useState<string>("");
  const navigate = useNavigate();
  async function senddata() {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/workoutplace`,
      {
        workoutplace: "IN Gym",
        gymname: name,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
  }
  const handleSelect = (gymname: string) => {
    setgymname(gymname);
    senddata();
    coustomWarningMsg(navigate);
  };

  console.log(gymname);
  return (
    <div
      key={index}
      className="w-full sm:w-1/2 md:w-1/4 bg-white rounded-lg shadow-md overflow-hidden   hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-500"
    >
      <img src={img} alt={name} className="w-full lg:h-80 h-36 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-left">{name}</h2>
        <div className="flex items-center mb-2">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <MapPinIcon className="h-5 w-5 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <button
          onClick={() => handleSelect(name)}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md"
        >
          Select
        </button>
      </div>
    </div>
  );
};

import { StarIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import { useState } from "react";
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
      image:
        "https://lh5.googleusercontent.com/p/AF1QipMgBCv-KY7-I2BGBGc8kkbLL5CgPOwOCGAWtPVt=w296-h168-n-k-no",
      rating: 4.8,
      location: "Aundh",
    },
    {
      name: "PowerPulse Gym",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipOQSWZpSyrxX04ncc5r3qgPuypJCP_BiNeBzjA=w231-h193-n-k-no-nu",
      rating: 4.6,
      location: "Westside, Near pimpari",
    },
    {
      name: "FlexFit Studio",
      image:
        "https://content.jdmagicbox.com/comp/jalgaon/v2/9999px257.x257.140708140514.u3v2/catalogue/talwalkars-sp-fitness-jilha-peth-jalgaon-gyms-hzjrd7kmap.jpg",
      rating: 4.9,
      location: "Northside, vimanagar",
    },
    {
      name: "IronCore Fitness",
      image:
        "https://d1vhqlrjc8h82r.cloudfront.net/04-23-2021/t_0becfae4316147c0abb74a0c6867c9fd_name_image.jpg",
      rating: 4.7,
      location: "Eastside, kothrud",
    },
    {
      name: "Gymdomniator",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipMTc0DHtDuz8nRHaOcNpYgBKrmJeb4MYcoCgBZl=w296-h168-n-k-no",
      rating: 4.7,
      location: "Eastside, near hadpasar",
    },
  ];

  return (
    <div className="pb-40">
      <div className="lg:text-5xl font-semibold font-roboto text-center text-2xl ">
        Please select your preferred gym from the options below.
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

  const handleSelect = (gymname: string) => {
    setgymname(gymname);
  };

  console.log(gymname);
  return (
    <button
      key={index}
      className="w-full sm:w-1/2 md:w-1/4 bg-white rounded-lg shadow-md overflow-hidden   hover:-translate-y-2 hover:scale-105 hover:shadow-xl transition-all duration-500"
    >
      <img src={img} alt={name} className="w-full h-48 object-cover" />
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
          className="w-full bg-black text-white py-2 mt-4 rounded-md"
        >
          Select
        </button>
      </div>
    </button>
  );
};

import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiCloudLine,
  RiFlashlightLine,
  RiHeavyShowersLine,
  RiSunLine,
} from "@remixicon/react";
import { Container } from "../../components/ui";
import { useState, type ReactNode } from "react";

type Card = {
  id: number;
  icon: ReactNode;
  mood: "great" | "okay" | "tired" | "stressed";
};

const moodCards: Card[] = [
  {
    id: 1,
    icon: <RiSunLine size={"100%"} />,
    mood: "great",
  },
  {
    id: 2,
    icon: <RiCloudLine size={"100%"} />,
    mood: "okay",
  },
  {
    id: 3,
    icon: <RiHeavyShowersLine size={"100%"} />,
    mood: "tired",
  },
  {
    id: 4,
    icon: <RiFlashlightLine size={"100%"} />,
    mood: "stressed",
  },
];

const DailyPlanner = () => {
  const [currentMood, setCurrentMood] = useState<Card["mood"]>("okay");

  return (
    <div className="flex flex-1 bg-gray-950">
      <Container className="flex">
        <div className="grid flex-1 grid-cols-3 py-6">
          <div className="flex flex-col justify-between col-span-1 pr-6">
            <div className="flex items-center gap-4">
              <div className="w-12 overflow-hidden rounded-full aspect-square">
                <img
                  src="https://i.pinimg.com/736x/2c/36/44/2c364466678be55dfacfe65c673844c1.jpg"
                  alt="profile picture"
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className="text-nowrap">
                <h5 className="text-lg font-semibold leading-tight text-white">
                  Welcome, Alex
                </h5>
                <p className="text-sm leading-tight text-gray-400">
                  Ready to resize the day?
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 text-white">
                <p className="font-light text-8xl">14:05</p>
                <div className="h-1 bg-blue-600 w-[30%] rounded-full" />
                <div>
                  <p className="text-3xl">Wednesday</p>
                  <p className="text-gray-400">October 24th, 2023</p>
                </div>
              </div>
              <div>
                <h5 className="text-sm text-gray-400 uppercase">
                  today's focus
                </h5>
                <div className="flex gap-2 mt-2">
                  <RiCheckboxCircleLine color="#2b7fff" size={32} />
                  <p className="text-xl text-white">
                    Finish the Q3 Financial Report and prepare slides
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-sm text-gray-400 uppercase">
                How are you feeling today?
              </h5>
              <div className="flex gap-4 mt-2">
                {moodCards.map((card) =>
                  card.mood === currentMood ? (
                    <button
                      key={card.id}
                      className="flex flex-col items-center justify-center w-full gap-1 text-white bg-blue-600 cursor-pointer aspect-square rounded-xl "
                    >
                      <div className="w-6 aspect-square">{card.icon}</div>
                      <p className="text-sm">{card.mood}</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentMood(card.mood)}
                      key={card.id}
                      className="flex flex-col items-center justify-center w-full gap-1 text-gray-400 transition-all duration-100 ease-linear bg-gray-900 cursor-pointer aspect-square rounded-xl outline-blue-600 outline-0 hover:outline hover:text-blue-600 hover:bg-blue-950/50 group/moodCard"
                    >
                      <div className="w-6 aspect-square">{card.icon}</div>
                      <p className="text-sm text-gray-400 transition duration-100 ease-linear group-hover/moodCard:text-white">
                        {card.mood}
                      </p>
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="relative rounded-lg col-span-2 bg-[#121621]/40 overflow-auto text-white">
            <div className="absolute inset-x-0 z-10 flex items-center justify-between p-6 bg-gray-700/50 backdrop-blur-2xl">
              <h2 className="text-2xl font-semibold">Timeline</h2>
              <div>
                <button className="flex items-center justify-center gap-1 px-4 py-2 font-semibold bg-blue-600 border-none rounded-lg outline-none hover:bg-blue-700">
                  <RiAddLine size={22} />
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DailyPlanner;

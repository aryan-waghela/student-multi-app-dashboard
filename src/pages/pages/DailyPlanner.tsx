import {
  RiCloudLine,
  RiFlashlightLine,
  RiHeavyShowersLine,
  RiSunLine,
} from "@remixicon/react";
import { Container, LeftPane, RightPane } from "../../components/ui";
import { useState, type ReactNode } from "react";

export type MoodItem = {
  id: number;
  icon: ReactNode;
  mood: "great" | "okay" | "tired" | "stressed";
};

const moodCards: MoodItem[] = [
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
  const [currentMood, setCurrentMood] = useState<MoodItem["mood"]>("okay");

  return (
    <div className="h-full bg-gray-950 overflow-hidden">
      <Container className="flex h-full overflow-hidden">
        <div className="grid flex-1 grid-cols-3 overflow-hidden">
          {/*************** * LEFT PANEL * ************** */}
          <LeftPane
            currentMood={currentMood}
            setCurrentMood={setCurrentMood}
            moodCards={moodCards}
          />

          {/**************** * RIGHT PANEL * ****************/}
          <RightPane />
        </div>
      </Container>
    </div>
  );
};

export default DailyPlanner;

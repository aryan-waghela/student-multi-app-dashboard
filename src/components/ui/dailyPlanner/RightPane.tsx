import { RiAddLine } from "@remixicon/react";
import PlannerCard from "./PlannerCard";

const RightPane = () => {
  return (
    <div className="relative rounded-lg col-span-2 bg-[#121621]/40 text-white flex flex-col h-full overflow-hidden pt-6 pr-6 pb-6">
      {/**************** * Header * ****************/}
      <div className="sticky inset-x-0 top-0 z-10 flex items-center justify-between p-6 bg-gray-700/50 backdrop-blur-2xl border border-[#ffffff0d]">
        <h2 className="text-2xl font-semibold">Timeline</h2>
        <div>
          <button className="flex items-center justify-center gap-1 px-4 py-2 font-semibold bg-blue-600 border-none rounded-lg outline-none hover:bg-blue-700">
            <RiAddLine size={22} />
            Add Task
          </button>
        </div>
      </div>
      {/**************** * Timeline Container * ****************/}
      <div className="px-8 pb-20 relative flex-1 overflow-y-auto">
        {/**************** * Vertical Line Rail * ****************/}
        <div className="absolute left-26 inset-y-0 w-px bg-white/10 z-0" />
        {/*********** * Current Time Indicator Line * ***********/}
        <div className="absolute inset-x-0 top-[50%] z-10 flex items-center pointer-events-none">
          <div className="w-26 text-right pr-6 text-blue-400 font-bold text-sm">
            14:05
          </div>
          <div className="h-px grow bg-blue-600 relative shadow-[0_0_10px_rgbs(19,91,236,0.5)]">
            <div className="absolute bg-blue-600 -left-1 -top-1 w-2 h-2 rounded-full shadow-lg" />
          </div>
        </div>
        {/*********** * Schedule Time Container * ***********/}
        <div className="flex flex-col gap-0">
          {/*********** * Timer Div * ***********/}
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          <PlannerCard />
          
        </div>
      </div>
    </div>
  );
};

export default RightPane;

const PlannerCard = () => {
  return (
    <div className="group flex min-h-20 relative">
      <div className="w-24 shrink-0 text-right pr-6 py-4 text-[#64748b] text-sm font-medium group-hover:text-white transition-colors flex flex-col justify-between">
        <p>7:00</p>
        <p>7:00</p>
      </div>
      <div className="grow py-2 pl-6 border border-transparent relative">
        <div className="absolute -left-1.25 top-[50%] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-transparent border-2 border-teal-400 z-10" />
        <div className="bg-gray-800/50 hover:bg-gray-800 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group/card">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white font-medium mb-1 group-hover/card:text-teal-400 transition-colors">
                Morning Jog
              </h4>
              <p className="text-[#9da6b9] text-sm flex items-center gap-1">
                Central Park
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerCard;

import {
  RiArrowRightSLine,
  RiCheckLine,
  RiDeleteBin6Line,
  RiEdit2Line,
} from "@remixicon/react";
import { useState } from "react";

interface TodoCardProps {
  title: string;
  content: string;
  isImportant?: boolean;
  isCompleted: boolean;
  toggleCompleted: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoCard = ({
  title,
  content,
  isImportant = false,
  isCompleted = false,
  toggleCompleted,
  onEdit,
  onDelete,
}: TodoCardProps) => {
  const [showDesc, setShowDesc] = useState<boolean>(false);

  return (
    <div
      className={`${isCompleted ? "bg-blue-100" : "bg-amber-200"} w-full p-3 rounded flex gap-2 relative overflow-hidden`}
    >
      <div className="pt-2">
        <RiArrowRightSLine
          color="#441306"
          className={`${showDesc && "rotate-90"} cursor-pointer ease-in duration-100`}
          onClick={() => setShowDesc((prev) => !prev)}
          size={28}
          opacity={0.6}
        />
      </div>
      <div className="overflow-hidden w-full">
        <div className="flex justify-between items-center w-full">
          <h2
            className={`${isCompleted && "line-through"} text-2xl font-semibold text-orange-950 ease-in duration-100 `}
          >
            {title}
          </h2>
          {isImportant && (
            <p className="text-white font-semibold text-xs h-fit absolute   -rotate-45 -left-14 -top-1 bg-red-500 px-6 translate-x-1/2 translate-y-1/2 drop-shadow-lg drop-shadow-amber-950/25 text-center">
              imp
            </p>
          )}
          <div className="flex gap-2 items-center h-10">
            <label className="h-full aspect-square relative block">
              <input
                type="checkbox"
                className="appearance-none h-full w-full bg-orange-50 rounded peer checked:bg-green-600 ease-in duration-100"
                checked={isCompleted}
                onChange={() => toggleCompleted()}
              />
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 ease-in duration-100">
                <RiCheckLine color="#fff7ed" size={28} />
              </span>
            </label>
            <button
              onClick={onEdit}
              className="p-2 bg-blue-600 rounded h-full aspect-square flex items-center justify-center"
            >
              <RiEdit2Line color="#fff7ed" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-500 rounded h-full aspect-square flex items-center justify-center"
            >
              <RiDeleteBin6Line color="#fff7ed" />
            </button>
          </div>
        </div>
        <div
          className={`grid transition-all duration-300 ${showDesc ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`}
        >
          <p className="font-semibold text-orange-950/80 overflow-hidden">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

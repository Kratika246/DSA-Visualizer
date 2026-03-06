// Bars renders ONE sorting step. It has no algorithm logic.
"use client";

import { motion } from "framer-motion";
import useVisualizerStore from "../../store/useVisualizerStore";

const Bars = () => {
  const { currStep, steps } = useVisualizerStore();

  if(steps.length==0) {
    return <div className="text-center mt-10 text-gray-400">Enter input array and click Visualize to start!</div>;
  }
  if (currStep >= steps.length) {
    return <div className="text-center mt-10 text-gray-400">Completed</div>;
  }

  const step = steps[currStep];

  if (step.type !== "sorting") return null;

  const { array, activeIndices = [], sortedIndices = [] } = step;

  const maxValue = Math.max(...array);

  return (
    <div className="flex items-end justify-center gap-1 h-64 w-full px-4">
      {array.map((value, index) => {
        const isActive = activeIndices.includes(index);
        const isSorted = sortedIndices.includes(index);

        let bgColor = " bg-gray-600";
        if (isSorted) bgColor = "bg-green-500";
        else if (isActive) bgColor = "bg-red-500";

        return (
          <motion.div
  key={index}
  layout
  className={`relative w-6 rounded-t ${bgColor} flex justify-center`}
  animate={{
    height: `${(value / maxValue) * 100}%`,
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut",
  }}
>
  {/* Value label */}
  <span
    className="
      absolute
      -top-5
      text-xs
      font-medium
      text-gray-300
      select-none
      pointer-events-none
    "
  >
    {value}
  </span>
</motion.div>

          
        );
      })}
    </div>
  );
};

export default Bars;

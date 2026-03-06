"use client";

import useVisualizerStore from "@/store/useVisualizerStore";
import { motion } from "motion/react";

const AutoToggle = () => {
  const { autoPlay, toggleAutoPlay } = useVisualizerStore();

  return (
    <div className="flex items-center gap-2">
      {/* Label */}
      <span
        className={`text-[11px] tracking-widest select-none
          ${autoPlay ? "text-white/70" : "text-white/40"}`}
      >
        AUTO
      </span>

      {/* Toggle */}
      <motion.button
        onClick={toggleAutoPlay}
        whileTap={{ scale: 0.96 }}
        className="relative w-12 h-6 rounded-full
                   border border-white/20 bg-transparent
                   hover:border-white/40 transition-colors"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white/80"
          style={{
            left: autoPlay ? "calc(100% - 18px)" : "2px",
          }}
        />
      </motion.button>
    </div>
  );
};

export default AutoToggle;


"use client";

import { motion, AnimatePresence } from "framer-motion";
import useVisualizerStore from "@/store/useVisualizerStore";
import { useEffect, useRef } from "react";

const Callstack = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { currStep, steps } = useVisualizerStore();

  const step =
    steps.length > 0 && currStep < steps.length
      ? steps[currStep]
      : null;

  const callStack =
    step?.type === "recursion" ? step.callStack : [];

  const activeCallIndex =
    step?.type === "recursion" ? step.activeCallIndex : -1;

  // ✅ Hook ALWAYS runs
  useEffect(() => {
  const el = containerRef.current;
  if (!el || !callStack.length) return;

  requestAnimationFrame(() => {
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  });
}, [callStack.length]);


  // ---- EMPTY STATE ----
  if (!steps.length) {
    return (
      <div className="w-64 p-3 min-h-[70vh] rounded-md border border-white/10 bg-white/5 backdrop-blur">
        <div className="text-xs text-white/60 mb-2 tracking-wide">
          CALL STACK
        </div>
        <div className="text-sm text-muted-foreground italic">
          No calls yet
        </div>
      </div>
    );
  }

  if (!step || step.type !== "recursion") return null;

  return (
    <div className="w-64 p-3 min-h-[70vh] rounded-md border border-white/10 bg-white/5 backdrop-blur">
      <div className="text-xs text-white/60 mb-2 tracking-wide">
        CALL STACK
      </div>

      <div
        ref={containerRef}
        className="flex flex-col overflow-y-auto h-[60vh] gap-2 justify-end "
      >
        <AnimatePresence>
          {[...callStack].reverse().map((frame, rIndex) => {
            const index = callStack.length - 1 - rIndex;
            const isActive = index === activeCallIndex;

            return (
              <motion.div
                key={`${frame.fn}-${index}`}
                layout
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`px-3 py-2 rounded-md text-sm border ${
                  isActive
                    ? "bg-blue-500/20 border-blue-400/40"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="font-mono text-white">
                  {frame.fn}
                  <span className="text-white/60">
                    ({frame.args.join(", ")})
                  </span>
                </div>

                {frame.returned !== undefined && (
                  <div className="text-xs text-green-400 mt-1">
                    return {frame.returned}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Callstack;

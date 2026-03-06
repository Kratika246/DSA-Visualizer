"use client";

import Factorial from "@/algorithms/recursion/basic/factorial";
import useVisualizerStore from "@/store/useVisualizerStore";
import { RecursionAlgorithms, Step, VisualizerMode } from "@/types/Step";
import { useEffect } from "react";

const RecursionMap: Record<string, (data: number[]) => Step[]> = {
  factorial: Factorial,
};

const useRecursionVisualizer = () => {
  const {
    steps,
    currStep,
    algorithm,
    speed,
    isPlaying,
    autoPlay,
    setSteps,
    setMode,
    play,
    pause,
    reset,
    next,
    data,
  } = useVisualizerStore();

  useEffect(()=>{
    const mode : VisualizerMode = 'recursion';
    setMode(mode);
  },[])

  // Compute steps when data or algorithm changes
  useEffect(() => {
    if (!data || data.mode !== "recursion") return;
    if (!algorithm) return;

    const RecursionFunction = RecursionAlgorithms[algorithm].execute;
    const computedSteps = RecursionFunction(data.data.args);
    console.log(computedSteps);
    setSteps(computedSteps);
    reset();

    if (autoPlay) play();
  }, [data, algorithm]);

  // Autoplay logic
  useEffect(() => {
    if (!isPlaying || !autoPlay) return;
    if (currStep >= steps.length - 1) {
      pause();
      return;
    }

    const timer = setTimeout(() => {
      next();
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, autoPlay, currStep, steps.length, speed]);

  return {};
};

export default useRecursionVisualizer;

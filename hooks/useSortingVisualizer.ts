"use client";

import bubbleSort from "@/algorithms/sorting/bubbleSort";
import InsertionSort from "@/algorithms/sorting/insertionSort";
import MergeSort from "@/algorithms/sorting/mergeSort";
import SelectionSort from "@/algorithms/sorting/selectionSort";
import useVisualizerStore from "@/store/useVisualizerStore";
import { Step, VisualizerMode } from "@/types/Step";
import { useEffect } from "react";
import { RecursionStep } from "@/algorithms/sorting/mergeSort";
// Import RecursionStep if it exists in your types, or remove it if not needed

export const useSortingVisualizer = () => {
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

  const SortingMap: Record<string, (data: number[]) => Step[] | RecursionStep[]> = {
  bubble: bubbleSort,
  selection: SelectionSort,
  insertion: InsertionSort,
  merge: MergeSort
};

  useEffect( ()=> {
    const mode : VisualizerMode = 'sorting';
    setMode(mode);
  },[] );

  // 1️⃣ Run algorithm when data changes
  useEffect(() => {
    if (!data || data.mode !== "sorting") return;
    if (!algorithm) return;

    const SortingFunction = SortingMap[algorithm];
    if (!SortingFunction) return; // 🔒 critical safety
    pause();
    const steps = SortingFunction(data.data.array);
    setSteps(steps as Step[]);

    if (autoPlay) {
        // Small delay ensures React has processed the 'reset' before 'play'
        const startTimer = setTimeout(play, 10);
        return () => clearTimeout(startTimer);
    }
  }, [data, algorithm]);


  // 2️⃣ Auto-play effect
  useEffect(() => {
    if (!isPlaying || !autoPlay) return;

    if (currStep >= steps.length - 1) {
      pause();
      return;
    }

    const timer = setTimeout(next, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, autoPlay, currStep, steps.length, speed]);

  return {};
};

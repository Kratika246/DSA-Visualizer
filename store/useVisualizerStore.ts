import { create } from "zustand";
import { Step, VisualizerData, VisualizerMode } from "@/types/Step";

type VisualizerState = {
  steps: Step[];
  currStep: number;

  data: VisualizerData | null;

  setSteps: (steps: Step[]) => void;
  setData: (data: VisualizerData) => void;

  play: () => void;
  pause: () => void;
  reset: () => void;
  next: () => void;
  prev: () => void;
  toggleAutoPlay: () =>void;

  setSpeed: (s: number) => void;
  setAlgorithm: (algo: string) => void;
  setMode: (s:VisualizerMode) => void;

  isPlaying: boolean;
  isFinished: boolean;
  mode: VisualizerMode| null;
  speed: number;
  autoPlay: boolean;

  algorithm: string | null;
  explanation: string;
};

const useVisualizerStore = create<VisualizerState>((set) => ({
  steps: [],
  currStep: 0,
  speed: 500,
  isPlaying: false,
  algorithm: null,
  mode: null,
  isFinished: false,
  data: null,
  explanation: "",
  autoPlay: true,

  
  setSteps: (steps) => set({ steps }),

  play: () => set({ isPlaying: true, autoPlay: true }),
  pause: () => set({ isPlaying: false }),

  next: () =>
    set((s) => ({
      currStep: Math.min(s.currStep + 1, s.steps.length - 1),
    })),

  prev: () =>
    set((s) => ({
      currStep: Math.max(s.currStep - 1, 0),
    })),

  reset: () => set({ currStep: 0, isFinished: false }),
  setAlgorithm: (algo)=> {set({ algorithm: algo,currStep: 0, isPlaying:false  , isFinished:false })},
  setSpeed: (s) => set({ speed: s }),
  setMode: (s) => set({ mode: s }),

  setData: (data) =>
  set({
    data,
    mode: data.mode,
    steps: [],
    currStep: 0,
    isFinished: false,
  }),

  toggleAutoPlay: () => set((s) => ({ autoPlay: !s.autoPlay }))
}));

export default useVisualizerStore;

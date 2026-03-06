import Factorial from "@/algorithms/recursion/basic/factorial";
import Fibonacci from "@/algorithms/recursion/tree/fibonacci";
import subsetSum from "@/algorithms/backtracking/subsetSum";
import Hanoi from "@/algorithms/backtracking/subsetSum";

// ---- Base ----
export type BaseStep<T extends 'sorting' | 'recursion' | 'dp'> = {
  type: T;
  explanation?: string;
};

// ---- Sorting ----
export type SortingStep = BaseStep<'sorting'> & {
  array: number[];
  activeIndices?: number[];
  swapped?: boolean;
  sortedIndices?: number[];
};
export type RecursionTreeNode = {
  id: number;          // stable unique id across steps
  fn: string;
  args: number[];
  returned?: number;   // undefined while still open
  parentId: number | null;
  depth: number;
  childIds: number[];
};

export type RecursionStep = BaseStep<"recursion"> & {
  /** Full tree snapshot so far (all nodes ever created, open or resolved) */
  treeNodes: RecursionTreeNode[];
  /** id of the node currently being executed */
  activeNodeId: number;

  // ── Legacy callStack kept for Callstack.tsx compatibility ──
  callStack: {
    fn: string;
    args: number[];
    returned?: number;
  }[];
  activeCallIndex?: number;
};

// ---- Dynamic Programming ----
export type DPStep = BaseStep<'dp'> & {
  table: number[][];
  activeCell: [number, number];
  fromCell?: [number, number]; // optional transition
};

// ---- Union ----
export type Step = SortingStep | RecursionStep | DPStep;

export type VisualizerMode = 'sorting' | 'recursion' | 'dp';

export type SortingData = {
  array: number[];
};
export type RecursionData = {
  args: number[];
};

export type DPData = {
  table: number[][];
  rows: number;
  cols: number;
};

export type VisualizerData =
  | { mode: 'sorting'; data: SortingData }
  | { mode: 'recursion'; data: RecursionData }
  | { mode: 'dp'; data: DPData };

//recursion algos
export type InputKind = "single" | "multi";

export type AlgorithmDefinition = {
  name: string;
  type: string
  inputKind: InputKind;
  inputs: {key: string, label: string, type: string}[];
  execute: (args: number[]) => RecursionStep[];
};
export const RecursionAlgorithms: Record<string, AlgorithmDefinition> = {
  factorial: {
    name: "Factorial",
    type: "linear",
    inputKind: "single",
    inputs: [
      { key: "n", label: "Number", type: "number" }
    ],
    execute: Factorial,
  },

  fibonacci: {
    name: "Fibonacci",
    type:  "tree",
    inputKind: "single",
    inputs:[{ key: "n", label: "n", type: "number" }],
    execute: Fibonacci,
  },

  subsetSum: {
    name: "Subset Sum",
    type: "tree",
    inputKind: "multi",
    inputs: [
      { key: "index", label: "Array elements", type: "array" },
      { key: "sum", label: "Target Sum", type: "number" }
    ],
    execute: subsetSum
  }
};

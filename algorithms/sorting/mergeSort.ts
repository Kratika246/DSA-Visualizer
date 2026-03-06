"use client";

// --- Internal Type Definitions ---

export interface RecursionTreeNode {
  id: number;
  fn: string;
  args: any[]; // Changed to any[] to support arrays [number[]]
  parentId: number | null;
  childIds: number[];
  depth: number;
  returned?: any; // Changed to any to support number or number[]
}

export interface CallStackItem {
  fn: string;
  args: any[];
  returned?: any;
}

export interface RecursionStep {
  type: "recursion";
  treeNodes: RecursionTreeNode[];
  activeNodeId: number | null;
  callStack: CallStackItem[];
  activeCallIndex: number;
}

// --- Merge Sort Algorithm ---

const MergeSort = (args: number[]): RecursionStep[] => {
  const initialArray = args;
  let steps: RecursionStep[] = [];
  let cs: CallStackItem[] = [];
  let treeNodes: RecursionTreeNode[] = [];
  let i = 0;

  const addChildToParent = (parentId: number, childId: number) => {
    const parentIndex = treeNodes.findIndex((n) => n.id === parentId);
    if (parentIndex !== -1 && !treeNodes[parentIndex].childIds.includes(childId)) {
      treeNodes[parentIndex] = {
        ...treeNodes[parentIndex],
        childIds: [...treeNodes[parentIndex].childIds, childId],
      };
    }
  };

  const getDepth = (parentId: number | null): number => {
    if (parentId === null) return 0;
    const parent = treeNodes.find((n) => n.id === parentId);
    return parent ? parent.depth + 1 : 0;
  };

  const deepCopyTreeNodes = (): RecursionTreeNode[] => {
    return treeNodes.map((node) => ({
      ...node,
      childIds: [...node.childIds],
    }));
  };

  const merge = (left: number[], right: number[]): number[] => {
    let result: number[] = [];
    let l = 0,
      r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) result.push(left[l++]);
      else result.push(right[r++]);
    }
    return [...result, ...left.slice(l), ...right.slice(r)];
  };

  const sort = (arr: number[], parentId: number | null = null): number[] => {
    // 1. Track call in Call Stack
    cs.push({ fn: "mergeSort", args: [[...arr]] });

    const myId = i++;
    let node: RecursionTreeNode = {
      id: myId,
      fn: "mergeSort",
      args: [[...arr]], // Representing the array as the first argument
      parentId: parentId,
      childIds: [],
      depth: getDepth(parentId),
    };

    treeNodes.push(node);
    if (parentId !== null) addChildToParent(parentId, myId);

    // Initial Step (Push call to visualizer)
    steps.push({
      treeNodes: deepCopyTreeNodes(),
      activeNodeId: myId,
      type: "recursion",
      callStack: cs.map((c) => ({ ...c })),
      activeCallIndex: cs.length - 1,
    });

    // 2. Base case: array of size 1
    if (arr.length <= 1) {
      const nodeIndex = treeNodes.findIndex((n) => n.id === myId);
      treeNodes[nodeIndex] = { ...treeNodes[nodeIndex], returned: [...arr] };
      cs[cs.length - 1] = { ...cs[cs.length - 1], returned: [...arr] };

      steps.push({
        treeNodes: deepCopyTreeNodes(),
        activeNodeId: myId,
        type: "recursion",
        callStack: cs.map((c) => ({ ...c })),
        activeCallIndex: cs.length - 1,
      });

      cs.pop();
      return arr;
    }

    // 3. Recursive case
    const mid = Math.floor(arr.length / 2);
    const leftSorted = sort(arr.slice(0, mid), myId);
    const rightSorted = sort(arr.slice(mid), myId);

    // 4. Merge phase
    const merged = merge(leftSorted, rightSorted);

    // Update node and callstack with final merged result
    const nodeIndex = treeNodes.findIndex((n) => n.id === myId);
    treeNodes[nodeIndex] = { ...treeNodes[nodeIndex], returned: [...merged] };
    cs[cs.length - 1] = { ...cs[cs.length - 1], returned: [...merged] };

    // Push "Merge Complete" step
    steps.push({
      treeNodes: deepCopyTreeNodes(),
      activeNodeId: myId,
      type: "recursion",
      callStack: cs.map((c) => ({ ...c })),
      activeCallIndex: cs.length - 1,
    });

    cs.pop();

    // 5. Back to parent step
    steps.push({
      treeNodes: deepCopyTreeNodes(),
      activeNodeId: parentId !== null ? parentId : myId,
      type: "recursion",
      callStack: cs.map((c) => ({ ...c })),
      activeCallIndex: cs.length - 1,
    });

    return merged;
  };

  sort(initialArray);
  return steps;
};

export default MergeSort;
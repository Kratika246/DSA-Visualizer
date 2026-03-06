import { RecursionStep } from "@/types/Step";

const Factorial = (args: number[]) => {
  const n = args[0];
  let steps: RecursionStep[] = [];
  
  let cs: RecursionStep['callStack'] = [];

  const fact = (num: number): number => {
    // 1. Push Initial Call
    cs.push({ fn: "factorial", args: [num] });
    steps.push({
      type: "recursion",
      treeNodes: [],
      activeNodeId: 0,
      callStack: [...cs],
      activeCallIndex: cs.length - 1,
    });

    // 2. Base Case
    if (num === 0 || num === 1) {
      // Update current frame with return value
      cs[cs.length - 1] = { ...cs[cs.length - 1], returned: 1 };

      steps.push({
        type: "recursion",
        treeNodes: [],
        activeNodeId: 0,
        callStack: [...cs],
        activeCallIndex: cs.length - 1,
      });

      // Pop from stack after visualizing return
      cs.pop();
      steps.push({
        type: "recursion",
        treeNodes: [],
        activeNodeId: 0,
        callStack: [...cs],
        // FIX: Ensuring number type (-1) instead of undefined
        activeCallIndex: cs.length > 0 ? cs.length - 1 : -1,
      });

      return 1;
    }

    // 3. Recursive Case
    const res = num * fact(num - 1);

    // 4. Return Step Visualization
    cs[cs.length - 1] = { ...cs[cs.length - 1], returned: res };

    steps.push({
      type: "recursion",
      treeNodes: [],
      activeNodeId: 0,
      callStack: [...cs],
      activeCallIndex: cs.length - 1,
    });

    // Pop the stack frame
    cs.pop();
    steps.push({
      type: "recursion",
      treeNodes: [],
      activeNodeId: 0,
      callStack: [...cs],
      // FIX: Ensuring number type (-1) instead of undefined
      activeCallIndex: cs.length > 0 ? cs.length - 1 : -1,
    });

    return res;
  };

  fact(n);
  return steps;
};

export default Factorial;
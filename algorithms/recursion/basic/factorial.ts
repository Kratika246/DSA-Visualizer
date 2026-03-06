import { RecursionStep } from "@/types/Step";

const Factorial = (args: number[]) => {
  const n = args[0];
  let steps: RecursionStep[] = [];
  let cs: RecursionStep['callStack'] = [];

  const fact = (num: number): number => {
    // push call
    cs.push({ fn: "factorial", args: [num] });
    steps.push({
      type: "recursion",
      treeNodes: [],
      activeNodeId: 0,
      callStack: [...cs],
      activeCallIndex: cs.length - 1,
    });

    // base case
    if (num === 0 || num === 1) {
      cs[cs.length - 1] = {...cs[cs.length-1], returned:1 };

      steps.push({
        type: "recursion",
        treeNodes: [],
        activeNodeId: 0,
        callStack: [...cs],
        activeCallIndex: cs.length - 1,
      });
      cs.pop();
      steps.push({
        type: "recursion",
        treeNodes: [],
        activeNodeId: 0,
        callStack: [...cs],
        activeCallIndex: cs.length - 1,
      });

      return 1;
    }

    // recursive case
    const res = num * fact(num - 1);

    // return step
    cs[cs.length - 1] = {...cs[cs.length-1], returned: res};

      steps.push({
        type: "recursion",
        treeNodes: [],
        activeNodeId: 0,
        callStack: [...cs],
        activeCallIndex: cs.length - 1,
      });
      cs.pop();
      steps.push({
        type: "recursion",
        treeNodes: [],
        activeNodeId: 0,
        callStack: [...cs],
        activeCallIndex: cs.length? cs.length - 1: undefined,
      });

    return res;
  };

  fact(n);
  return steps;
};

export default Factorial;

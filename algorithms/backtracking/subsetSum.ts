import { RecursionStep } from "@/types/Step";

const subsetSum = (args: number[]) => {
  const targetSum= args[args.length-1];
  const array = args.slice(0,args.length-1);
  const steps: RecursionStep[] = [];
  return steps;
}

export default subsetSum;
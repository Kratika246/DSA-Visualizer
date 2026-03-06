import { RecursionStep } from "@/types/Step"
import { RecursionTreeNode } from "@/types/Step"

const Fibonacci = (args: number[]) => {
  const n = args[0];
  let steps: RecursionStep[] = [];
  let cs: { fn: string; args: number[]; returned?: number }[] = [];
  let treeNodes: RecursionTreeNode[] = [];
  let i = 0;

  const addChildToParent = (parentId: number, childId: number) => {
    const parentIndex = treeNodes.findIndex(n => n.id === parentId);
    if (parentIndex !== -1 && !treeNodes[parentIndex].childIds.includes(childId)) {
      // Immutable update - create new object
      treeNodes[parentIndex] = {
        ...treeNodes[parentIndex],
        childIds: [...treeNodes[parentIndex].childIds, childId]
      };
    }
  }

  const getDepth = (parentId: number | null): number => {
    if (parentId === null) return 0;
    const parent = treeNodes.find(n => n.id === parentId);
    return parent ? parent.depth + 1 : 0;
  }

  // Helper to deep copy tree nodes
  const deepCopyTreeNodes = (): RecursionTreeNode[] => {
    return treeNodes.map(node => ({
      ...node,
      childIds: [...node.childIds],  // Copy the array
    }));
  }

  const fib = (num: number, parentId: number | null = null): number => {
    // 1. Track this call in callStack
    cs.push({ fn: "fibonacci", args: [num] });
    
    // 2. Create the node
    const myId = i++;
    let node: RecursionTreeNode = {
      id: myId,
      fn: "fibonacci",
      args: [num],
      parentId: parentId,
      childIds: [],
      depth: getDepth(parentId)
    };
    
    // 3. Add node to tree
    treeNodes.push(node);
    
    // 4. Add to parent's children (if parent exists)
    if (parentId !== null) {
      addChildToParent(parentId, myId);
    }
    
    // 5. Push step with DEEP copy
    steps.push({
      treeNodes: deepCopyTreeNodes(),
      activeNodeId: myId,
      type: "recursion",
      callStack: cs.map(c => ({ ...c })),  // Deep copy callstack too
      activeCallIndex: cs.length - 1,
    });
    
    // 6. Base case
    if (num === 1 || num === 2) {
      const returnValue = num - 1;
      
      // Mark as returned (immutable update)
      const nodeIndex = treeNodes.findIndex(n => n.id === myId);
      treeNodes[nodeIndex] = { ...treeNodes[nodeIndex], returned: returnValue };
      
      // Update callstack
      cs[cs.length - 1] = { ...cs[cs.length - 1], returned: returnValue };
      
      // Push return step
      steps.push({
        treeNodes: deepCopyTreeNodes(),
        activeNodeId: myId,
        type: "recursion",
        callStack: cs.map(c => ({ ...c })),
        activeCallIndex: cs.length - 1,
      });
      
      // Pop callstack
      cs.pop();
      
      // Push "back to parent" step
      steps.push({
        treeNodes: deepCopyTreeNodes(),
        activeNodeId: parentId !== null ? parentId : myId,
        type: "recursion",
        callStack: cs.map(c => ({ ...c })),
        activeCallIndex: cs.length - 1,
      });
      
      return returnValue;
    }
    
    // 7. Recursive case
    const result: number = fib(num - 1, myId) + fib(num - 2, myId);
    
    // Mark as returned (immutable update)
    const nodeIndex = treeNodes.findIndex(n => n.id === myId);
    treeNodes[nodeIndex] = { ...treeNodes[nodeIndex], returned: result };
    
    cs[cs.length - 1] = { ...cs[cs.length - 1], returned: result };
    
    steps.push({
      treeNodes: deepCopyTreeNodes(),
      activeNodeId: myId,
      type: "recursion",
      callStack: cs.map(c => ({ ...c })),
      activeCallIndex: cs.length - 1,
    });
    
    cs.pop();
    
    steps.push({
      treeNodes: deepCopyTreeNodes(),
      activeNodeId: parentId !== null ? parentId : myId,
      type: "recursion",
      callStack: cs.map(c => ({ ...c })),
      activeCallIndex: cs.length - 1,
    });
    
    return result;
  };
  
  fib(n);
  return steps;
}

export default Fibonacci
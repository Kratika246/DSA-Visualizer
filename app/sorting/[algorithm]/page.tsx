"use client";
import Bars from "../../../components/visualizers/Bars";
import ControlPanel from "../../../components/controls/ControlPanel";
import { useSortingVisualizer } from "@/hooks/useSortingVisualizer";
import InputPanel from "@/components/input/sorting/InputPanel";
import useVisualizerStore from "@/store/useVisualizerStore";
import RecursionTreeVisualizer from "@/components/visualizers/Tree";
import To_be_added from "@/components/pages/to-be-added";
import { use, useEffect } from "react";

const Sorting = ({ 
  params 
}: { 
  params: Promise<{ algorithm: string }> 
}) => {
  useSortingVisualizer();
   const { algorithm } = use(params);
    
    const setAlgorithm = useVisualizerStore((state) => state.setAlgorithm);
    
    // Set algorithm when page loads
    useEffect(() => {
      setAlgorithm(algorithm);
    }, [algorithm, setAlgorithm]);
 if(algorithm==='quick-sort') return <To_be_added/>
  return (
    <div className="flex flex-col gap-6">
      <ControlPanel />
      <InputPanel />
      {algorithm==='merge'?
      <RecursionTreeVisualizer/>:
      <Bars/>}
    </div>
  );
};

export default Sorting;

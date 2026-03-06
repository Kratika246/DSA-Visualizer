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
  <div className="flex flex-col gap-6 w-full max-w-full">
    {/* Responsive Panel Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <div className="w-full flex items-center">
        <ControlPanel />
      </div>
      <div className="w-full">
        <InputPanel />
      </div>
    </div>

    {/* Visualizer Area with horizontal scroll safety */}
    <div className="w-full overflow-x-auto bg-[#0d0d0d]/50 rounded-xl border border-white/5 p-4 min-h-[400px] flex items-center justify-center">
      {algorithm === 'merge' ? <RecursionTreeVisualizer /> : <Bars />}
    </div>
  </div>
);
};

export default Sorting;
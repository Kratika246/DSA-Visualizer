"use client";
import ControlPanel from "@/components/controls/ControlPanel"
import { AlgoSelector } from "@/components/input/recursion/AlgoSelector"
import InputPanel from "@/components/input/recursion/InputPanel"
import To_be_added from "@/components/pages/to-be-added";
import RecursionTreeVisualizer from "@/components/visualizers/Tree";
import useRecursionVisualizer from "@/hooks/useRecursionVisualizer"
import useVisualizerStore from "@/store/useVisualizerStore";
import { useEffect, use } from "react";

const Page = ({ 
  params 
}: { 
  params: Promise<{ algorithm: string }> 
}) => {
    useRecursionVisualizer();
    
    // Unwrap the params Promise using React's use() hook
    const { algorithm } = use(params);
    
    const setAlgorithm = useVisualizerStore((state) => state.setAlgorithm);
    
    // Set algorithm when page loads
    useEffect(() => {
      setAlgorithm(algorithm);
    }, [algorithm, setAlgorithm]);
    if(algorithm==='tower-of-hanoi') return <To_be_added/>
    return (
      <div className="p-12 flex flex-col gap-6 w-full h-full">
          <div className="flex flex-col gap-14 h-full">
              <ControlPanel />
              <div className="flex w-full gap-8">
                  <AlgoSelector/>
                  <InputPanel />
              </div>
          </div>
          <div className="-ml-6">
              <RecursionTreeVisualizer/>
          </div>
      </div>
    )
}

export default Page;
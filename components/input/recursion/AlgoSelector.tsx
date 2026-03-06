"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useVisualizerStore from "@/store/useVisualizerStore";
import { RecursionAlgorithms } from "@/types/Step";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type RecursionAlgorithmKey = keyof typeof RecursionAlgorithms;

export function SelectGroups() {
const router = useRouter(); // 2. Initialize router
  const { algorithm, setAlgorithm } = useVisualizerStore();
  const [isClient, setIsClient] = useState(false);
 const params = useParams(); // Hook to grab the [algorithm] from the URL

  // 1. Sync Store with URL
  // This ensures that if the sidebar changes the URL, the store updates, 
  // which then moves the "active-bg" highlight below.
  useEffect(() => {
    if (params?.algorithm) {
      const currentAlgo = params.algorithm as string;
      if (currentAlgo !== algorithm) {
        setAlgorithm(currentAlgo);
      }
    }
  }, [params?.algorithm, setAlgorithm, algorithm]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const setAlgo = (val: string) => {
    // 3. Update the Store
    setAlgorithm(val as RecursionAlgorithmKey);
    
    // 4. Update the URL programmatically
    // Ensure the key or name matches your folder structure exactly
    const algoName = RecursionAlgorithms[val as RecursionAlgorithmKey].name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/recursion/${algoName}`);
  };
  const singleInputAlgos = Object.entries(RecursionAlgorithms)
    .filter(([, algo]) => algo.inputKind === "single");

  const multiInputAlgos = Object.entries(RecursionAlgorithms)
    .filter(([, algo]) => algo.inputKind === "multi");

  return isClient ? (
   <div className="">
     <Select value={algorithm || ""} onValueChange={setAlgo}>
      <SelectTrigger className=" w-64">
        <SelectValue placeholder="Select a recursion algo" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Single Numeric Input</SelectLabel>
          {singleInputAlgos.map(([key, algo]) => (
            
              <SelectItem key={key} value={key}>
                {algo.name}
              </SelectItem>
          ))}
        </SelectGroup>

        {multiInputAlgos.length > 0 && <SelectSeparator />}

        <SelectGroup>
          <SelectLabel>Multi Numeric Input</SelectLabel>
          {multiInputAlgos.map(([key, algo]) => (
            <SelectItem key={key} value={key} >
              {algo.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
   </div>
  ) : (
    <div></div>
  );
}

export const AlgoSelector = () => <SelectGroups />;

import ButtonUI from "@/components/ui/ButtonUI";
import useVisualizerStore from "@/store/useVisualizerStore";
import { useEffect, useState } from "react";
const ArrayInput = () => {
 
  const {
    data,
    setData
  } = useVisualizerStore();
    const [textValue, setTextValue] = useState<string>(
    data?.mode === 'sorting' ? data.data.array.join(", ") : ""
  );

 const visualize = () => {
    // Only parse into numbers when the user is DONE and clicks the button
    const numberArray = textValue
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num)); // Remove any trash inputs

    setData({ mode: "sorting", data: { array: numberArray } });
  };

  return (
    /* Changed to flex-col for mobile, sm:flex-row for desktop */
    <div className="flex flex-col sm:flex-row w-full gap-4 items-end">
      <div className="w-full max-w-2xl flex flex-col gap-2">
        <label className="text-sm text-[rgba(209_213_220_/0.75)]">
          Input Array
        </label>

        <div className="relative">
          <input
            type="text"
            placeholder="e.g. 5, 3, 8, 1, 4"
            className="w-full px-4 py-2 text-sm bg-transparent border border-gray-700/40 rounded-md text-gray-200 placeholder-gray-500 outline-none transition-all focus:border-[rgba(209_213_220_/0.5)] focus:border-[0.5px] focus:bg-[rgba(209_213_220_/0.05)]"
            onChange={(e)=>setTextValue(e.target.value)}
            value={textValue}
          />

          {/* Hidden on very small screens to prevent overlap, or keep as is */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hidden xs:block">
            numbers only
          </span>
        </div>

        <p className="text-xs text-gray-500">
          Separate numbers with commas or spaces
        </p>
      </div>
      
      {/* Adjusted padding/alignment for the button container */}
      <div className="flex items-center justify-center sm:justify-start pb-1">
        <ButtonUI variant="visualize" onClick={visualize}/> 
      </div>
    </div>
  );
};


export default ArrayInput;

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
    <div className="flex w-full">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">

      {/* Label */}
      <label className="text-sm text-[rgba(209_213_220_/0.75)]">
        Input Array
      </label>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="e.g. 5, 3, 8, 1, 4"
          className="
            w-full
            px-4
            py-2
            text-sm
            bg-transparent
            border
            border-gray-700/40
            rounded-md
            text-gray-200
            placeholder-gray-500
            outline-none
            transition-all

            focus:border-[rgba(209_213_220_/0.5)]
            focus:border-[0.5px]
            focus:bg-[rgba(209_213_220_/0.05)]
          "
          onChange={(e)=>setTextValue(e.target.value)}
          value={textValue}
        />

        {/* Helper text */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          numbers only
        </span>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500">
        Separate numbers with commas or spaces
      </p>
    </div>
    <div className="flex align-middle px-4 pb-6.25 pt-6.75"><ButtonUI variant="visualize" onClick={visualize}/> </div>
    </div>
        
  );
};

export default ArrayInput;
